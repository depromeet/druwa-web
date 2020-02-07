import { combineEpics } from 'redux-observable';
import { authEpic } from './auth';
import { dramaEpisodeEpic } from './drama-episode';
import { exceptionsEpic } from './exceptions';

export const rootEpic = combineEpics(authEpic, exceptionsEpic, dramaEpisodeEpic);
