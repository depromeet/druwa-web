import { createSelector } from 'reselect';
import { State } from '../types';

export const selectDramaEpisodeState = (state: State) => state.dramaEpisode;

export const selectDrama = createSelector(selectDramaEpisodeState, state => state.drama);

export const selectDramaEpisode = createSelector(selectDramaEpisodeState, state => state.episode);