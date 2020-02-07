import { Epic as EpicType } from 'redux-observable';
import { Observable } from 'rxjs';
import { ActionType, StateType } from 'typesafe-actions';
import { Drama, DramaEpisode, User } from '../models';
import * as allActions from './actions';
import { rootReducer } from './reducers';

export type Actions = ActionType<typeof allActions>;

export type State = StateType<typeof rootReducer>;

type EpicApiDependency = Readonly<{
  authorize: (token: string) => Observable<User>;
  fetchDrama: (dramaId: number) => Observable<Drama>;
  fetchDramaEpisode: (dramaId: number, episodeId: number) => Observable<DramaEpisode>;
}>;

export type EpicDependency = Readonly<{
  api: EpicApiDependency;
}>;

export type Epic = EpicType<Actions, Actions, State, EpicDependency>;
