import { combineEpics } from 'redux-observable';
import { AjaxError } from 'rxjs/ajax';
import { filter, ignoreElements, tap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { authorizeWithTokenActions } from '../actions';
import { Epic } from '../types';

const handleExceptionsEpic: Epic = action$ =>
  action$.pipe(
    filter(isActionOf([authorizeWithTokenActions.failure])),
    tap(error => {
      if (error instanceof AjaxError) {
        //
      }
    }),
    ignoreElements(),
  );

export const exceptionsEpic = combineEpics(handleExceptionsEpic);
