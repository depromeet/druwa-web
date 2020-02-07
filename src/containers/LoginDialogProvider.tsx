import React, { createContext, ReactNode, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { LoginOrSignupDialog } from '../components/LoginOrSignupDialog';
import { useBooleanState } from '../hooks';
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
  const handleLoginWithToken = useCallback(
    (token: string) => {
      dispatch(loginWithTokenActions.request({ token }));
      close();
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
      <LoginOrSignupDialog open={opened} onLoginWithToken={handleLoginWithToken} onClose={close} />
    </LoginDialogContext.Provider>
  );
}
