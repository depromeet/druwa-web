import { User } from '../models';
import { rxHttp } from './rx-http';
import { WithToken } from './types';

const API_URL = 'some_api_root'; // TODO(@seokju-na): 서버 API경로 받으면 수정
const apiUrl = (path: string) => `${API_URL}${path}`;

const authorizationHeader = (token: string) => ({
  Authorization: `JWT ${token}`,
});

export function requestAuthorize(payload: WithToken) {
  return rxHttp.get<User>(apiUrl('/auth'), {
    headers: authorizationHeader(payload.token),
  });
}
