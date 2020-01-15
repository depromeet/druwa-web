import React, { ReactNode } from 'react';
import { HeadItem } from './styles';

interface Props {
  /** @default 16 */
  rightPadding?: string | number;
  className?: string;
  children?: ReactNode;
}

export function CardHeadRight({ rightPadding = 16, children, className }: Props) {
  return (
    <HeadItem paddingRight={rightPadding} className={className}>
      {children}
    </HeadItem>
  );
}
