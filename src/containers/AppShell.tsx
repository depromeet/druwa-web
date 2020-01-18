import React, { useCallback } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { kakaoOAuthPopupName } from '../constants';
import { UIProvider } from '../core';
import { publicUrl } from '../environment';
import { useWindowPopup } from '../hooks';
import { defaultDarkTheme } from '../styles';
import { Button } from '../ui/button';
import OAuthCheckPage from './OAuthCheckPage';

export default function AppShell() {
  // TODO: Api 정상작동하면 Url 변경 필요
  const kakaoOAuthPopup = useWindowPopup(`${publicUrl}/oauth/check`, kakaoOAuthPopupName, {
    onClose(token) {
      console.log(token);
      alert(token); // TODO: 토큰값 받아서 처리 필요
    },
    features: {
      width: 480,
      height: 699,
    },
  });

  const openKakaoOAuthPopup = useCallback(() => {
    kakaoOAuthPopup.open({ behaviorIfAlreadyOpened: 'focus' });
  }, [kakaoOAuthPopup]);

  return (
    <UIProvider theme={defaultDarkTheme}>
      <Button onClick={openKakaoOAuthPopup}>카카오톡 로그인</Button>
      <Router>
        <Switch>
          <Route path="/oauth/check">
            <OAuthCheckPage />
          </Route>
        </Switch>
      </Router>
    </UIProvider>
  );
}
