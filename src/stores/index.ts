import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { map } from 'rxjs/operators';
import {
  commentLikeStatusFromResponse,
  commentsFromResponse,
  dramaEpisodeFromResponse,
  dramaFromResponse,
  userFromResponse,
} from '../models';
import {
  fetchDrama,
  fetchDramaEpisode,
  fetchDramaEpisodeComments,
  fetchDramaEpisodeList,
  fetchRelatedDramas,
  patchDramaEpisodeCommentDislike,
  patchDramaEpisodeCommentLike,
  requestAuthorize,
} from '../remotes';
import { rootEpic } from './epics';
import { rootReducer } from './reducers';
import { Actions, EpicDependency, State } from './types';
import { withDevTools } from './util/devtools';
import { withReduxStore } from './util/hoc';

const epicMiddleware = createEpicMiddleware<Actions, Actions, State, EpicDependency>({
  dependencies: {
    api: {
      authorize: token => requestAuthorize({ token }).pipe(map(userFromResponse)),
      fetchDrama: dramaId => fetchDrama(dramaId).pipe(map(dramaFromResponse)),
      fetchDramaEpisodeList: dramaId =>
        fetchDramaEpisodeList(dramaId).pipe(
          map(episodes => episodes.map(dramaEpisodeFromResponse)),
        ),
      fetchDramaEpisode: (dramaId, episodeId) =>
        fetchDramaEpisode(dramaId, episodeId).pipe(map(dramaEpisodeFromResponse)),
      fetchRelatedDramas: dramaId =>
        fetchRelatedDramas(dramaId).pipe(map(dramas => dramas.map(dramaFromResponse))),
      fetchDramaEpisodeComments: (dramaId, episodeId, authToken) =>
        fetchDramaEpisodeComments(dramaId, episodeId, authToken).pipe(map(commentsFromResponse)),
      patchDramaEpisodeCommentLike: (dramaId, episodeId, commentId, authToken) =>
        patchDramaEpisodeCommentLike(dramaId, episodeId, commentId, authToken).pipe(
          map(commentLikeStatusFromResponse),
        ),
      patchDramaEpisodeCommentDislike: (dramaId, episodeId, commentId, authToken) =>
        patchDramaEpisodeCommentDislike(dramaId, episodeId, commentId, authToken).pipe(
          map(commentLikeStatusFromResponse),
        ),
    },
  },
});

export const withRootStore = withReduxStore(() => {
  const store = createStore(rootReducer, undefined, withDevTools(applyMiddleware(epicMiddleware)));

  epicMiddleware.run(rootEpic);

  return store;
});
