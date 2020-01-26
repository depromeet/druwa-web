import React, { memo, useMemo } from 'react';
import { cssButtonReset, fontSizes, fontWeights, selectForegroundColor, styled } from '../styles';
import { Icon } from '../ui/icon';
import { formatKiloCount } from '../utils';

interface Props {
  type: 'like' | 'dislike';
  count: number;
  activated: boolean;
  className?: string;
  onClick?(): void;
}

const labelsByType = {
  like: '좋아요',
  dislike: '싫어요',
};

function CountButton({ type, count, className, onClick }: Props) {
  const label = useMemo(() => `${labelsByType[type]} ${count}개`, [type, count]);
  const iconName = useMemo(() => {
    // TODO: activated 처리
    switch (type) {
      case 'like':
        return 'like';
      case 'dislike':
        return 'dislike';
    }
  }, [type]);

  return (
    <Button className={className} title={labelsByType[type]} aria-label={label} onClick={onClick}>
      <Icon name={iconName} size={24} aria-hidden={true} />
      <Text>{formatKiloCount(count, 2)}</Text>
    </Button>
  );
}

export default memo(CountButton);

const Button = styled.button`
  ${cssButtonReset};
  background: transparent;
  padding: 0 8px;
  margin: 0;
  height: 36px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  & > .Icon {
    margin-right: 8px;
  }
`;

const Text = styled.span`
  font-size: ${fontSizes.regular}px;
  font-weight: ${fontWeights.medium};
  color: ${selectForegroundColor('textPrimary')};
`;
