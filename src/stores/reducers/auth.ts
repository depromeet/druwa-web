import produce from 'immer';
import { ActionType, createReducer } from 'typesafe-actions';
import { User } from '../../models';
import * as authActions from '../actions/auth';

const { authorizeAction } = authActions;

export type AuthState = Readonly<{
  isInitialized: boolean;
  isAuthorizeProcessing: boolean;
  isAuthorized: boolean;
  token: string | null;
  user: User | null;
}>;

export const authReducer = createReducer<AuthState, ActionType<typeof authActions>>({
  isInitialized: false,
  isAuthorizeProcessing: true,
  isAuthorized: false,
  token: null,
  user: null,
}).handleAction(authorizeAction, (state, action) =>
  produce(state, draft => {
    draft.isInitialized = true;
    draft.isAuthorizeProcessing = false;

    if (action.payload.authorized) {
      const { token, user } = action.payload;

      draft.isAuthorized = true;
      draft.token = token;
      draft.user = user;
    } else {
      draft.isAuthorized = false;
    }
  }),
);
