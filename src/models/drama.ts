import { DramaResponse } from '../remotes';
import { Image } from './image';

export interface Drama {
  id: number;
  title: string;
  summary: string;
  productionCompany: string;
  images: Image[];
  likeCount: number;
  dislikeCount: number;
  createdAt: string;
}

export const dramaFromResponse = (response: DramaResponse): Drama => ({
  id: response.dramaId,
  title: response.title,
  summary: response.summary,
  productionCompany: response.productionCompany,
  images: response.images,
  likeCount: response.like,
  dislikeCount: response.dislike,
  createdAt: response.createdAt,
});
