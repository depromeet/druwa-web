import { css } from '@emotion/core';
import React from 'react';
import { UIProvider } from './core';
import { defaultDarkTheme } from './styles';
import {
  Button,
  Card,
  CardHead,
  CardHeadLeft,
  CardHeadRight,
  CardContent,
  ProfileImage,
} from './ui';

export default function App() {
  return (
    <UIProvider theme={defaultDarkTheme}>
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex' }}>
          <Button>Normal</Button>
          <Button color="primary">Primary</Button>
          <Button color="accent">Accent</Button>
          <Button color="dark">Dark</Button>
        </div>
        <div style={{ marginTop: '24px' }}>
          <Card>
            <CardHead>
              <CardHeadLeft>Left</CardHeadLeft>
              <CardHeadRight>Right</CardHeadRight>
            </CardHead>
            <CardContent
              css={css`
                display: flex;
              `}
            >
              <ProfileImage
                src="https://avatars0.githubusercontent.com/u/13250888?s=460&v=4"
                size={36}
                border="primary"
              />
              <ProfileImage
                src="https://avatars0.githubusercontent.com/u/13250888?s=460&v=4"
                size={36}
                border="accent"
              />
              <ProfileImage
                src="https://avatars0.githubusercontent.com/u/13250888?s=460&v=4"
                size={36}
              />
              <ProfileImage
                src="https://avatars0.githubusercontent.com/u/13250888?s=460&v=4"
                size={48}
                border="primary"
              />
              <ProfileImage
                src="https://avatars0.githubusercontent.com/u/13250888?s=460&v=4"
                size={48}
                border="accent"
              />
              <ProfileImage
                src="https://avatars0.githubusercontent.com/u/13250888?s=460&v=4"
                size={48}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </UIProvider>
  );
}
