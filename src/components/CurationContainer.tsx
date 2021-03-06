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
    <Wrapper paddingTop={marginTop} paddingBottom={marginBottom} className={className}>
      <Container>{children}</Container>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ paddingTop?: string | number; paddingBottom?: string | number }>`
  width: 100%;
  padding-top: ${p => coerceCssPixelValue(p.paddingTop)};
  padding-bottom: ${p => coerceCssPixelValue(p.paddingBottom)};
`;

const Container = styled.div<{ marginTop?: string | number; marginBottom?: string | number }>`
  max-width: ${layouts.container}px;
  margin-left: auto;
  margin-right: auto;
`;
