import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import IntroPage from './pages/IntroPage';

const HomePage = lazy(() => import('./pages/HomePage'));

export default function App() {
  return (
    <Router>
      <Link to="/home">Home</Link>
      <Suspense fallback={null}>
        <Switch>
          <Route exact={true} path="/" component={IntroPage} />
          <Route path="/home" component={HomePage} />
        </Switch>
      </Suspense>
    </Router>
  );
}
