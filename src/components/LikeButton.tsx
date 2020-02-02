import React, { memo, useMemo } from 'react';
import { LikeType } from '../models';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';

interface Props {
  type: LikeType;
  activated: boolean;
  className?: string;
  onClick?(): void;
}

const labelsByType = {
  like: '좋아요',
  dislike: '싫어요',
};

function LikeButton({ type, activated, className, onClick }: Props) {
  const iconName = useMemo(() => {
    switch (type) {
      case 'like':
        return activated ? 'like' : 'like-black';
      case 'dislike':
        return activated ? 'dislike' : 'dislike-black';
    }
  }, [activated, type]);

  return (
    <Button
      type="icon"
      color={activated ? 'accent' : 'white'}
      className={className}
      title={labelsByType[type]}
      size={28}
      aria-label={labelsByType[type]}
      onClick={onClick}
    >
      <Icon name={iconName} size={16} aria-hidden={true} />
    </Button>
  );
}

export default memo(LikeButton);
