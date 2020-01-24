import React, { memo } from 'react';
import { kakaoOAuthPopupName } from '../../constants';
import { useWindowPopup } from '../../hooks';
import { oauthApiUrls } from '../../remotes';
import { styled } from '../../styles';
import { Button } from '../../ui/button';

interface Props {
  onLogin?(token: string): void;
  className?: string;
}

function OAuthLogins({ onLogin, className }: Props) {
  const kakaoOAuthPopup = useWindowPopup(oauthApiUrls.kakao, kakaoOAuthPopupName, {
    features: {
      width: 480,
      height: 699,
    },
    onClose(token) {
      if (token !== undefined) {
        onLogin?.(token);
      }
    },
  });

  return (
    <Wrapper className={className}>
      <Button onClick={() => kakaoOAuthPopup.open()}>카카오톡 로그인</Button>
    </Wrapper>
  );
}

export default memo(OAuthLogins);

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 -5px;

  & > .Button + .Button {
    margin: 0 5px;
  }
`;
