import { combineEpics } from 'redux-observable';
import { forkJoin, of } from 'rxjs';
import { catchError, filter, ignoreElements, map, switchMap, tap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { fetchDramaWithEpisodeActions, fetchRelatedDramasActions } from '../actions';
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

const handleInvalidDramaEpisodeErrorEpic: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(fetchDramaWithEpisodeActions.failure)),
    tap(() => {
      alert('잘못된 경로 입니다.');
      window.location.href = '/home';
    }),
    ignoreElements(),
  );

export const dramaEpisodeEpic = combineEpics(
  fetchDramaEpisodeEpic,
  fetchRelatedDramasEpisodeEpic,
  handleInvalidDramaEpisodeErrorEpic,
);
