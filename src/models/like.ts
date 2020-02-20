import { SubComment } from './comment';

export type LikeType = 'like' | 'dislike';

export const likeTypeFromComment = (comment: SubComment) => {
  if (comment.liked) {
    return 'like';
  } else if (comment.disliked) {
    return 'dislike';
  }
  return undefined;
};
