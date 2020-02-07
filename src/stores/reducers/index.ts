import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { dramaEpisodeReducer } from './drama-episode';

export const rootReducer = combineReducers({
  auth: authReducer,
  dramaEpisode: dramaEpisodeReducer,
});
