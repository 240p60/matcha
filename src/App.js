import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Context } from './Context';

import { Login, SignIn, ProfileInfo, SignUp } from './components/index'
import DB from './assets/db.json'

function App() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, []);

  return (
    <main>
      <Context.Provider
        value={{
          users,
          setUsers
        }}
      >
        <Switch>
          <Route path="/signIn">
            <SignIn />
          </Route>
          <Route path="/signUp">
            <SignUp />
          </Route>
          <Route path="/profile">
            <ProfileInfo />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Context.Provider>
    </main>
  );
}

export default App;
