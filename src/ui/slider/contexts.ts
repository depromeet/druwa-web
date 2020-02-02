import { createContext } from 'react';

export interface SliderContextValue {
  itemSize: number;
  spacing: number;
  threshold: number;
}

export const SliderContext = createContext<SliderContextValue | undefined>(undefined);

SliderContext.displayName = 'SliderContext';
