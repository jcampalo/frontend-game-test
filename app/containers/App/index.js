import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

import LoginPage from 'containers/LoginPage/Loadable';
import SignPage from 'containers/SignPage/Loadable';
import GamePage from 'containers/GamePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { getCurrentUser } from 'utils/localStorage';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

const App = () => {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Game App"
        defaultTitle="React Game App"
      >
        <meta name="description" content="React Game App" />
      </Helmet>
      <Switch>
        <Route
          path="/game"
          render={props => (
            getCurrentUser().isAuthenticated ? (
              <GamePage {...props} />
            ) : (
              <Redirect to="/login" />
            )
          )}
        />
        <Route path="/login" component={LoginPage} />
        <Route path="/sign" component={SignPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </AppWrapper>
  );
};

export default App;
