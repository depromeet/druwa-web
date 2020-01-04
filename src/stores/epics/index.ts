import { combineEpics } from 'redux-observable';
import { authEpic } from './auth';
import { exceptionsEpic } from './exceptions';

export const rootEpic = combineEpics(authEpic, exceptionsEpic);
