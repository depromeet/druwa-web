import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LoginOrSignupDialog } from '../components/LoginOrSignupDialog';
import MainHeader from '../components/MainHeader';
import { UIProvider } from '../core';
import { useBooleanState } from '../hooks';
import { withRootStore } from '../stores';
import { authorizeWithTokenWhichFromStorageAction } from '../stores/actions';
import { defaultDarkTheme } from '../styles';
import OAuthCheckPage from './OAuthCheckPage';

function AppShell() {
  const dispatch = useDispatch();

  const [
    shouldOpenLoginOrSignupDialog,
    openLoginOrSignupDialog,
    closeLoginOrSignupDialog,
  ] = useBooleanState();

  useEffect(() => {
    dispatch(authorizeWithTokenWhichFromStorageAction());
  }, [dispatch]);

  return (
    <UIProvider theme={defaultDarkTheme}>
      <Router>
        <MainHeader onLoginButtonClick={openLoginOrSignupDialog} />
        <Switch>
          <Route path="/" />
          <Route path="/oauth/check">
            <OAuthCheckPage />
          </Route>
        </Switch>
      </Router>
      <LoginOrSignupDialog
        open={shouldOpenLoginOrSignupDialog}
        onClose={closeLoginOrSignupDialog}
      />
    </UIProvider>
  );
}

export default withRootStore(AppShell);
