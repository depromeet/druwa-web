import { createAction, createCustomAction } from 'typesafe-actions';
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

export const loginWithTokenAction = createAction('auth/LOGIN_WITH_TOKEN')<{ token: string }>();
