import React, { memo, useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';
import Logo from '../components/Logo';
import { selectIsAuthorizeProcessing, selectUser } from '../stores/selectors';
import { cssContainerLayoutBreakpoint, layouts, styled } from '../styles';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { LoginDialogContext } from './LoginDialogProvider';

export const mainHeaderSize = 81;

interface Props {
  transparent?: boolean;
  className?: string;
  onLoginButtonClick?(): void;
}

function MainHeader({ transparent, className }: Props) {
  const isLoading = useSelector(selectIsAuthorizeProcessing);
  const user = useSelector(selectUser);

  const loginDialog = useContext(LoginDialogContext);
  const handleLoginButtonClick = useCallback(() => {
    loginDialog?.open();
  }, [loginDialog]);

  return (
    <Header transparent={transparent} className={className}>
      <HeaderInner>
        <Logo />
        <Toolbar>
          {Boolean(isLoading) ? null : (
            <ul>
              <li>
                <Button type="icon" size={36} aria-label="통합검색" color="transparent">
                  <Icon name="search" aria-hidden={true} />
                </Button>
              </li>
              <li>
                {user === null ? (
                  <Button rounded={true} size={36} color="primary" onClick={handleLoginButtonClick}>
                    로그인
                  </Button>
                ) : (
                  <Button type="icon" size={36} aria-label="마이페이지" color="transparent">
                    <Icon name="user" aria-hidden={true} />
                  </Button>
                )}
              </li>
            </ul>
          )}
        </Toolbar>
      </HeaderInner>
    </Header>
  );
}

export default memo(MainHeader);

const Header = styled.header<{ transparent?: boolean }>`
  height: ${mainHeaderSize}px;
  border-bottom: 1px solid ${p => (p.transparent ? 'transparent' : p.theme.background.border)};
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
