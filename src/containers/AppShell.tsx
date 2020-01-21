import React, { useCallback } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { kakaoOAuthPopupName } from '../constants';
import { UIProvider } from '../core';
import { useWindowPopup } from '../hooks';
import { oauthApiUrls } from '../remotes';
import { defaultDarkTheme } from '../styles';
import { Button } from '../ui/button';
import { FormFields, TextField } from '../ui/form';
import OAuthCheckPage from './OAuthCheckPage';

export default function AppShell() {
  const kakaoOAuthPopup = useWindowPopup(oauthApiUrls.kakao, kakaoOAuthPopupName, {
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
      <FormFields>
        <TextField type="email" placeholder="이메일" error="이메일을 다시 확인해주세요." />
        <TextField type="password" placeholder="비밀번호" />
      </FormFields>
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
