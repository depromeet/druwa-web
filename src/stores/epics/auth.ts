import { combineEpics } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { authorizeWithTokenAction } from '../actions';
import { Epic } from '../types';

const authorizeEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(authorizeWithTokenAction.request)),
    switchMap(({ payload: { token } }) =>
      api.authorize(token).pipe(
        map(user =>
          authorizeWithTokenAction.success({
            user,
            token,
          }),
        ),
        catchError(error => of(authorizeWithTokenAction.failure({ error }))),
      ),
    ),
  );

export const authEpic = combineEpics(authorizeEpic);
