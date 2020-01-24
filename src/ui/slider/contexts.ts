import { createContext } from 'react';

export interface SliderContextValue {
  itemSize: number;
  page: number;
  spacing: number;
}

export const SliderContext = createContext<SliderContextValue | undefined>(undefined);

SliderContext.displayName = 'SliderContext';
