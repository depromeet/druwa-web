import React, { memo } from 'react';
import { User } from '../models';
import { cssContainerLayoutBreakpoint, layouts, selectBackgroundColor, styled } from '../styles';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import Logo from './Logo';

export const mainHeaderSize = 81;

interface Props {
  login?: User;
  className?: string;

  onLoginButtonClick?(): void;
}

function MainHeader({ login, className, onLoginButtonClick }: Props) {
  return (
    <Header className={className}>
      <HeaderInner>
        <Logo />
        <Toolbar>
          <ul>
            <li>
              <Button type="icon" size={36} aria-label="알림">
                <Icon name="alarm" aria-hidden={true} />
              </Button>
            </li>
            <li>
              <Button type="icon" size={36} aria-label="통합검색">
                <Icon name="search" aria-hidden={true} />
              </Button>
            </li>
            <li>
              {login === undefined ? (
                <Button rounded={true} size={36} color="primary" onClick={onLoginButtonClick}>
                  로그인
                </Button>
              ) : (
                <>TODO</>
              )}
            </li>
          </ul>
        </Toolbar>
      </HeaderInner>
    </Header>
  );
}

export default memo(MainHeader);

const Header = styled.header`
  height: ${mainHeaderSize}px;
  border-bottom: 1px solid ${selectBackgroundColor('border')};
`;

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: ${layouts.container}px;
  height: 100%;
  margin: 0 auto;

  ${cssContainerLayoutBreakpoint} {
    padding: 0 20px;
  }
`;

const Toolbar = styled.nav`
  display: inline-flex;
  align-items: center;

  & > ul {
    margin: 0 -6px;
    padding: 0;
    list-style: none;
    display: inline-flex;

    & > li {
      margin: 0 6px;
    }
  }
`;
