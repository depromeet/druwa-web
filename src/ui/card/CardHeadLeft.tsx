import React, { ReactNode } from 'react';
import { HeadItem } from './styles';

interface Props {
  /** @default 16 */
  leftPadding?: string | number;
  className?: string;
  children?: ReactNode;
}

export function CardHeadLeft({ leftPadding = 16, children, className }: Props) {
  return (
    <HeadItem paddingLeft={leftPadding} className={className}>
      {children}
    </HeadItem>
  );
}
