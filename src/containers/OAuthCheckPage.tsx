import React, { useEffect } from 'react';
import QS from 'query-string';
import { kakaoOAuthPopupName } from '../constants';
import { closeThisPopup, postMessageToOpener } from '../hooks';

export default function OAuthCheckPage() {
  useEffect(() => {
    const parsed: { token?: string } = QS.parse(location.search);

    postMessageToOpener(kakaoOAuthPopupName, parsed?.token);
    closeThisPopup(kakaoOAuthPopupName);
  }, []);

  return <></>;
}
