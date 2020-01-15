import React from 'react';
import { UIProvider } from './core';
import { defaultDarkTheme } from './styles';
import { Button } from './ui';

export default function App() {
  return (
    <UIProvider theme={defaultDarkTheme}>
      <Button>Normal</Button>
      <Button color="primary">Primary</Button>
      <Button color="accent">Accent</Button>
      <Button color="dark">Dark</Button>
    </UIProvider>
  );
}
