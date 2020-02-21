import { createAsyncAction } from 'typesafe-actions';
import {
  Comment,
  CommentLikeStatus,
  Drama,
  DramaEpisode,
  DramaLikeStatus,
  LikeType,
  Review,
} from '../../models';

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

export const fetchRelatedDramasActions = createAsyncAction(
  'drama-episode/FETCH_RELATED_DRAMAS',
  'drama-episode/FETCH_RELATED_DRAMAS_COMPLETE',
  'drama-episode/FETCH_RELATED_DRAMAS_FAIL',
)<{ dramaId: number }, { relatedDramas: Drama[] }, { error: Error }>();

export const fetchDramaEpisodeListActions = createAsyncAction(
  'drama-episode/FETCH_DRAMA_EPISODE_LIST',
  'drama-episode/FETCH_DRAMA_EPISODE_LIST_COMPLETE',
  'drama-episode/FETCH_DRAMA_EPISODE_LIST_FAIL',
)<{ dramaId: number }, { episodes: DramaEpisode[] }, { error: Error }>();

export const fetchDramaEpisodeCommentsActions = createAsyncAction(
  'drama-episode/FETCH_DRAMA_EPISODE_COMMENTS',
  'drama-episode/FETCH_DRAMA_EPISODE_COMMENTS_COMPLETE',
  'drama-episode/FETCH_DRAMA_EPISODE_COMMENTS_FAIL',
)<{ dramaId: number; episodeId: number }, { comments: Comment[] }, { error: Error }>();

export const fetchDramaReviewsActions = createAsyncAction(
  'drama-episode/FETCH_DRAMA_REVIEWS',
  'drama-episode/FETCH_DRAMA_REVIEWS_COMPLETE',
  'drama-episode/FETCH_DRAMA_REVIEWS_FAIL',
)<{ dramaId: number }, { reviews: Review[] }, { error: Error }>();

export const patchDramaLikeActions = createAsyncAction(
  'drama-episode/PATCH_DRAMA_LIKE',
  'drama-episode/PATCH_DRAMA_LIKE_COMPLETE',
  'drama-episode/PATCH_DRAMA_LIKE_FAIL',
)<{ dramaId: number; like: LikeType }, { dramaLikeStatus: DramaLikeStatus }, { error: Error }>();

export const patchDramaEpisodeCommentLikeActions = createAsyncAction(
  'drama-episode/PATCH_COMMENT_LIKE',
  'drama-episode/PATCH_COMMENT_LIKE_COMPLETE',
  'drama-episode/PATCH_COMMENT_LIKE_FAIL',
)<
  { dramaId: number; episodeId: number; commentId: number; like: LikeType },
  { commentLikeStatus: CommentLikeStatus },
  { error: Error }
>();
