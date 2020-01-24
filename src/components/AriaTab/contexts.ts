import { createContext } from 'react';

const noop = () => {};

type IdFactory<T> = (item: T) => string;

export interface AriaTabContextValue<T> {
  items: T[];
  selectedItem: T | null;
  tabIdFn?: IdFactory<T>;
  tabPanelIdFn?: IdFactory<T>;
  onSelectItem: (item: T) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AriaTabContext = createContext<AriaTabContextValue<any>>({
  items: [],
  selectedItem: null,
  onSelectItem: noop,
});

AriaTabContext.displayName = 'AriaTabContext';
