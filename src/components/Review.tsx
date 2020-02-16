/* eslint-disable import/no-duplicates */
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import koLocale from 'date-fns/locale/ko';
import React, { memo, useMemo } from 'react';
import { fontSizes, fontWeights, lineHeights, selectForegroundColor, styled } from '../styles';
import { ProfileImage } from '../ui/profile-image';
import Rating from './Rating';

interface Props {
  body: string;
  writerName: string;
  writerImageUrl: string;
  reviewRating: number;
  createdAt: string;
  className?: string;
}

function Review({ body, writerName, writerImageUrl, reviewRating, createdAt, className }: Props) {
  const distanceToNow = useMemo(
    () => formatDistanceToNow(new Date(createdAt), { addSuffix: false, locale: koLocale }),
    [createdAt],
  );

  return (
    <Wrapper className={className}>
      <WriterImage size={48} src={writerImageUrl} alt="사용자 프로필 이미지" />
      <Content>
        <Title>
          {writerName}
          <DistanceToNow>{distanceToNow}</DistanceToNow>
          <Rating rating={reviewRating} />
        </Title>
        <Body>{body}</Body>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

const WriterImage = styled(ProfileImage)`
  flex: none;
  margin-right: 12px;
`;

const Content = styled.div`
  flex: 1 1 auto;
  display: block;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: ${fontWeights.regular};
  line-height: ${lineHeights.normal};
  color: ${selectForegroundColor('textPrimary')};
`;

const DistanceToNow = styled.span`
  display: inline-block;
  margin-left: 4px;
  margin-right: 15px;
  color: ${selectForegroundColor('textSecondary')};
`;

const Body = styled.p`
  display: block;
  margin: 8px 0 0 0;
  font-size: ${fontSizes.regular}px;
  font-weight: ${fontWeights.regular};
  line-height: ${lineHeights.normal};
  color: ${selectForegroundColor('textSecondary')};
`;

export default memo(Review);
