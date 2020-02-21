import { css } from '@emotion/core';
import React, { memo, useCallback, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Review from '../components/Review';
import ReviewRatingInput from '../components/ReviewRatingInput';
import TextWriter from '../components/TextWriter';
import { createDramaReview } from '../remotes';
import { fetchDramaReviewsActions } from '../stores/actions';
import { selectAuthToken, selectDramaReviews, selectUser } from '../stores/selectors';
import { selectForegroundColor, styled } from '../styles';
import { LoginDialogContext } from './LoginDialogProvider';

interface Props {
  dramaId: number;
}

function DramaEpisodeReviewSection({ dramaId }: Props) {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const token = useSelector(selectAuthToken);
  const reviews = useSelector(selectDramaReviews);
  const loginDialog = useContext(LoginDialogContext);

  const [rating, setRating] = useState<number | null>(null);
  const [clearRating, setClearRating] = useState(false);
  const handleReviewSubmit = useCallback(
    async (text: string) => {
      if (token == null || rating == null) {
        return;
      }

      setClearRating(false);

      const lines = text.split('\n');

      try {
        await createDramaReview(
          dramaId,
          {
            point: rating,
            title: lines[0],
            contents: lines.slice(1).join('\n'),
          },
          token,
        ).toPromise();
        alert('리뷰가 등록되었습니다.');
      } catch {
        alert('리뷰 등록에 실패하였습니다!');
      } finally {
        setClearRating(true);
        dispatch(fetchDramaReviewsActions.request({ dramaId }));
      }
    },
    [dispatch, token, rating, dramaId],
  );

  return (
    <Wrapper>
      <ReviewRatingInput
        text="재밌으셨나요? 별점을 선택해주세요!"
        clear={clearRating}
        onChange={setRating}
      />
      <TextWriter
        maxLength={1000}
        disabled={user === null}
        disabledText="리뷰를"
        placeholder="리뷰를 작성하세요"
        formDisabled={rating == null}
        onLogin={() => loginDialog?.open()}
        onSubmit={handleReviewSubmit}
        css={css`
          margin-top: 24px;
        `}
      />
      {reviews.length === 0 ? (
        <Empty>등록된 리뷰가 없습니다.</Empty>
      ) : (
        <ReviewList>
          {reviews.map(review => (
            <ReviewItem
              key={review.id}
              writerName={review.user.name}
              writerImageUrl={review.user.imageUrl ?? '/assets/icon/icon-user.svg'}
              body={`${review.title}\n${review.body}`}
              reviewRating={review.rating}
              createdAt={review.createdAt}
            />
          ))}
        </ReviewList>
      )}
    </Wrapper>
  );
}

export default memo(DramaEpisodeReviewSection);

const Wrapper = styled.div``;

const ReviewList = styled.div`
  padding: 30px 0 10px 0;
`;

const ReviewItem = styled(Review)`
  margin-bottom: 20px;
`;

const Empty = styled.p`
  margin: 0;
  padding: 70px 0;
  text-align: center;
  font-size: 18px;
  line-height: 1.22;
  color: ${selectForegroundColor('textSecondary')};
`;
