import { DramaResponse } from '../remotes';

export interface Drama {
  id: number;
  title: string;
  summary: string;
  productionCompany: string;
  imageUrls: string[];
  likeCount: number;
  dislikeCount: number;
  createdAt: string;
}

export const dramaFromResponse = (response: DramaResponse): Drama => ({
  id: response.dramaId,
  title: response.title,
  summary: response.summary,
  productionCompany: response.productionCompany,
  imageUrls: response.images,
  likeCount: response.like,
  dislikeCount: response.dislike,
  createdAt: response.createdAt,
});
