import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainFooter from '../components/MainFooter';
import { ScrollToTopOnLocationChange, UIProvider } from '../core';
import { withRootStore } from '../stores';
import { authorizeWithTokenWhichFromStorageAction } from '../stores/actions';
import { selectIsAuthInitialized } from '../stores/selectors';
import { defaultDarkTheme } from '../styles';
import DramaEpisodePage from './DramaEpisodePage';
import DramaFirstEpisodePage from './DramaFirstEpisodePage';
import LandingPage from './LandingPage';
import LoginDialogProvider from './LoginDialogProvider';
import MainHeader from './MainHeader';
import MainPage from './MainPage';
import OAuthCheckPage from './OAuthCheckPage';

function AppShell() {
  const dispatch = useDispatch();
  const isAuthInitialized = useSelector(selectIsAuthInitialized);

  useEffect(() => {
    if (!isAuthInitialized) {
      dispatch(authorizeWithTokenWhichFromStorageAction());
    }
  }, [isAuthInitialized, dispatch]);

  return (
    <UIProvider theme={defaultDarkTheme}>
      <LoginDialogProvider>
        <Router>
          <ScrollToTopOnLocationChange />
          <Switch>
            <Route path="/" exact={true}>
              <LandingPage />
            </Route>
            <Route path="/home" exact={true}>
              <MainPage />
            </Route>
            <Route path="/drama/:dramaId" exact={true}>
              <DramaFirstEpisodePage />
            </Route>
            <Route path="/drama/:dramaId/episode/:episodeId" exact={true}>
              <MainHeader />
              <DramaEpisodePage />
              <MainFooter />
            </Route>
            <Route path="/oauth/check" exact={true}>
              <OAuthCheckPage />
            </Route>
          </Switch>
        </Router>
      </LoginDialogProvider>
    </UIProvider>
  );
}

export default withRootStore(AppShell);
