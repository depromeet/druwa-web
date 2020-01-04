import { createAsyncAction } from 'typesafe-actions';
import { User } from '../../models';

export const authorizeWithTokenAction = createAsyncAction(
  'AUTH_AUTHORIZE_WITH_TOKEN',
  'AUTH_AUTHORIZE_WITH_TOKEN_COMPLETE',
  'AUTH_AUTHORIZE_WITH_TOKEN_FAIL',
)<
  { token: string },
  {
    token: string;
    user: User;
  },
  { error: Error }
>();
