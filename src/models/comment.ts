import { CommentLikeStatusResponse, CommentResponse } from '../remotes';

export interface Comment {
  id: number;
  body: string;
  likeCount: number;
  liked: boolean;
  dislikeCount: number;
  disliked: boolean;
  createdAt: string;
  subComments: Array<Omit<Comment, 'subComments'>>;
}

export type CommentLikeStatus = Pick<
  Comment,
  'id' | 'likeCount' | 'liked' | 'dislikeCount' | 'disliked'
>;

export const commentsFromResponse = (response: CommentResponse[]): Comment[] => {
  const comments: Comment[] = [];

  for (const data of response) {
    if (data.isRoot) {
      comments.push({
        id: data.id,
        body: data.contents,
        likeCount: data.like,
        liked: data.liked,
        dislikeCount: data.dislike,
        disliked: data.disliked,
        createdAt: data.createdAt,
        subComments: [],
      });
    } else {
      const comment = comments.find(x => x.id === data.prev);

      comment?.subComments.push({
        id: data.id,
        body: data.contents,
        likeCount: data.like,
        liked: data.liked,
        dislikeCount: data.dislike,
        disliked: data.disliked,
        createdAt: data.createdAt,
      });
    }
  }

  return comments;
};

export const commentLikeStatusFromResponse = (
  response: CommentLikeStatusResponse,
): CommentLikeStatus => ({
  id: response.id,
  likeCount: response.like,
  liked: response.liked,
  dislikeCount: response.dislike,
  disliked: response.disliked,
});
