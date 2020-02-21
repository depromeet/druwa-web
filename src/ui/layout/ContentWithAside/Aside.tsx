import React, { ReactNode, useContext } from 'react';
import { ContentWithAsideContext } from './contexts';
import { Aside } from './styles';

interface Props {
  children?: ReactNode;
  className?: string;
}

export default function ContentWithAsideAside({ children, className }: Props) {
  const value = useContext(ContentWithAsideContext);

  return (
    <Aside spacing={value?.spacing ?? 0} asideSize={value?.asideSize ?? 0} className={className}>
      {children}
    </Aside>
  );
}
