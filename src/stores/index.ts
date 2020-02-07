import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { map } from 'rxjs/operators';
import { fetchDramaEpisode, requestAuthorize, fetchDrama } from '../remotes';
import { rootEpic } from './epics';
import { rootReducer } from './reducers';
import { Actions, EpicDependency, State } from './types';
import { withDevTools } from './util/devtools';
import { withReduxStore } from './util/hoc';

const epicMiddleware = createEpicMiddleware<Actions, Actions, State, EpicDependency>({
  dependencies: {
    api: {
      authorize: token => requestAuthorize({ token }),
      fetchDrama: dramaId =>
        fetchDrama(dramaId).pipe(
          map(response => ({
            id: response.dramaId,
            title: response.title,
            summary: response.summary,
            productionCompany: response.productionCompany,
            imageUrls: response.images,
            likeCount: response.like,
            dislikeCount: response.dislike,
            createdAt: response.createdAt,
          })),
        ),
      fetchDramaEpisode: (dramaId, episodeId) =>
        fetchDramaEpisode(dramaId, episodeId).pipe(
          map(response => ({
            id: response.dramaEpisodeId,
            title: response.title,
            summary: response.summary,
            number: response.episodeNumber,
            youtubePlayId: response.playUrl.match(/https:\/\/youtu.be\/(.+)/)?.[1] ?? '',
            durationInMillis: response.durationInMillis,
            likeCount: response.like,
            dislikeCount: response.dislike,
            commentCount: response.totalComments,
          })),
        ),
    },
  },
});

export const withRootStore = withReduxStore(() => {
  const store = createStore(rootReducer, undefined, withDevTools(applyMiddleware(epicMiddleware)));

  epicMiddleware.run(rootEpic);

  return store;
});
