import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Context } from './Context';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInitUser } from './store/actions';
import 'antd/dist/antd.css';

import {
  Login,
  SignIn,
  ProfileInfo,
  SignUp,
  Header,
  ConfirmMail,
  UserPage,
  Matchs,
  Preloader,
} from './components/index';

function App() {
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const fetchUser = useSelector((store) => store.fetchUser);
  const auth = useSelector((store) => store.auth);
  const mail = useSelector((store) => store.mail);
  const signUp = useSelector((store) => store.signUp);
  const dispatch = useDispatch();

  let token = sessionStorage.getItem('x-auth-token');
  // if (token === null) {
  //   history.location.pathname !== '/' && history.location.pathname !== '/signIn' && history.location.pathname !== '/signUp' && history.push('/');
  // }

  const initUserAction = React.useCallback(() => {
    token && dispatch(fetchInitUser(token));
  }, [dispatch, token]);

  React.useEffect(() => {
    if (sessionStorage.getItem('x-auth-token')) initUserAction();
  }, [initUserAction]);

  React.useEffect(() => {
    if (auth.status === 401) history.push('/confirm/mail');
    else if (auth.success === true) {
      user.fname === '' ? history.push('/profile') : history.push('/user/page');
    }
  }, [history, auth, user]);

  React.useEffect(() => {
    if (signUp.status === 401) {
      history.push('/confirm/mail');
    } else if (signUp.success === true) {
      history.push('/confirm/mail');
    }
  }, [history, signUp]);

  React.useEffect(() => {
    if (fetchUser.error === 'Unauthorized') {
      history.push('/signIn');
    }
  }, [history, fetchUser]);

  return (
    <main id="main">
      {auth.isLoading || user.isLoading ? (
        <Preloader
          text={
            auth.isLoading
              ? auth.isLoading
              : user.isLoading
              ? user.isLoading
              : 'Почта подтверждена. Пожалуйста, совершите вход'
          }
        />
      ) : (
        <Context.Provider
          value={{
            user,
            fetchUser,
            auth,
            signUp,
            mail,
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
              <Route exact path="/matchs">
                <Matchs />
              </Route>
            </Route>
          </Switch>
        </Context.Provider>
      )}
    </main>
  );
}

export default App;
