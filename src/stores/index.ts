import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { map } from 'rxjs/operators';
import { dramaEpisodeFromResponse, dramaFromResponse } from '../models';
import {
  fetchDrama,
  fetchDramaEpisode,
  fetchDramaEpisodeList,
  fetchRelatedDramas,
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
      authorize: token => requestAuthorize({ token }),
      fetchDrama: dramaId => fetchDrama(dramaId).pipe(map(dramaFromResponse)),
      fetchDramaEpisodeList: dramaId =>
        fetchDramaEpisodeList(dramaId).pipe(
          map(episodes => episodes.map(dramaEpisodeFromResponse)),
        ),
      fetchDramaEpisode: (dramaId, episodeId) =>
        fetchDramaEpisode(dramaId, episodeId).pipe(map(dramaEpisodeFromResponse)),
      fetchRelatedDramas: dramaId =>
        fetchRelatedDramas(dramaId).pipe(map(dramas => dramas.map(dramaFromResponse))),
    },
  },
});

export const withRootStore = withReduxStore(() => {
  const store = createStore(rootReducer, undefined, withDevTools(applyMiddleware(epicMiddleware)));

  epicMiddleware.run(rootEpic);

  return store;
});
