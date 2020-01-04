import produce from 'immer';
import { ActionType, createReducer } from 'typesafe-actions';
import { User } from '../../models';
import * as authActions from '../actions/auth';

const { authorizeWithTokenAction } = authActions;

export type AuthState = Readonly<{
  isAuthorized: boolean;
  token: string | null;
  user: User | null;
}>;

export const authReducer = createReducer<AuthState, ActionType<typeof authActions>>({
  isAuthorized: false,
  token: null,
  user: null,
})
  .handleAction(authorizeWithTokenAction.success, (state, action) => {
    const { token, user } = action.payload;

    return produce(state, draft => {
      draft.isAuthorized = true;
      draft.token = token;
      draft.user = user;
    });
  })
  .handleAction(authorizeWithTokenAction.failure, state => {
    return produce(state, draft => {
      draft.isAuthorized = false;
      draft.token = null;
      draft.user = null;
    });
  });
