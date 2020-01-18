import { User } from '../models';
import { rxHttp } from './rx-http';
import { WithToken } from './types';

const API_URL = 'https://api.druwa.site';
const apiUrl = (path: string) => `${API_URL}${path}`;

const authorizationHeader = (token: string) => ({
  Authorization: `JWT ${token}`,
});

export function requestAuthorize(payload: WithToken) {
  return rxHttp.get<User>(apiUrl('/auth'), {
    headers: authorizationHeader(payload.token),
  });
}
