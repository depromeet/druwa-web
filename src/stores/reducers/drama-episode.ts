import produce from 'immer';
import { ActionType, createReducer } from 'typesafe-actions';
import { Drama, DramaEpisode } from '../../models';
import * as dramaEpisodeActions from '../actions/drama-episode';

const { fetchDramaWithEpisodeActions, fetchRelatedDramasActions } = dramaEpisodeActions;

export type DramaEpisodeState = Readonly<{
  isRequesting: boolean;
  drama: Drama | null;
  episode: DramaEpisode | null;
  relatedDramas: Drama[] | null;
}>;

export const dramaEpisodeReducer = createReducer<
  DramaEpisodeState,
  ActionType<typeof dramaEpisodeActions>
>({
  isRequesting: false,
  drama: null,
  episode: null,
  relatedDramas: null,
})
  .handleAction(fetchDramaWithEpisodeActions.request, state =>
    produce(state, draft => {
      draft.isRequesting = true;
    }),
  )
  .handleAction(fetchDramaWithEpisodeActions.success, (state, action) =>
    produce(state, draft => {
      draft.isRequesting = false;
      draft.drama = action.payload.drama;
      draft.episode = action.payload.episode;
    }),
  )
  .handleAction(fetchDramaWithEpisodeActions.failure, state =>
    produce(state, draft => {
      draft.isRequesting = false;
    }),
  )
  .handleAction(fetchRelatedDramasActions.success, (state, action) =>
    produce(state, draft => {
      draft.relatedDramas = action.payload.relatedDramas;
    }),
  );
