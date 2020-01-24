import { deployUrl } from '../environment';
import { User } from '../models';
import { rxHttp } from './rx-http';
import { WithToken } from './types';

const API_URL = 'https://api.druwa.site';
const apiUrl = (path: string) => `${API_URL}${path}`;

const oauthRedirectUrl = encodeURIComponent(`${deployUrl}/oauth/check`);

export const oauthApiUrls = {
  kakao: apiUrl(`/oauth2/authorize/kakao?redirect_uri=${oauthRedirectUrl}`),
} as const;

const authorizationHeader = (token: string) => ({
  Authorization: `JWT ${token}`,
});

export function requestAuthorize(payload: WithToken) {
  return rxHttp.get<User>(apiUrl('/users/me'), {
    headers: authorizationHeader(payload.token),
  });
}
