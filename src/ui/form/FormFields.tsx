import React, { ReactNode } from 'react';
import { styled } from '../../styles';

interface Props {
  children: ReactNode;
  className?: string;
}

export function FormFields({ className, children }: Props) {
  return <Box className={className}>{children}</Box>;
}

const Box = styled.div`
  & > .FormField + .FormField {
    margin-top: 10px;
  }
`;
