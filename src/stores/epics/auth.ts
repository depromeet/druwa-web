import { combineEpics } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { authTokenStorageKey } from '../../constants';
import { createStorage } from '../../utils';
import {
  authorizeAction,
  authorizeWithTokenWhichFromStorageAction,
  loginWithTokenActions,
} from '../actions';
import { Epic } from '../types';

const storage = createStorage();

const findTokenFromStorageAndAuthorizeEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(authorizeWithTokenWhichFromStorageAction)),
    switchMap(() => {
      const token = storage.get(authTokenStorageKey);

      if (token === null) {
        return of(authorizeAction({ authorized: false }));
      }

      return api.authorize(token).pipe(
        tap(() => {
          storage.set(authTokenStorageKey, token);
        }),
        map(user =>
          authorizeAction({
            authorized: true,
            user,
            token,
          }),
        ),
        catchError(() => {
          storage.delete(authTokenStorageKey);

          return of(authorizeAction({ authorized: false }));
        }),
      );
    }),
  );

const loginWithTokenEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(loginWithTokenActions.request)),
    switchMap(action => {
      const {
        token,
        successMessage = '로그인이 완료되었습니다.',
        failureMessage = '로그인에 실패하였습니다.',
      } = action.payload;

      return api.authorize(token).pipe(
        tap(() => {
          storage.set(authTokenStorageKey, token);
          alert(successMessage);
        }),
        map(user => loginWithTokenActions.success({ token, user })),
        catchError(error => {
          storage.delete(authTokenStorageKey);
          alert(failureMessage);

          return of(loginWithTokenActions.failure({ error }));
        }),
      );
    }),
  );

export const authEpic = combineEpics(findTokenFromStorageAndAuthorizeEpic, loginWithTokenEpic);
