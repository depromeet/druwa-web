import { css } from '@emotion/core';
import React, { ReactNode, useContext, useMemo } from 'react';
import { AriaTabContext } from './contexts';
import { JSXElement, WithCustomElement } from './types';

const hiddenCss = css`
  &[hidden] {
    display: none;
  }
`;

interface Props<T, Element extends JSXElement = 'div'>
  extends WithCustomElement<Element, 'id' | 'role' | 'tabIndex' | 'aria-labelledby' | 'hidden'> {
  item: T;
  /** @default false */
  disableTabIndex?: boolean;
  children?: ReactNode;
  className?: string;
}

export default function AriaTabPanel<T, Element extends JSXElement = 'div'>({
  item,
  disableTabIndex = false,
  as = 'div' as Element,
  children,
  className,
  ...props
}: Props<T, Element>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = as as any;

  const { selectedItem, tabPanelIdFn, tabIdFn } = useContext(AriaTabContext);
  const id = useMemo(() => tabPanelIdFn?.(item), [tabPanelIdFn, item]);
  const ariaLabelledby = useMemo(() => tabIdFn?.(item), [tabIdFn, item]);
  const selected = useMemo(() => selectedItem === item, [item, selectedItem]);

  return (
    <Component
      {...props}
      id={id}
      role="tabpanel"
      tabIndex={disableTabIndex ? undefined : 0}
      aria-labelledby={ariaLabelledby}
      hidden={!selected}
      className={className}
      css={hiddenCss}
    >
      {children}
    </Component>
  );
}
