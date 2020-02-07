import { createAsyncAction } from 'typesafe-actions';
import { Drama, DramaEpisode } from '../../models';

export const fetchDramaWithEpisodeActions = createAsyncAction(
  'drama-episode/FETCH_DRAMA_EPISODE',
  'drama-episode/FETCH_DRAMA_EPISODE_COMPLETE',
  'drama-episode/FETCH_DRAMA_EPISODE_FAIL',
)<
  { dramaId: number; episodeId: number },
  {
    drama: Drama;
    episode: DramaEpisode;
  },
  { error: Error }
>();