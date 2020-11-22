import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Context } from './Context';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInitUser, fetchAuthClear, openSocket, fetchLogOut } from './store/actions';
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
  Widget,
  Dialogs,
  Ignore,
  Notices,
  Chat,
} from './components/index';

function App() {
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const fetchUser = useSelector((store) => store.fetchUser);
  const auth = useSelector((store) => store.auth);
  const mail = useSelector((store) => store.mail);
  const signUp = useSelector((store) => store.signUp);
  const photos = useSelector((store) => store.photos);
  const dispatch = useDispatch();

  let token = sessionStorage.getItem('x-auth-token');
  let uid = sessionStorage.getItem('uid');

  const initUserAction = React.useCallback(() => {
    token && uid && dispatch(fetchInitUser(uid, token));
  }, [dispatch, uid, token]);

  React.useEffect(() => {
    if (sessionStorage.getItem('x-auth-token') && user.fname === '') {
      initUserAction();
      dispatch(openSocket(uid, token));
    }
  }, [initUserAction]);

  React.useEffect(() => {
    if (auth.status === 401) history.push('/confirm/mail');
    else if (auth.success === true) {
      user.fname === '' ? history.push('/profile') : history.push(`/user/page/${user.uid}`);
      dispatch(fetchAuthClear());
    }
  }, [history, auth, user, dispatch]);

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
      dispatch(fetchLogOut());
    }
  }, [history, fetchUser, dispatch]);

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
            photos,
          }}
        >
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route>
              <Header path="/:path" />
              <Route exact path="/signIn">
                <SignIn />
              </Route>
              <Route exact path="/signUp">
                <SignUp />
              </Route>
              {token && (
                <>
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
                    <Dialogs title="Dialogs" />
                  </Route>
                  <Route exact path="/ignore/list">
                    <Ignore type="ignore" title="Ignored users" />
                  </Route>
                  <Route exact path="/black/list">
                    <Ignore type="blacklist" title="Blacklist" />
                  </Route>
                  <Route exact path="/guests">
                    <Ignore type="guests" title="My Guests" />
                  </Route>
                  <Route exact path="/history">
                    <Ignore type="history" title="Visit History" />
                  </Route>
                  <Route exact path="/notice">
                    <Notices title="Notices" />
                  </Route>
                  <Route path="/chat/:id">
                    <Chat />
                  </Route>
                  <Widget />
                </>
              )}
            </Route>
          </Switch>
        </Context.Provider>
      )}
    </main>
  );
}

export default App;
