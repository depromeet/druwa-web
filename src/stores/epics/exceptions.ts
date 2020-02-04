import { combineEpics } from 'redux-observable';
import { filter, ignoreElements, tap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { Epic } from '../types';

const handleExceptionsEpic: Epic = action$ =>
  action$.pipe(
    filter(isActionOf([])),
    tap(() => {}),
    ignoreElements(),
  );

export const exceptionsEpic = combineEpics(handleExceptionsEpic);
