import { css } from '@emotion/core';
import React, { memo } from 'react';
import { LikeType, Review } from '../models';
import { fontSizes, lineHeights, selectForegroundColor, styled } from '../styles';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Icon } from '../ui/icon';
import CountButton from './CountButton';
import { DramaReviewSlider } from './DramaReviewSlider';

interface Props {
  likeCount: number;
  liked: boolean;
  dislikeCount: number;
  disliked: boolean;
  productionCompanyName: string;
  episodeSummary: string;
  reviews: Review[];
  className?: string;
  onLike?(like: LikeType): void;
  onShare?(): void;
}

function DramaEpisodeSummaryCard({
  likeCount,
  liked,
  dislikeCount,
  disliked,
  productionCompanyName,
  episodeSummary,
  reviews,
  className,
  onLike,
  onShare,
}: Props) {
  return (
    <Card className={className}>
      <Card.Head>
        <Card.HeadLeft leftPadding={8}>
          <Likes>
            <CountButton
              type="like"
              count={likeCount}
              activated={liked}
              onClick={() => onLike?.('like')}
            />
            <CountButton
              type="dislike"
              count={dislikeCount}
              activated={disliked}
              onClick={() => onLike?.('dislike')}
            />
          </Likes>
        </Card.HeadLeft>
        <Card.HeadRight rightPadding={8}>
          <Button
            type="icon"
            color="transparent"
            aria-label="드라마 에피소드 공유하기"
            title="공유하기"
            size={36}
            onClick={onShare}
          >
            <Icon name="share" size={24} aria-hidden={true} />
          </Button>
        </Card.HeadRight>
      </Card.Head>
      <DramaReviewSlider reviews={reviews} />
      <Card.Content
        css={css`
          min-height: 343px;
        `}
      >
        <ProductCompanyName>{productionCompanyName}</ProductCompanyName>
        <EpisodeSummary>{episodeSummary}</EpisodeSummary>
      </Card.Content>
    </Card>
  );
}

export default memo(DramaEpisodeSummaryCard);

const ProductCompanyName = styled.div`
  font-size: ${fontSizes.medium};
  line-height: ${lineHeights.condensed};
  color: ${selectForegroundColor('textPrimary')};
`;

const EpisodeSummary = styled.p`
  margin: 15px 0 0 0;
  font-size: ${fontSizes.regular};
  line-height: ${lineHeights.normal};
  color: ${selectForegroundColor('textSecondary')};
`;

const Likes = styled.div``;
