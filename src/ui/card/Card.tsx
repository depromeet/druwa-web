import React, { ReactNode } from 'react';
import { CardHead } from './CardHead';
import { CardHeadLeft } from './CardHeadLeft';
import { CardHeadRight } from './CardHeadRight';
import { Wrapper } from './styles';
import { CardContent } from './CardContent';

interface Props {
  role?: string;
  className?: string;
  children?: ReactNode;
}

export function Card({ role, className, children }: Props) {
  return (
    <Wrapper role={role} className={className}>
      {children}
    </Wrapper>
  );
}

Card.Content = CardContent;
Card.Head = CardHead;
Card.HeadLeft = CardHeadLeft;
Card.HeadRight = CardHeadRight;
