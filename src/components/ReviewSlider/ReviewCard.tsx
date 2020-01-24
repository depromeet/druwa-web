import React, { memo } from 'react';
import { selectBackgroundColor, styled } from '../../styles';
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

function ReviewCard({ reviewerImageUrl, reviewerName, className }: Props) {
  return (
    <Wrapper className={className}>
      <ReviewerProfileImage
        src={reviewerImageUrl}
        size={36}
        alt={`${reviewerName} 프로필 이미지`}
        border="primary"
      />
      <Card>123</Card>
    </Wrapper>
  );
}

export default memo(ReviewCard);

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
  border-radius: 8px;
  background-color: ${selectBackgroundColor('card')};
  width: 100%;
  height: 100%;
`;
