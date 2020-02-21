import { DramaCurationResponse } from '../remotes';
import { Image } from './image';

export interface DramaCurationItem {
  id: number;
  title: string;
  summary: string;
  productionCompany: string;
  images: Image[];
  likeCount: number;
  liked: boolean;
}

export const curationsFromResponse = (response: DramaCurationResponse): DramaCurationItem[] =>
  response.dramas.map(data => ({
    id: data.dramaId,
    title: data.title,
    summary: data.summary,
    productionCompany: data.productionCompany,
    images: data.images,
    likeCount: data.like,
    liked: data.liked,
  }));
