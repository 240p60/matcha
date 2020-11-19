import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { Header, SignIn, SignUp, ConfirmMail, ProfileInfo, UserPage, Widget, Chat, Matchs, Dialogs} from '../../components/index';

export const Skeleton = () => (
  <Router>
    <Route>
      <Header />
      <Switch>
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
        <Route exact path="/user/page/:id">
          <UserPage />
        </Route>
        <Route exact path="/matchs">
          <Matchs />
        </Route>
        <Route exact path="/dialogs">
          <Dialogs title="Диалоги" />
        </Route>
        <Route path="/chat/:id">
          <Chat />
        </Route>
        {sessionStorage.getItem('x-auth-token') && <Widget />}
      </Switch>
    </Route>
  </Router>
);
