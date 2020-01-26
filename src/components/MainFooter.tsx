import React, { memo } from 'react';
import {
  cssContainerLayoutBreakpoint,
  fontSizes,
  fontWeights,
  layouts,
  selectBackgroundColor,
  selectForegroundColor,
  styled,
} from '../styles';
import Logo from './Logo';

interface Props {
  className?: string;
}

function MainFooter({ className }: Props) {
  return (
    <Footer className={className}>
      <FooterInner>
        <Left>
          <Logo size={42} />
          <Description>Belief in the Korea Web Drama</Description>
          <CopyRight>COPYRIGHT © 2020 DRUWA. All RIGHTS RESERVED.</CopyRight>
        </Left>
      </FooterInner>
    </Footer>
  );
}

export default memo(MainFooter);

const Footer = styled.footer`
  background-color: ${selectBackgroundColor('base')};
`;

const FooterInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: ${layouts.container}px;
  height: 100%;
  padding: 93px 0 104px 0;
  margin: 0 auto;

  ${cssContainerLayoutBreakpoint} {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const Left = styled.div`
  flex: 1 1 auto;
  display: block;
`;

const Description = styled.div`
  margin-top: 11px;
  font-size: 15px;
  font-weight: ${fontWeights.light};
  color: ${selectForegroundColor('textPrimary')};
`;

const CopyRight = styled.div`
  margin-top: 30px;
  font-size: ${fontSizes.regular}px;
  font-weight: ${fontWeights.regular};
  color: ${selectForegroundColor('textPrimary')};
`;
