import { DramaLikeStatusResponse, DramaResponse } from '../remotes';
import { Image } from './image';

export interface Drama {
  id: number;
  title: string;
  summary: string;
  productionCompany: string;
  images: Image[];
  likeCount: number;
  liked: boolean;
  dislikeCount: number;
  disliked: boolean;
  createdAt: string;
}

export type DramaLikeStatus = Pick<
  Drama,
  'id' | 'likeCount' | 'dislikeCount' | 'liked' | 'disliked'
>;

export const dramaFromResponse = (response: DramaResponse): Drama => ({
  id: response.dramaId,
  title: response.title,
  summary: response.summary,
  productionCompany: response.productionCompany,
  images: response.images,
  likeCount: response.like,
  liked: response.liked,
  dislikeCount: response.dislike,
  disliked: response.disliked,
  createdAt: response.createdAt,
});

export const dramaLikeStatusFromResponse = (
  response: DramaLikeStatusResponse,
): DramaLikeStatus => ({
  id: response.id,
  likeCount: response.like,
  liked: response.liked,
  dislikeCount: response.dislike,
  disliked: response.disliked,
});
