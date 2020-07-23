import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Context } from './Context';

import { Login, SignIn, ProfileInfo, SignUp, Header, ConfirmMail, UserPage } from './components/index'

function App() {
  const [userInfo, setUserInfo] = useState(false);

  return (
    <main id="main">
      <Context.Provider
        value={{
          userInfo,
          setUserInfo
        }}
      >
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route>
            <Header path="/:path"></Header>
            <Route exact path="/signIn">
              <SignIn />
            </Route>
            <Route exact path="/signUp">
              <SignUp />
            </Route>
            <Route exact path="/profile">
              <ProfileInfo />
            </Route>
            <Route exact path="/confirm/mail">
              <ConfirmMail />
            </Route>
            <Route exact path="/user/page">
              <UserPage />
            </Route>
          </Route>
        </Switch>
      </Context.Provider>
    </main>
  );
}

export default App;
