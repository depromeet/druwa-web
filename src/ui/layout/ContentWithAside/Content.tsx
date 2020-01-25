import React, { ReactNode, useContext } from 'react';
import { ContentWithAsideContext } from './contexts';
import { Content } from './styles';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function ContentWithAsideContent({ children, className }: Props) {
  const value = useContext(ContentWithAsideContext);

  return (
    <Content spacing={value?.spacing ?? 0} asideSize={value?.asideSize ?? 0} className={className}>
      {children}
    </Content>
  );
}
