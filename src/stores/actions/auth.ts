import { createAction, createAsyncAction, createCustomAction } from 'typesafe-actions';
import { User } from '../../models';

type AuthorizeActionPayload =
  | {
      authorized: true;
      user: User;
      token: string;
    }
  | {
      authorized: false;
    };

export const authorizeAction = createAction('auth/AUTHORIZE')<AuthorizeActionPayload>();

export const authorizeWithTokenWhichFromStorageAction = createCustomAction(
  'auth/AUTHORIZE_WITH_TOKEN_WHICH_FROM_STORAGE',
);

export const loginWithTokenActions = createAsyncAction(
  'auth/LOGIN_WITH_TOKEN',
  'auth/LOGIN_WITH_TOKEN_COMPLETE',
  'auth/LOGIN_WITH_TOKEN_FAIL',
)<{ token: string }, { token: string; user: User }, { error: Error }>();
