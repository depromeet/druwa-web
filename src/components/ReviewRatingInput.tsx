import React, { memo, useCallback, useEffect, useState } from 'react';
import { selectForegroundColor, styled } from '../styles';
import { Icon } from '../ui/icon';

interface Props {
  text: string;
  clear?: boolean;
  className?: string;
  onChange?(rating: number): void;
}

function ReviewRatingInput({ text, clear, className, onChange }: Props) {
  const [rating, setRating] = useState<number>(0);
  const handleStarClick = useCallback(
    (rating: number) => {
      setRating(rating);
      onChange?.(rating);
    },
    [onChange],
  );

  useEffect(() => {
    if (clear === true) {
      setRating(0);
    }
  }, [clear]);

  return (
    <Wrapper className={className}>
      <Text>{text}</Text>
      <Stars>
        {new Array(5).fill(null).map((_, index) => (
          <Star
            key={index}
            name={index + 1 <= rating ? 'star-on' : 'star-none'}
            size={38}
            onClick={() => handleStarClick(index + 1)}
          />
        ))}
      </Stars>
    </Wrapper>
  );
}

export default memo(ReviewRatingInput);

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.span`
  padding: 0 16px;
  font-size: 15px;
  line-height: 1.47;
  color: ${selectForegroundColor('textSecondary')};
`;

const Stars = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 6px;
`;

const Star = styled(Icon)`
  cursor: pointer;
`;
