import React from 'react';
import { UIProvider } from './core';
import { defaultDarkTheme } from './styles';
import { Button, Card, CardHead, CardHeadLeft, CardHeadRight, CardContent } from './ui';

export default function App() {
  return (
    <UIProvider theme={defaultDarkTheme}>
      <div style={{ padding: '24px' }}>
        <Button>Normal</Button>
        <Button color="primary">Primary</Button>
        <Button color="accent">Accent</Button>
        <Button color="dark">Dark</Button>
        <div style={{ marginTop: '24px' }}>
          <Card>
            <CardHead>
              <CardHeadLeft>Left</CardHeadLeft>
              <CardHeadRight>Right</CardHeadRight>
            </CardHead>
            <CardContent>Content</CardContent>
          </Card>
        </div>
      </div>
    </UIProvider>
  );
}
