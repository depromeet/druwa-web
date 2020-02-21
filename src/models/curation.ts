import { DramaCurationResponse } from '../remotes';
import { Image } from './image';

export interface DramaCurationItem {
  id: number;
  title: string;
  productionCompany: string;
  images: Image[];
}

export const curationsFromResponse = (response: DramaCurationResponse): DramaCurationItem[] =>
  response.dramas.map(data => ({
    id: data.dramaId,
    title: data.title,
    productionCompany: data.productionCompany,
    images: data.images,
  }));
