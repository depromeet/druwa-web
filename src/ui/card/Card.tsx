import React, { ReactNode } from 'react';
import { Wrapper } from './styles';

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
