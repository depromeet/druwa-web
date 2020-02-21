import { createSelector } from 'reselect';
import { State } from '../types';

export const selectDramaEpisodeState = (state: State) => state.dramaEpisode;

export const selectDrama = createSelector(selectDramaEpisodeState, state => state.drama);

export const selectDramaEpisode = createSelector(selectDramaEpisodeState, state => state.episode);

export const selectRelatedDramas = createSelector(
  selectDramaEpisodeState,
  state => state.relatedDramas,
);

export const selectDramaEpisodeList = createSelector(
  selectDramaEpisodeState,
  state => state.episodeList,
);

export const selectShouldFetchDramaEpisodeList = createSelector(
  selectDramaEpisodeList,
  episodeList => episodeList.length === 0,
);

export const selectDramaEpisodeListWithoutCurrent = createSelector(
  [selectDramaEpisode, selectDramaEpisodeList],
  (currentEpisode, episodes) => episodes.filter(episode => episode.id !== currentEpisode?.id),
);

export const selectDramaEpisodeComments = createSelector(
  selectDramaEpisodeState,
  state => state.comments,
);

export const selectDramaReviews = createSelector(selectDramaEpisodeState, state => state.reviews);
