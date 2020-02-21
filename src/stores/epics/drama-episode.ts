import { combineEpics } from 'redux-observable';
import { EMPTY, forkJoin, of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  filter,
  flatMap,
  ignoreElements,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import {
  fetchDramaEpisodeCommentsActions,
  fetchDramaEpisodeListActions,
  fetchDramaReviewsActions,
  fetchDramaWithEpisodeActions,
  fetchRelatedDramasActions,
  patchDramaEpisodeCommentLikeActions,
  patchDramaLikeActions,
} from '../actions';
import { Epic } from '../types';

const fetchDramaEpisodeEpic: Epic = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(fetchDramaWithEpisodeActions.request)),
    switchMap(action => {
      const { dramaId, episodeId } = action.payload;
      const { token } = state$.value.auth;

      return forkJoin([
        api.fetchDrama(dramaId, token ?? undefined),
        api.fetchDramaEpisode(dramaId, episodeId),
      ]).pipe(
        map(([drama, episode]) => fetchDramaWithEpisodeActions.success({ drama, episode })),
        catchError(error => of(fetchDramaWithEpisodeActions.failure({ error }))),
      );
    }),
  );

const fetchRelatedDramasEpisodeEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(fetchRelatedDramasActions.request)),
    switchMap(action =>
      api.fetchRelatedDramas(action.payload.dramaId).pipe(
        map(relatedDramas => fetchRelatedDramasActions.success({ relatedDramas })),
        catchError(error => of(fetchRelatedDramasActions.failure({ error }))),
      ),
    ),
  );

const fetchDramaEpisodeListEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(fetchDramaEpisodeListActions.request)),
    switchMap(action =>
      api.fetchDramaEpisodeList(action.payload.dramaId).pipe(
        map(episodes => fetchDramaEpisodeListActions.success({ episodes })),
        catchError(error => of(fetchDramaEpisodeListActions.failure({ error }))),
      ),
    ),
  );

const handleInvalidDramaEpisodeErrorEpic: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(fetchDramaWithEpisodeActions.failure)),
    tap(() => {
      alert('잘못된 경로 입니다.');
      window.location.href = '/home';
    }),
    ignoreElements(),
  );

const fetchDramaEpisodeCommentsEpic: Epic = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(fetchDramaEpisodeCommentsActions.request)),
    switchMap(action => {
      const { dramaId, episodeId } = action.payload;
      const { token } = state$.value.auth;

      return api.fetchDramaEpisodeComments(dramaId, episodeId, token ?? undefined).pipe(
        flatMap(comments =>
          of(
            fetchDramaEpisodeCommentsActions.success({ comments }),
            fetchDramaWithEpisodeActions.request({ dramaId, episodeId }),
          ),
        ),
        catchError(error => of(fetchDramaEpisodeCommentsActions.failure({ error }))),
      );
    }),
  );

const fetchDramaReviewsEpic: Epic = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(fetchDramaReviewsActions.request)),
    switchMap(action => {
      const { dramaId } = action.payload;
      const { token } = state$.value.auth;

      return api.fetchDramaReviews(dramaId, token ?? undefined).pipe(
        map(reviews => fetchDramaReviewsActions.success({ reviews })),
        catchError(error => of(fetchDramaReviewsActions.failure({ error }))),
      );
    }),
  );

const patchDramaLikeEpic: Epic = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(patchDramaLikeActions.request)),
    exhaustMap(action => {
      const { dramaId, like } = action.payload;
      const { token } = state$.value.auth;

      if (token == null) {
        return EMPTY;
      }

      switch (like) {
        case 'like':
          return api.patchDramaLike(dramaId, token).pipe(
            map(dramaLikeStatus => patchDramaLikeActions.success({ dramaLikeStatus })),
            catchError(error => of(patchDramaLikeActions.failure({ error }))),
          );
        case 'dislike':
          return api.patchDramaDislike(dramaId, token).pipe(
            map(dramaLikeStatus => patchDramaLikeActions.success({ dramaLikeStatus })),
            catchError(error => of(patchDramaLikeActions.failure({ error }))),
          );
        default:
          return EMPTY;
      }
    }),
  );

const patchDramaEpisodeCommentLikeEpic: Epic = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(patchDramaEpisodeCommentLikeActions.request)),
    exhaustMap(action => {
      const { dramaId, episodeId, commentId, like } = action.payload;
      const { token } = state$.value.auth;

      if (token == null) {
        return EMPTY;
      }

      switch (like) {
        case 'like':
          return api.patchDramaEpisodeCommentLike(dramaId, episodeId, commentId, token).pipe(
            map(commentLikeStatus =>
              patchDramaEpisodeCommentLikeActions.success({ commentLikeStatus }),
            ),
            catchError(error => of(patchDramaEpisodeCommentLikeActions.failure({ error }))),
          );
        case 'dislike':
          return api.patchDramaEpisodeCommentDislike(dramaId, episodeId, commentId, token).pipe(
            map(commentLikeStatus =>
              patchDramaEpisodeCommentLikeActions.success({ commentLikeStatus }),
            ),
            catchError(error => of(patchDramaEpisodeCommentLikeActions.failure({ error }))),
          );
        default:
          return EMPTY;
      }
    }),
  );

export const dramaEpisodeEpic = combineEpics(
  fetchDramaEpisodeEpic,
  fetchRelatedDramasEpisodeEpic,
  fetchDramaEpisodeListEpic,
  fetchDramaReviewsEpic,
  handleInvalidDramaEpisodeErrorEpic,
  fetchDramaEpisodeCommentsEpic,
  patchDramaLikeEpic,
  patchDramaEpisodeCommentLikeEpic,
);
