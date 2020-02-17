import produce from 'immer';
import { ActionType, createReducer } from 'typesafe-actions';
import { Comment, Drama, DramaEpisode } from '../../models';
import * as dramaEpisodeActions from '../actions/drama-episode';

const {
  fetchDramaWithEpisodeActions,
  fetchRelatedDramasActions,
  fetchDramaEpisodeListActions,
  fetchDramaEpisodeCommentsActions,
  patchDramaEpisodeCommentLikeActions,
} = dramaEpisodeActions;

export type DramaEpisodeState = Readonly<{
  isRequesting: boolean;
  drama: Drama | null;
  episode: DramaEpisode | null;
  episodeList: DramaEpisode[];
  relatedDramas: Drama[] | null;
  comments: Comment[];
}>;

export const dramaEpisodeReducer = createReducer<
  DramaEpisodeState,
  ActionType<typeof dramaEpisodeActions>
>({
  isRequesting: false,
  drama: null,
  episode: null,
  episodeList: [],
  relatedDramas: null,
  comments: [],
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
  )
  .handleAction(fetchDramaEpisodeListActions.success, (state, action) =>
    produce(state, draft => {
      draft.episodeList = action.payload.episodes;
    }),
  )
  .handleAction(fetchDramaEpisodeCommentsActions.success, (state, action) =>
    produce(state, draft => {
      draft.comments = action.payload.comments;
    }),
  )
  .handleAction(patchDramaEpisodeCommentLikeActions.success, (state, action) =>
    produce(state, draft => {
      const { id, ...update } = action.payload.commentLikeStatus;
      const index = draft.comments.findIndex(comment => comment.id === id);

      if (index > -1) {
        draft.comments[index] = {
          ...draft.comments[index],
          ...update,
        };
      }
    }),
  );
