/* eslint-disable import/no-duplicates */
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import koLocale from 'date-fns/locale/ko';
import React, { memo, useMemo } from 'react';
import {
  cssTextEllipsis,
  fontSizes,
  fontWeights,
  lineHeights,
  selectBackgroundColor,
  selectForegroundColor,
  styled,
} from '../../styles';
import { ProfileImage } from '../../ui/profile-image';

interface Props {
  title: string;
  body: string;
  rating: number;
  reviewerImageUrl: string;
  reviewerName: string;
  createdAt: string;
  className?: string;
}

function DramaReviewSliderItem({
  title,
  body,
  reviewerImageUrl,
  rating,
  reviewerName,
  createdAt,
  className,
}: Props) {
  const distanceToNow = useMemo(
    () => formatDistanceToNow(new Date(createdAt), { addSuffix: false, locale: koLocale }),
    [createdAt],
  );

  return (
    <Wrapper className={className}>
      <ReviewerProfileImage
        src={reviewerImageUrl}
        size={36}
        alt={`${reviewerName} 프로필 이미지`}
        border="primary"
      />
      <Card>
        <Content>
          <Title>{title}</Title>
          <Body>{body}</Body>
        </Content>
        <Bottom>
          <BottomLeft>
            <Metadata highlight={true} marginRight={8}>
              {rating}
            </Metadata>
            <Metadata highlight={true}>{reviewerName}</Metadata>
          </BottomLeft>
          <Metadata>{distanceToNow}</Metadata>
        </Bottom>
      </Card>
    </Wrapper>
  );
}

export default memo(DramaReviewSliderItem);

const Wrapper = styled.div`
  padding-left: 18px;
  position: relative;
  height: 136px;
`;

const ReviewerProfileImage = styled(ProfileImage)`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
`;

const Card = styled.div`
  display: block;
  padding: 24px 24px 24px 30px;
  border-radius: 8px;
  background-color: ${selectBackgroundColor('card')};
  width: 100%;
  height: 100%;
  white-space: normal;
`;

const Content = styled.div`
  min-height: 64px;
`;

const Title = styled.p`
  margin: 0;
  padding: 0;
  font-size: ${fontSizes.regular}px;
  font-weight: ${fontWeights.regular};
  line-height: ${lineHeights.normal};
  color: ${selectForegroundColor('textPrimary')};

  display: flex;
  text-overflow: ellipsis;
  max-height: ${fontSizes.regular * lineHeights.normal * 2}px;
  overflow: hidden;
  //noinspection CssUnknownProperty
  -webkit-line-clamp: 2;
  word-break: break-word;
`;

const Body = styled.p`
  ${cssTextEllipsis};
  margin: 4px 0 0 0;
  padding: 0;
  font-size: ${fontSizes.regular}px;
  font-weight: ${fontWeights.regular};
  line-height: ${lineHeights.normal};
  color: ${selectForegroundColor('textSecondary')};
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`;

const BottomLeft = styled.div`
  display: inline-flex;
  align-items: center;
`;

const Metadata = styled.span<{ highlight?: boolean; marginRight?: number }>`
  display: inline-block;

  font-size: ${fontSizes.small}px;
  font-weight: ${fontWeights.regular};
  color: ${p => (p.highlight ? p.theme.foreground.textPrimary : p.theme.foreground.textDisabled)};
  line-height: 1.33;
  ${p => (p.marginRight !== undefined ? `margin-right: ${p.marginRight}px` : '')};
`;
