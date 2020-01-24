import React, { ReactNode } from 'react';
import { JSXElement, WithCustomElement } from './types';

interface Props<Element extends JSXElement = 'div'> extends WithCustomElement<Element, 'role'> {
  children?: ReactNode;
  className?: string;
}

export default function AriaTabList<Element extends JSXElement = 'div'>({
  as = 'div' as Element,
  children,
  className,
  ...props
}: Props<Element>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = as as any;

  return (
    <Component {...props} role="tablist" className={className}>
      {children}
    </Component>
  );
}
