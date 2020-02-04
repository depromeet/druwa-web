import { combineEpics } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { authTokenStorageKey } from '../../constants';
import { createStorage } from '../../utils';
import { authorizeAction, authorizeWithTokenWhichFromStorageAction } from '../actions';
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

export const authEpic = combineEpics(findTokenFromStorageAndAuthorizeEpic);
