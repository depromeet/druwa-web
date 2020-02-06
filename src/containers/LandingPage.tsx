import { css } from '@emotion/core';
import React from 'react';
import { animated, useSprings } from 'react-spring';
import {
  colorPlatte,
  cssButtonReset,
  fontWeights,
  lineHeights,
  selectForegroundColor,
  styled,
} from '../styles';
import MainHeader from './MainHeader';

const cssTop = css`
  position: relative;
  z-index: 1;
`;

export default function LandingPage() {
  const [titleStyle, subtitleStyle, ctaStyle] = useSprings(3, [
    {
      from: {
        opacity: 0,
        transform: 'translateY(20px)',
      },
      to: {
        opacity: 1,
        transform: 'translateY(0)',
      },
      delay: 150,
    },
    {
      from: {
        opacity: 0,
        transform: 'translateY(20px)',
      },
      to: {
        opacity: 1,
        transform: 'translateY(0)',
      },
      delay: 350,
    },
    {
      from: {
        opacity: 0,
        transform: 'translateY(20px)',
      },
      to: {
        opacity: 1,
        transform: 'translateY(0)',
      },
      delay: 500,
    },
  ]);

  return (
    <Wrapper>
      <Hero role="banner">
        <Header transparent={true} />
        <HeroContent>
          <Title style={titleStyle}>Druwa Studio</Title>
          <Subtitle style={subtitleStyle}>
            Druwa Studio는 웹드라마 시장의 생기를 불어 넣고,
            <br />
            소규모 제작사들의 다양한 작품을 세상 앞에 선보이는 플랫폼 서비스입니다.
          </Subtitle>
          <MainCTA style={ctaStyle}>드라마 보러가기</MainCTA>
          <Background />
        </HeroContent>
      </Hero>
    </Wrapper>
  );
}

const Wrapper = styled.main``;

const Hero = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled(MainHeader)`
  flex: none;
  ${cssTop};
`;

const HeroContent = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Background = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: url(/assets/images/main-hero.jpeg);
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
`;

const Title = styled(animated.h1)`
  margin: 0;
  height: 95px;
  font-size: 72px;
  font-weight: ${fontWeights.bold};
  line-height: ${lineHeights.condensed};
  letter-spacing: 2.18px;
  color: ${selectForegroundColor('textPrimary')};
  text-align: center;
  ${cssTop};
`;

const Subtitle = styled(animated.p)`
  margin-top: 14px;
  font-size: 28px;
  color: ${selectForegroundColor('textPrimary')};
  text-align: center;
  ${cssTop};
`;

const MainCTA = styled(animated.button)`
  ${cssButtonReset};
  margin: 100px 0 0 0;
  padding: 0 24px;
  background: transparent;
  border: 1px solid ${colorPlatte.white};
  height: 64px;
  font-size: 20px;
  font-weight: ${fontWeights.medium};
  color: ${selectForegroundColor('textPrimary')};
  line-height: 64px;
  ${cssTop};
`;
