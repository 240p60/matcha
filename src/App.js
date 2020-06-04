import React from 'react';
import { Switch, Route } from 'react-router-dom'

import { Login, LoginPhone, ProfileInfo } from './components/index'

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/login/phone">
          <LoginPhone />
        </Route>
        <Route path="/profile">
          <ProfileInfo />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
