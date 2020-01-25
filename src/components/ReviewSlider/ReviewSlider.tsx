import { css } from '@emotion/core';
import { subHours, subMinutes } from 'date-fns';
import React from 'react';
import { Slider } from '../../ui/slider';
import ReviewCard from './ReviewCard';

export default function ReviewSlider() {
  return (
    <Slider
      itemSize={300}
      spacing={16}
      css={css`
        padding: 16px 0;
      `}
    >
      <Slider.Item>
        <ReviewCard
          title="서강준 미친 외모에 한번 놀라고, 스토리에 한번놀라고. 서강준 미친 외모에 한번 놀라고, 스토리에 한번놀라고"
          body="서강준 하드캐리 원맨쇼를 원한다면 강츄!"
          rating={4.5}
          reviewerImageUrl="https://avatars0.githubusercontent.com/u/13250888?s=460&v=4"
          reviewerName="나석주"
          createdAt={subMinutes(new Date(), 5).toString()}
        />
      </Slider.Item>
      <Slider.Item>
        <ReviewCard
          title="서강준 미친 외모에 한번 놀라고, 스토리에 한번놀라고"
          body="서강준 하드캐리 원맨쇼를 원한다면 강츄!"
          rating={4.5}
          reviewerImageUrl="https://avatars0.githubusercontent.com/u/13250888?s=460&v=4"
          reviewerName="나석주"
          createdAt={subHours(new Date(), 2).toString()}
        />
      </Slider.Item>
      <Slider.Item>
        <ReviewCard
          title="서강준 미친 외모에 한번 놀라고, 스토리에 한번놀라고"
          body="서강준 하드캐리 원맨쇼를 원한다면 강츄!"
          rating={4.5}
          reviewerImageUrl="https://avatars0.githubusercontent.com/u/13250888?s=460&v=4"
          reviewerName="나석주"
          createdAt={new Date().toString()}
        />
      </Slider.Item>
      <Slider.Item>
        <ReviewCard
          title="서강준 미친 외모에 한번 놀라고, 스토리에 한번놀라고"
          body="서강준 하드캐리 원맨쇼를 원한다면 강츄!"
          rating={4.5}
          reviewerImageUrl="https://avatars0.githubusercontent.com/u/13250888?s=460&v=4"
          reviewerName="나석주"
          createdAt={new Date().toString()}
        />
      </Slider.Item>
      <Slider.Item>
        <ReviewCard
          title="서강준 미친 외모에 한번 놀라고, 스토리에 한번놀라고"
          body="서강준 하드캐리 원맨쇼를 원한다면 강츄!"
          rating={4.5}
          reviewerImageUrl="https://avatars0.githubusercontent.com/u/13250888?s=460&v=4"
          reviewerName="나석주"
          createdAt={new Date().toString()}
        />
      </Slider.Item>
      <Slider.Item>
        <ReviewCard
          title="서강준 미친 외모에 한번 놀라고, 스토리에 한번놀라고"
          body="서강준 하드캐리 원맨쇼를 원한다면 강츄!"
          rating={4.5}
          reviewerImageUrl="https://avatars0.githubusercontent.com/u/13250888?s=460&v=4"
          reviewerName="나석주"
          createdAt={new Date().toString()}
        />
      </Slider.Item>
    </Slider>
  );
}
