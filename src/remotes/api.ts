import { map } from 'rxjs/operators';
import { deployUrl } from '../environment';
import { rxHttp } from './rx-http';
import {
  AppendCommentPayload,
  CommentLikeStatusResponse,
  CommentResponse,
  CreateCommentPayload,
  DramaCurationResponse,
  DramaEpisodeResponse,
  DramaResponse,
  LoginPayload,
  SignupOrLoginResponse,
  SignupPayload,
  UserResponse,
  WithToken,
} from './types';

const API_URL = 'https://api.druwa.site';
const apiUrl = (path: string) => `${API_URL}${path}`;

const oauthRedirectUrl = encodeURIComponent(`${deployUrl}/oauth/check`);

export const oauthApiUrls = {
  kakao: apiUrl(`/oauth2/authorize/kakao?redirect_uri=${oauthRedirectUrl}`),
} as const;

const authorizationHeader = (token?: string): Record<string, string> =>
  token != null
    ? {
      Authorization: `Bearer ${token}`,
    }
    : {};

export function requestAuthorize(payload: WithToken) {
  return rxHttp.get<UserResponse>(apiUrl('/users/me'), {
    headers: authorizationHeader(payload.token),
  });
}

export function fetchDrama(dramaId: number) {
  return rxHttp.get<DramaResponse>(apiUrl(`/dramas/${dramaId}`));
}

export function fetchDramaEpisode(dramaId: number, episodeId: number) {
  return rxHttp.get<DramaEpisodeResponse>(apiUrl(`/dramas/${dramaId}/episodes/${episodeId}`));
}

export function fetchRelatedDramas(dramaId: number) {
  return rxHttp
    .get<DramaResponse[]>(apiUrl(`/dramas/${dramaId}/related`))
    .pipe(map(dramas => dramas.filter(drama => drama.dramaId !== dramaId)));
}

export function fetchDramaEpisodeList(dramaId: number) {
  return rxHttp.get<DramaEpisodeResponse[]>(apiUrl(`/dramas/${dramaId}/episodes`));
}

export function requestSignup(payload: SignupPayload) {
  return rxHttp.post<SignupOrLoginResponse>(apiUrl('/users/signup'), payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function requestLogin(payload: LoginPayload) {
  return rxHttp.post<SignupOrLoginResponse>(apiUrl('/users/login'), payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function fetchDramaEpisodeComments(dramaId: number, episodeId: number, authToken?: string) {
  return rxHttp.get<CommentResponse[]>(
    apiUrl(`/dramas/${dramaId}/episodes/${episodeId}/comments`),
    {
      headers: authorizationHeader(authToken),
    },
  );
}

export function patchDramaEpisodeCommentLike(
  dramaId: number,
  episodeId: number,
  commentId: number,
  authToken: string,
) {
  return rxHttp
    .patch<Omit<CommentLikeStatusResponse, 'id'>>(
      apiUrl(`/dramas/${dramaId}/episodes/${episodeId}/comments/${commentId}/like`),
      null,
      {
        headers: {
          ...authorizationHeader(authToken),
        },
      },
    )
    .pipe(map(response => ({ id: commentId, ...response })));
}

export function patchDramaEpisodeCommentDislike(
  dramaId: number,
  episodeId: number,
  commentId: number,
  authToken: string,
) {
  return rxHttp
    .patch<Omit<CommentLikeStatusResponse, 'id'>>(
      apiUrl(`/dramas/${dramaId}/episodes/${episodeId}/comments/${commentId}/dislike`),
      null,
      {
        headers: {
          ...authorizationHeader(authToken),
        },
      },
    )
    .pipe(map(response => ({ id: commentId, ...response })));
}

export function createDramaEpisodeComment(
  dramaId: number,
  episodeId: number,
  commentText: string,
  authToken: string,
) {
  const payload: CreateCommentPayload = {
    depth: 1,
    contents: commentText,
  };

  return rxHttp.post<void>(apiUrl(`/dramas/${dramaId}/episodes/${episodeId}/comments`), payload, {
    headers: {
      'Content-Type': 'application/json',
      ...authorizationHeader(authToken),
    },
  });
}

export function appendDramaEpisodeComment(
  dramaId: number,
  episodeId: number,
  commentId: number,
  commentText: string,
  authToken: string,
) {
  const payload: AppendCommentPayload = {
    depth: 2,
    contents: commentText,
  };

  return rxHttp.post<void>(
    apiUrl(`/dramas/${dramaId}/episodes/${episodeId}/comments/${commentId}`),
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
        ...authorizationHeader(authToken),
      },
    },
  );
}

let uniqueId = 0;

export function fetchCuration() {
  return rxHttp.get<DramaCurationResponse>(apiUrl(`/curation/${uniqueId++}`));
}
