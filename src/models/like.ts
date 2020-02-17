import { Comment } from './comment';

export type LikeType = 'like' | 'dislike';

export const likeTypeFromComment = (comment: Comment) => {
  if (comment.liked) {
    return 'like';
  } else if (comment.disliked) {
    return 'dislike';
  }
  return undefined;
};
