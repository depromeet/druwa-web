import { map } from 'rxjs/operators';
import { deployUrl } from '../environment';
import { User } from '../models';
import { rxHttp } from './rx-http';
import {
  DramaEpisodeResponse,
  DramaResponse,
  LoginPayload,
  SignupOrLoginResponse,
  SignupPayload,
  WithToken,
} from './types';

const API_URL = 'https://api.druwa.site';
const apiUrl = (path: string) => `${API_URL}${path}`;

const oauthRedirectUrl = encodeURIComponent(`${deployUrl}/oauth/check`);

export const oauthApiUrls = {
  kakao: apiUrl(`/oauth2/authorize/kakao?redirect_uri=${oauthRedirectUrl}`),
} as const;

const authorizationHeader = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

export function requestAuthorize(payload: WithToken) {
  return rxHttp.get<User>(apiUrl('/users/me'), {
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
