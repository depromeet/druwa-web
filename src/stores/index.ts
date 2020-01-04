import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { requestAuthorize } from '../remotes';
import { rootEpic } from './epics';
import { rootReducer } from './reducers';
import { Actions, EpicDependency, State } from './types';
import { withDevTools } from './util/devtools';
import { withReduxStore } from './util/hoc';

const epicMiddleware = createEpicMiddleware<Actions, Actions, State, EpicDependency>({
  dependencies: {
    api: {
      authorize: token => requestAuthorize({ token }),
    },
  },
});

export const withRootStore = withReduxStore(() => {
  const store = createStore(rootReducer, undefined, withDevTools(applyMiddleware(epicMiddleware)));

  epicMiddleware.run(rootEpic);

  return store;
});
