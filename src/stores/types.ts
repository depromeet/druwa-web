import { Epic as EpicType } from 'redux-observable';
import { Observable } from 'rxjs';
import { ActionType, StateType } from 'typesafe-actions';
import {
  Comment,
  CommentLikeStatus,
  Drama,
  DramaEpisode,
  DramaLikeStatus,
  Review,
  User,
} from '../models';
import * as allActions from './actions';
import { rootReducer } from './reducers';

export type Actions = ActionType<typeof allActions>;

export type State = StateType<typeof rootReducer>;

type EpicApiDependency = Readonly<{
  authorize: (token: string) => Observable<User>;
  fetchDrama: (dramaId: number, authToken?: string) => Observable<Drama>;
  fetchDramaEpisodeList: (dramaId: number) => Observable<DramaEpisode[]>;
  fetchDramaEpisode: (dramaId: number, episodeId: number) => Observable<DramaEpisode>;
  fetchRelatedDramas: (dramaId: number) => Observable<Drama[]>;
  fetchDramaEpisodeComments: (
    dramaId: number,
    episodeId: number,
    authToken?: string,
  ) => Observable<Comment[]>;
  fetchDramaReviews: (dramaId: number, authToken?: string) => Observable<Review[]>;
  patchDramaLike: (dramaId: number, authToken: string) => Observable<DramaLikeStatus>;
  patchDramaEpisodeCommentLike: (
    dramaId: number,
    episodeId: number,
    commentId: number,
    authToken: string,
  ) => Observable<CommentLikeStatus>;
  patchDramaDislike: (dramaId: number, authToken: string) => Observable<DramaLikeStatus>;
  patchDramaEpisodeCommentDislike: (
    dramaId: number,
    episodeId: number,
    commentId: number,
    authToken: string,
  ) => Observable<CommentLikeStatus>;
}>;

export type EpicDependency = Readonly<{
  api: EpicApiDependency;
}>;

export type Epic = EpicType<Actions, Actions, State, EpicDependency>;
