import { css } from '@emotion/core';
import React, { memo } from 'react';
import { fontSizes, lineHeights, selectForegroundColor, styled } from '../styles';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Icon } from '../ui/icon';
import CountButton from './CountButton';
import { DramaReviewSlider } from './DramaReviewSlider';

interface Props {
  likeCount: number;
  dislikeCount: number;
  productionCompanyName: string;
  episodeSummary: string;
  className?: string;
  onShare?(): void;
}

function DramaEpisodeSummaryCard({
  productionCompanyName,
  episodeSummary,
  className,
  onShare,
}: Props) {
  return (
    <Card className={className}>
      <Card.Head>
        <Card.HeadLeft leftPadding={8}>
          <Likes>
            <CountButton type="like" count={1670} activated={true} />
            <CountButton type="dislike" count={183} activated={false} />
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
      <DramaReviewSlider />
      <Card.Content
        css={css`
          min-height: 343px;
        `}
      >
        <ProductCompanyName>{productionCompanyName}</ProductCompanyName>
        <EpisodeSummary>{episodeSummary}</EpisodeSummary>
        <Button
          color="primary"
          size={36}
          css={css`
            margin-top: 17px;
          `}
        >
          제작사 드라마 모아보기
        </Button>
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
