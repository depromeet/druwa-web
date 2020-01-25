import React, { ReactNode } from 'react';
import ContentWithAsideAside from './Aside';
import ContentWithAsideContent from './Content';
import { ContentWithAsideContext } from './contexts';
import { Container, Wrapper } from './styles';

interface Props {
  /** @default 8 */
  spacing?: number;
  asideSize: number;
  children: ReactNode;
  className?: string;
}

export default function ContentWithAside({ spacing = 8, asideSize, children, className }: Props) {
  return (
    <ContentWithAsideContext.Provider
      value={{
        spacing,
        asideSize,
      }}
    >
      <Wrapper spacing={spacing} className={className}>
        <Container asideSize={asideSize} spacing={spacing}>
          {children}
        </Container>
      </Wrapper>
    </ContentWithAsideContext.Provider>
  );
}

ContentWithAside.Content = ContentWithAsideContent;
ContentWithAside.Aside = ContentWithAsideAside;
