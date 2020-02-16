import React, { ReactNode } from 'react';
import { layouts, styled } from '../styles';
import { coerceCssPixelValue } from '../utils';

interface Props {
  marginTop?: number | string;
  marginBottom?: number | string;
  className?: string;
  children: ReactNode;
}

export default function CurationContainer({ marginTop, marginBottom, className, children }: Props) {
  return (
    <Container marginTop={marginTop} marginBottom={marginBottom} className={className}>
      {children}
    </Container>
  );
}

const Container = styled.div<{ marginTop?: string | number; marginBottom?: string | number }>`
  max-width: ${layouts.container}px;
  margin-left: auto;
  margin-right: auto;
  margin-top: ${p => coerceCssPixelValue(p.marginTop)};
  margin-bottom: ${p => coerceCssPixelValue(p.marginBottom)};
`;
