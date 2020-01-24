import QS from 'query-string';
import React, { useEffect } from 'react';
import { kakaoOAuthPopupName } from '../constants';
import { appBridge } from '../core';
import { closeThisPopup, postMessageToOpener } from '../hooks';

export default function OAuthCheckPage() {
  useEffect(() => {
    const parsed: { token?: string } = QS.parse(location.search);
    const token = parsed?.token;

    if (token === undefined) {
      alert('카카오톡 로그인에 실패하였습니다.');
      closeThisPopup(kakaoOAuthPopupName);
      return;
    }

    // 앱으로 인증 토큰을 전달합니다.
    appBridge.postMessage({
      name: 'oauthToken',
      token: token ?? null,
    });

    // 부모 웹페이지에 인증 토큰을 전달합니다.
    postMessageToOpener(kakaoOAuthPopupName, token);
    closeThisPopup(kakaoOAuthPopupName);
  }, []);

  return <></>;
}
