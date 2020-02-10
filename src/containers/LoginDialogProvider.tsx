import React, { createContext, ReactNode, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoginOrSignupDialog } from '../components/LoginOrSignupDialog';
import { useBooleanState } from '../hooks';
import { requestLogin, requestSignup } from '../remotes';
import { loginWithTokenActions } from '../stores/actions';

export type LoginDialogContextValue = Readonly<{
  opened: boolean;
  open(): void;
  close(): void;
}>;

export const LoginDialogContext = createContext<LoginDialogContextValue | undefined>(undefined);

LoginDialogContext.displayName = 'LoginDialogContext';

interface Props {
  children: ReactNode;
}

export default function LoginDialogProvider({ children }: Props) {
  const dispatch = useDispatch();

  const [opened, open, close] = useBooleanState();
  const [loginProcessing, setLoginProcessing] = useState(false);
  const [signupProcessing, setSignupProcessing] = useState(false);

  const handleLoginWithToken = useCallback(
    (token: string) => {
      dispatch(loginWithTokenActions.request({ token }));
      close();
    },
    [dispatch, close],
  );

  const handleLogin = useCallback(
    async data => {
      setLoginProcessing(true);

      try {
        const { token } = await requestLogin(data).toPromise();
        dispatch(loginWithTokenActions.request({ token }));
        close();
      } catch (error) {
        // TODO: 에러 처리
      } finally {
        setLoginProcessing(false);
      }
    },
    [dispatch, close],
  );

  const handleSignup = useCallback(
    async data => {
      setSignupProcessing(true);

      try {
        const { token } = await requestSignup(data).toPromise();
        dispatch(
          loginWithTokenActions.request({ token, successMessage: '회원가입이 완료되었습니다!' }),
        );
        close();
      } catch (error) {
        // TODO: 에러 처리
      } finally {
        setSignupProcessing(false);
      }
    },
    [dispatch, close],
  );

  return (
    <LoginDialogContext.Provider
      value={{
        get opened() {
          return opened;
        },
        open,
        close,
      }}
    >
      {children}
      <LoginOrSignupDialog
        open={opened}
        loginProcessing={loginProcessing}
        signupProcessing={signupProcessing}
        onLoginWithToken={handleLoginWithToken}
        onLogin={handleLogin}
        onSignup={handleSignup}
        onClose={close}
      />
    </LoginDialogContext.Provider>
  );
}
