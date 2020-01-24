import { combineEpics } from 'redux-observable';
import { EMPTY, of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { authTokenStorageKey } from '../../constants';
import { createStorage } from '../../utils';
import { authorizeWithTokenActions, authorizeWithTokenWhichFromStorageAction } from '../actions';
import { Epic } from '../types';

const storage = createStorage();

const findTokenFromStorageAndAuthorizeEpic: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(authorizeWithTokenWhichFromStorageAction)),
    switchMap(() => {
      const token = storage.get(authTokenStorageKey);

      return token !== null ? of(authorizeWithTokenActions.request({ token })) : EMPTY;
    }),
  );

const authorizeEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(authorizeWithTokenActions.request)),
    switchMap(({ payload: { token } }) =>
      api.authorize(token).pipe(
        tap(() => {
          storage.set(authTokenStorageKey, token);
        }),
        map(user =>
          authorizeWithTokenActions.success({
            user,
            token,
          }),
        ),
        catchError(error => {
          storage.delete(authTokenStorageKey);

          return of(authorizeWithTokenActions.failure({ error }));
        }),
      ),
    ),
  );

export const authEpic = combineEpics(findTokenFromStorageAndAuthorizeEpic, authorizeEpic);
