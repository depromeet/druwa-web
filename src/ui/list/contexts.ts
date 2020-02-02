import { createContext } from 'react';

export interface ListContextValue {
  itemSize: number;
  spacing: number;
}

export const ListContext = createContext<ListContextValue | undefined>(undefined);

ListContext.displayName = 'ListContext';
