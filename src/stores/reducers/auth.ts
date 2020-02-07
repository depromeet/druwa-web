import produce from 'immer';
import { ActionType, createReducer } from 'typesafe-actions';
import { User } from '../../models';
import * as authActions from '../actions/auth';

const { authorizeAction, loginWithTokenActions } = authActions;

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
})
  .handleAction(authorizeAction, (state, action) =>
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
  )
  .handleAction(loginWithTokenActions.request, state =>
    produce(state, draft => {
      draft.isAuthorizeProcessing = true;
    }),
  )
  .handleAction(loginWithTokenActions.success, (state, action) =>
    produce(state, draft => {
      draft.isAuthorizeProcessing = false;
      draft.token = action.payload.token;
      draft.user = action.payload.user;
    }),
  )
  .handleAction(loginWithTokenActions.failure, state =>
    produce(state, draft => {
      draft.isAuthorizeProcessing = false;
      draft.token = null;
      draft.user = null;
    }),
  );
