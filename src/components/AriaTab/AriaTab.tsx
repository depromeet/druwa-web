import React, { ReactNode } from 'react';
import AriaTabList from './AriaTabList';
import AriaTabListItem from './AriaTabListItem';
import AriaTabPanel from './AriaTabPanel';
import { AriaTabContext, AriaTabContextValue } from './contexts';

interface Props<T> extends AriaTabContextValue<T> {
  children?: ReactNode;
}

export default function AriaTab<T>({ children, ...contextValue }: Props<T>) {
  return <AriaTabContext.Provider value={contextValue}>{children}</AriaTabContext.Provider>;
}

AriaTab.List = AriaTabList;
AriaTab.Item = AriaTabListItem;
AriaTab.Panel = AriaTabPanel;
