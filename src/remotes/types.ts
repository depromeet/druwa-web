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

// Responses
export interface DramaResponse {
  dramaId: number;
  title: string;
  summary: string;
  productionCompany: string;
  images: string[];
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

// Errors
