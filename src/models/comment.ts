import { CommentLikeStatusResponse, CommentResponse } from '../remotes';
import { User, userFromResponse } from './user';

export interface Comment {
  id: number;
  body: string;
  likeCount: number;
  liked: boolean;
  dislikeCount: number;
  disliked: boolean;
  createdAt: string;
  user: User;
  subComments: SubComment[];
}

export type SubComment = Omit<Comment, 'subComments'>;

export type CommentLikeStatus = Pick<
  Comment,
  'id' | 'likeCount' | 'liked' | 'dislikeCount' | 'disliked'
>;

export const commentsFromResponse = (response: CommentResponse[]): Comment[] => {
  const comments: Comment[] = [];
  const subComments: CommentResponse[] = [];

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
        user: userFromResponse(data.user),
      });
    } else {
      subComments.push(data);
    }
  }

  for (const subComment of subComments) {
    const comment = comments.find(x => x.id === subComment.prev);
    comment?.subComments.push({
      id: subComment.id,
      body: subComment.contents,
      likeCount: subComment.like,
      liked: subComment.liked,
      dislikeCount: subComment.dislike,
      disliked: subComment.disliked,
      createdAt: subComment.createdAt,
      user: userFromResponse(subComment.user),
    });
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
