import React, { memo } from 'react';
import { fontWeights, selectForegroundColor, styled } from '../styles';
import { Icon } from '../ui/icon';

interface Props {
  rating: number;
  className?: string;
}

function Rating({ rating, className }: Props) {
  return (
    <Wrapper className={className}>
      <Stars>
        {new Array(5).fill(null).map((_, index) => (
          <Star key={index} name={index + 1 <= rating ? 'star-on' : 'star-none'} size={24} />
        ))}
      </Stars>
      <Text>{rating.toFixed(1)}</Text>
    </Wrapper>
  );
}

export default memo(Rating);

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
`;

const Stars = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 6px;
`;

const Star = styled(Icon)``;

const Text = styled.div`
  font-size: 20px;
  font-weight: ${fontWeights.medium};
  line-height: 1.1;
  color: ${selectForegroundColor('textPrimary')};
`;
