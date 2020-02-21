export interface Image {
  imageName: string;
  imageUrl: string;
}

export const getHorizontalImage = (images: Image[]) =>
  images.find(x => x.imageName === 's')?.imageUrl ??
  '/assets/images/drama-episode-thumbnail-placeholder@3x.png';
