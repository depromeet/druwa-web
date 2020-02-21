import React, { memo } from 'react';
import { Review } from '../../models';
import { selectBackgroundColor, styled } from '../../styles';
import { Slider } from '../../ui/slider';
import DramaReviewSliderItem from './DramaReviewSliderItem';

interface Props {
  reviews: Review[];
  className?: string;
}

function DramaReviewSlider({ reviews, className }: Props) {
  return (
    <Wrapper className={className}>
      <Slider itemSize={283} spacing={16}>
        {reviews.map(review => (
          <Slider.Item key={review.id}>
            <DramaReviewSliderItem
              title={review.title}
              body={review.body}
              rating={review.rating}
              reviewerImageUrl={review.user.imageUrl ?? '/assets/icon/icon-user.svg'}
              reviewerName={review.user.name}
              createdAt={review.createdAt}
            />
          </Slider.Item>
        ))}
      </Slider>
    </Wrapper>
  );
}

export default memo(DramaReviewSlider);

const Wrapper = styled.div`
  background-color: ${selectBackgroundColor('base')};
  padding: 16px 0;
`;
