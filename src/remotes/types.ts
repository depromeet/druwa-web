import { UserProvider } from '../models';

// Payloads
export type WithToken<Payload = {}> = Payload & {
  token: string;
};

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface CreateCommentPayload {
  depth: number;
  contents: string;
}

export interface AppendCommentPayload {
  depth: number;
  contents: string;
}

// Responses
export interface UserResponse {
  name: string;
  email: string;
  imageUrl: string;
  provider?: UserProvider;
  registeredAt: string;
}

export interface ImageResponse {
  imageName: string;
  imageUrl: string;
}

export interface DramaResponse {
  dramaId: number;
  title: string;
  summary: string;
  productionCompany: string;
  images: ImageResponse[];
  like: number;
  dislike: number;
  createdAt: string;
  updatedAt: string;
}

export interface DramaEpisodeResponse {
  dramaEpisodeId: number;
  title: string;
  summary: string;
  episodeNumber: number;
  /** @example https://youtu.be/wKZUB4lNP6k */
  playUrl: string;
  like: number;
  dislike: number;
  totalComments: number;
  durationInMillis: number;
}

export interface SignupOrLoginResponse {
  token: string;
}

export interface CommentResponse {
  id: number;
  depth: number;
  contents: string;
  like: number;
  liked: boolean;
  dislike: number;
  disliked: boolean;
  createdAt: string;
  updatedAt: string;
  prev: number;
  isRoot: boolean;
  user: UserResponse;
}

export interface CommentLikeStatusResponse {
  id: number;
  like: number;
  liked: boolean;
  dislike: number;
  disliked: boolean;
}

// Errors
