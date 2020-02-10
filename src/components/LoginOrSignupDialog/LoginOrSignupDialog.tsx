import React, { memo, useEffect, useState } from 'react';
import { cssButtonReset, fontWeights, styled } from '../../styles';
import { AriaTab } from '../../ui/aria-tab';
import { Dialog } from '../../ui/dialog';
import Spacing from '../Spacing';
import LoginForm, { LoginFormData, LoginFormError } from './LoginForm';
import OAuthLogins from './OAuthLogins';
import SignupForm, { SignupFormData, SignupFormError } from './SignupForm';

interface Props {
  open: boolean;
  /** @default true */
  closeOnDimmerClick?: boolean;
  loginProcessing?: boolean;
  loginFormError?: LoginFormError;
  signupProcessing?: boolean;
  signupFormError?: SignupFormError;
  className?: string;

  onLoginWithToken?(token: string): void;
  onLogin?(data: LoginFormData): void;
  onSignup?(data: SignupFormData): void;
  onClose?(): void;
}

const tabItems = [
  {
    key: 'login',
    name: 'Login',
  },
  {
    key: 'signup',
    name: 'Signup',
  },
];

function LoginOrSignupDialog({
  open,
  closeOnDimmerClick,
  loginProcessing,
  loginFormError,
  signupProcessing,
  signupFormError,
  onLoginWithToken,
  onLogin,
  onSignup,
  onClose,
  className,
}: Props) {
  const [selectedTab, setSelectedTab] = useState(tabItems[0]);

  useEffect(() => {
    if (open) {
      setSelectedTab(tabItems[0]);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      closeOnDimmerClick={closeOnDimmerClick}
      onClose={onClose}
      className={className}
    >
      <Content>
        <AriaTab
          items={tabItems}
          selectedItem={selectedTab}
          onSelectItem={setSelectedTab}
          tabIdFn={tab => `login-or-signup-dialog-tab-${tab.key}`}
          tabPanelIdFn={tab => `login-or-signup-dialog-tabpanel-${tab.key}`}
        >
          <TabList>
            {tabItems.map(tab => (
              <TabItem key={tab.key} item={tab} as="button" selected={selectedTab.key === tab.key}>
                {tab.name}
              </TabItem>
            ))}
          </TabList>
          <TabPanel item={tabItems[0]}>
            <Spacing size={30} />
            <LoginForm
              loading={loginProcessing}
              error={loginFormError}
              clearValue={open}
              onSubmit={onLogin}
            />
            <Spacing size={48} />
            <OAuthLogins onLogin={onLoginWithToken} />
          </TabPanel>
          <TabPanel item={tabItems[1]}>
            <Spacing size={30} />
            <SignupForm
              loading={signupProcessing}
              error={signupFormError}
              clearValue={open}
              onSubmit={onSignup}
            />
          </TabPanel>
        </AriaTab>
      </Content>
    </Dialog>
  );
}

export default memo(LoginOrSignupDialog);

const Content = styled.div`
  padding: 80px 67px 70px 67px;
  width: 540px;
  height: 614px;
`;

const TabItem = styled(AriaTab.Item)<{ selected: boolean }>`
  ${cssButtonReset};
  position: relative;
  background: transparent;
  border: none;
  outline: 0;
  margin: 0;
  padding: 0;
  font-size: 42px;
  font-weight: ${fontWeights.medium};
  line-height: 56px;
  color: ${p => (p.selected ? p.theme.foreground.textPrimary : '#565656')};
`;

const TabList = styled(AriaTab.List)`
  & > button + button {
    margin-left: 50px;

    &::after {
      position: absolute;
      width: 2px;
      height: 22px;
      background-color: #cccccc;
      content: ' ';
      left: -25px;
      top: 22px;
    }
  }
`;

const TabPanel = styled(AriaTab.Panel)`
  outline: 0;
`;
