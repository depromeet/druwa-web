import React, { memo } from 'react';
import { kakaoOAuthPopupName } from '../../constants';
import { useWindowPopup } from '../../hooks';
import { oauthApiUrls } from '../../remotes';
import { cssButtonReset, styled } from '../../styles';

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
      console.log(token);
      if (token !== undefined) {
        onLogin?.(token);
      }
    },
  });

  return (
    <Wrapper className={className}>
      <ImageButton aria-label="카카오톡 로그인" onClick={() => kakaoOAuthPopup.open()}>
        <img
          alt=""
          src="/assets/images/sns-kakao@3x.png"
          srcSet={`/assets/images/sns-kakao.png 1x, /assets/images/sns-kakao@2x.png 2x, /assets/images/sns-kakao@3x.png 3x`}
        />
      </ImageButton>
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

const ImageButton = styled.button`
  ${cssButtonReset};
  margin: 0 4px;
  padding: 0;
  width: 44px;
  height: 44px;
  background: transparent;
  display: inline-flex;
  cursor: pointer;

  > img {
    width: 100%;
    height: 100%;
  }
`;
