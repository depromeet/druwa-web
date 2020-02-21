import { ReviewResponse } from '../remotes';
import { User, userFromResponse } from './user';

export type ReviewRating = 1 | 2 | 3 | 4 | 5;

export interface Review {
  id: number;
  rating: ReviewRating;
  title: string;
  body: string;
  createdAt: string;
  user: User;
}

export const reviewFromResponse = (response: ReviewResponse): Review => ({
  id: response.dramaReviewId,
  rating: Math.floor(response.point) as ReviewRating,
  title: response.title,
  body: response.contents,
  createdAt: response.createdAt,
  user: userFromResponse(response.user),
});
