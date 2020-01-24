import React, { ReactNode, useContext, useMemo } from 'react';
import { AriaTabContext } from './contexts';
import { JSXElement, WithCustomElement } from './types';

interface BaseProps<T> {
  item: T;
  /** @default false */
  disableTabIndex?: boolean;
  children?: ReactNode;
  className?: string;
}

type Props<T, Element extends JSXElement = 'div'> = BaseProps<T> &
  WithCustomElement<
    Element,
    'id' | 'role' | 'aria-selected' | 'tabIndex' | 'aria-controls' | 'onClick'
  >;

export default function AriaTabListItem<T, Element extends JSXElement = 'div'>({
  item,
  as = 'div' as Element,
  disableTabIndex = false,
  children,
  className,
  ...props
}: Props<T, Element>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = as as any;

  const { selectedItem, tabIdFn, tabPanelIdFn, onSelectItem } = useContext(AriaTabContext);
  const id = useMemo(() => tabIdFn?.(item), [tabIdFn, item]);
  const ariaControls = useMemo(() => tabPanelIdFn?.(item), [tabPanelIdFn, item]);
  const selected = useMemo(() => selectedItem === item, [item, selectedItem]);

  return (
    <Component
      {...props}
      id={id}
      role="tab"
      tabIndex={disableTabIndex ? undefined : selected ? 0 : -1}
      aria-selected={selected}
      aria-controls={ariaControls}
      onClick={() => onSelectItem(item)}
      className={className}
    >
      {children}
    </Component>
  );
}
