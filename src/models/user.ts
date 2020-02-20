import { UserResponse } from '../remotes';

export type UserProvider = 'kakao';

export interface User {
  name: string;
  email: string;
  provider?: UserProvider;
  imageUrl?: string;
  registeredAt: string;
}

export const userFromResponse = (response: UserResponse): User => ({
  name: response.name,
  email: response.email,
  provider: response.provider,
  imageUrl: response.imageUrl === '' || response.imageUrl == null ? undefined : response.imageUrl,
  registeredAt: response.registeredAt,
});
