import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Context } from './Context';

import { Login, SignIn, ProfileInfo, SignUp, Header } from './components/index'

function App() {
  const [users, setUsers] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, []);


  return (
    <main id="main">
      <Context.Provider
        value={{
          users,
          setUsers,
          setLoggedIn
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
          </Route>
        </Switch>
      </Context.Provider>
    </main>
  );
}

export default App;
