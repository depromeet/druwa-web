import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LoginOrSignupDialog } from '../components/LoginOrSignupDialog';
import MainFooter from '../components/MainFooter';
import MainHeader from '../components/MainHeader';
import { UIProvider } from '../core';
import { useBooleanState } from '../hooks';
import { withRootStore } from '../stores';
import { authorizeWithTokenWhichFromStorageAction } from '../stores/actions';
import { defaultDarkTheme } from '../styles';
import DramaEpisodePage from './DramaEpisodePage';
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
        <Switch>
          <Route path="/" exact={true}>
            <MainHeader onLoginButtonClick={openLoginOrSignupDialog} />
            <DramaEpisodePage />
            <MainFooter />
          </Route>
          <Route path="/oauth/check" exact={true}>
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
