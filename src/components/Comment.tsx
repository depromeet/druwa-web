/* eslint-disable import/no-duplicates */
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import koLocale from 'date-fns/locale/ko';
import React, { memo, useMemo } from 'react';
import { LikeType } from '../models';
import { fontSizes, fontWeights, lineHeights, selectForegroundColor, styled } from '../styles';
import { Button } from '../ui/button';
import { ProfileImage } from '../ui/profile-image';
import { formatKiloCount } from '../utils';
import LikeButton from './LikeButton';

interface Props {
  body: string;
  writerName: string;
  writerImageUrl: string;
  createdAt: string;
  likeCount: number;
  dislikeCount: number;
  didUserLike?: LikeType;
  className?: string;
  subCommentButtonText?: string;

  onSubCommentButtonClick?(): void;
  onLikeChange?(like: LikeType): void;
}

function Comment({
  body,
  writerName,
  writerImageUrl,
  createdAt,
  likeCount,
  dislikeCount,
  didUserLike,
  subCommentButtonText,
  className,
  onSubCommentButtonClick,
  onLikeChange,
}: Props) {
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
        </Title>
        <Body>{body}</Body>
        <Tools>
          <div>
            <LikeButtonWithCount>
              <LikeButton
                type="like"
                activated={didUserLike === 'like'}
                onClick={() => onLikeChange?.('like')}
              />
              {likeCount > 0 ? <Count>{formatKiloCount(likeCount)}</Count> : null}
            </LikeButtonWithCount>
            <LikeButtonWithCount>
              <LikeButton
                type="dislike"
                activated={didUserLike === 'dislike'}
                onClick={() => onLikeChange?.('dislike')}
              />
              {dislikeCount > 0 ? <Count>{formatKiloCount(dislikeCount)}</Count> : null}
            </LikeButtonWithCount>
          </div>
          {subCommentButtonText != null ? (
            <Button size={28} rounded={true} onClick={onSubCommentButtonClick}>
              {subCommentButtonText}
            </Button>
          ) : null}
        </Tools>
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

const Tools = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LikeButtonWithCount = styled.div`
  display: inline-flex;
  align-items: center;
  margin-right: 12px;
`;

const Count = styled.span`
  display: inline-block;
  margin-left: 10px;
  font-size: 15px;
  font-weight: ${fontWeights.medium};
  color: ${selectForegroundColor('textPrimary')};
`;

export default memo(Comment);
