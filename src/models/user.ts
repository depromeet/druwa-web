export type UserProvider = 'kakao';

export interface User {
  name: number;
  email: string;
  provider?: UserProvider;
  imageUrl?: string;
  registeredAt: string;
}
