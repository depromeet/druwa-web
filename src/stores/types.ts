import { Observable } from 'rxjs';
import { ActionType, StateType } from 'typesafe-actions';
import { Epic as EpicType } from 'redux-observable';
import { User } from '../models';
import * as allActions from './actions';
import { rootReducer } from './reducers';

export type Actions = ActionType<typeof allActions>;

export type State = StateType<typeof rootReducer>;

type EpicApiDependency = Readonly<{
  authorize: (token: string) => Observable<User>;
}>;

export type EpicDependency = Readonly<{
  api: EpicApiDependency;
}>;

export type Epic = EpicType<Actions, Actions, State, EpicDependency>;
