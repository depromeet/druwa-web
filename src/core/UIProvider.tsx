import { ThemeProvider } from 'emotion-theming';
import React, { ReactNode } from 'react';
import { Theme } from '../styles';

interface Props {
  theme: Theme;
  children: ReactNode;
}

export function UIProvider({ theme, children }: Props) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
