import { subHours, subMinutes } from 'date-fns';
import React from 'react';
import { selectBackgroundColor, styled } from '../../styles';
import { Slider } from '../../ui/slider';
import ReviewCard from './DramaReviewCard';

export default function DramaReviewSlider() {
  return (
    <Wrapper>
      <Slider itemSize={283} spacing={16}>
        <Slider.Item>
          <ReviewCard
            title="1. 서강준 미친 외모에 한번 놀라고, 스토리에 한번놀라고. 서강준 미친 외모에 한번 놀라고, 스토리에 한번놀라고"
            body="서강준 하드캐리 원맨쇼를 원한다면 강츄!"
            rating={4.5}
            reviewerImageUrl="https://avatars0.githubusercontent.com/u/13250888?s=460&v=4"
            reviewerName="나석주"
            createdAt={subMinutes(new Date(), 5).toString()}
          />
        </Slider.Item>
        <Slider.Item>
          <ReviewCard
            title="2. 서강준 미친 외모에 한번 놀라고, 스토리에 한번놀라고"
            body="서강준 하드캐리 원맨쇼를 원한다면 강츄!"
            rating={4.5}
            reviewerImageUrl="https://avatars0.githubusercontent.com/u/13250888?s=460&v=4"
            reviewerName="나석주"
            createdAt={subHours(new Date(), 2).toString()}
          />
        </Slider.Item>
        <Slider.Item>
          <ReviewCard
            title="3. 서강준 미친 외모에 한번 놀라고, 스토리에 한번놀라고"
            body="서강준 하드캐리 원맨쇼를 원한다면 강츄!"
            rating={4.5}
            reviewerImageUrl="https://avatars0.githubusercontent.com/u/13250888?s=460&v=4"
            reviewerName="나석주"
            createdAt={new Date().toString()}
          />
        </Slider.Item>
        <Slider.Item>
          <ReviewCard
            title="4. 서강준 미친 외모에 한번 놀라고, 스토리에 한번놀라고"
            body="서강준 하드캐리 원맨쇼를 원한다면 강츄!"
            rating={4.5}
            reviewerImageUrl="https://avatars0.githubusercontent.com/u/13250888?s=460&v=4"
            reviewerName="나석주"
            createdAt={new Date().toString()}
          />
        </Slider.Item>
        <Slider.Item>
          <ReviewCard
            title="5. 서강준 미친 외모에 한번 놀라고, 스토리에 한번놀라고"
            body="서강준 하드캐리 원맨쇼를 원한다면 강츄!"
            rating={4.5}
            reviewerImageUrl="https://avatars0.githubusercontent.com/u/13250888?s=460&v=4"
            reviewerName="나석주"
            createdAt={new Date().toString()}
          />
        </Slider.Item>
        <Slider.Item>
          <ReviewCard
            title="6. 서강준 미친 외모에 한번 놀라고, 스토리에 한번놀라고"
            body="서강준 하드캐리 원맨쇼를 원한다면 강츄!"
            rating={4.5}
            reviewerImageUrl="https://avatars0.githubusercontent.com/u/13250888?s=460&v=4"
            reviewerName="나석주"
            createdAt={new Date().toString()}
          />
        </Slider.Item>
      </Slider>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${selectBackgroundColor('base')};
  padding: 16px 0;
`;
