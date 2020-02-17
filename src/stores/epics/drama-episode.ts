import { combineEpics } from 'redux-observable';
import { EMPTY, forkJoin, of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  filter,
  ignoreElements,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import {
  fetchDramaEpisodeCommentsActions,
  fetchDramaEpisodeListActions,
  fetchDramaWithEpisodeActions,
  fetchRelatedDramasActions,
  patchDramaEpisodeCommentLikeActions,
} from '../actions';
import { Epic } from '../types';

const fetchDramaEpisodeEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(fetchDramaWithEpisodeActions.request)),
    switchMap(action => {
      const { dramaId, episodeId } = action.payload;

      return forkJoin([api.fetchDrama(dramaId), api.fetchDramaEpisode(dramaId, episodeId)]).pipe(
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
        map(comments => fetchDramaEpisodeCommentsActions.success({ comments })),
        catchError(error => of(fetchDramaEpisodeCommentsActions.failure({ error }))),
      );
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
  handleInvalidDramaEpisodeErrorEpic,
  fetchDramaEpisodeCommentsEpic,
  patchDramaEpisodeCommentLikeEpic,
);
