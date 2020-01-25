import { createContext } from 'react';

export interface ContentWithAsideContextValue {
  spacing: number;
  asideSize: number;
}

export const ContentWithAsideContext = createContext<ContentWithAsideContextValue | undefined>(
  undefined,
);

ContentWithAsideContext.displayName = 'ContentWithAsideContext';
