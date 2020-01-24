import { createAsyncAction, createCustomAction } from 'typesafe-actions';
import { User } from '../../models';

export const authorizeWithTokenActions = createAsyncAction(
  'auth/AUTHORIZE_WITH_TOKEN',
  'auth/AUTHORIZE_WITH_TOKEN_COMPLETE',
  'auth/auth/AUTHORIZE_WITH_TOKEN_FAIL',
)<
  { token: string },
  {
    token: string;
    user: User;
  },
  { error: Error }
>();

export const authorizeWithTokenWhichFromStorageAction = createCustomAction(
  'auth/AUTHORIZE_WITH_TOKEN_WHICH_FROM_STORAGE',
);
