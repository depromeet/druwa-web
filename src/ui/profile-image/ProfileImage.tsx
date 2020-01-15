import classNames from 'classnames';
import React, { memo } from 'react';
import { CircleImage, CircleImageWrapper } from './styles';
import { BorderColor } from './types';

interface Props {
  src: string;
  alt?: string;
  size: string | number;
  border?: BorderColor;
  className?: string;
}

export const ProfileImage = memo<Props>(({ src, alt = '', size, border, className }) => {
  return (
    <CircleImageWrapper
      size={size}
      className={classNames(
        'CircleImage',
        {
          [`CircleImage--border-${border}`]: border !== undefined,
        },
        className,
      )}
    >
      <CircleImage src={src} alt={alt} size={border !== undefined ? '100%' : size} />
    </CircleImageWrapper>
  );
});
