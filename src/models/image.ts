export interface Image {
  imageName: string;
  imageUrl: string;
}

export const getHorizontalImage = (images: Image[]) =>
  images.find(x => x.imageName === 's')?.imageUrl ??
  '/assets/images/drama-episode-thumbnail-placeholder@3x.png';

export const getVerticalImage = (images: Image[]) =>
  images.find(x => x.imageName === 'b')?.imageUrl ??
  '/assets/images/drama-episode-thumbnail-placeholder@3x.png';
