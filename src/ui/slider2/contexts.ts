import { createContext } from 'react';

export interface Slider2ContextValue {
  itemSize: string;
  spacing: number;
}

export const Slider2Context = createContext<Slider2ContextValue | undefined>(undefined);

Slider2Context.displayName = 'SliderContext2';
