import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Menu, Button } from '../index';
import { ReactComponent as Notice } from './calendar.svg';
import { fetchLogOut, fetchInitNotices } from '../../store/actions';

import './Header.scss';

export default function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const notice = useSelector((store) => store.notice);
  const socket = useSelector((store) => store.socket);

  const handlerLogOut = React.useCallback((e) => {
    e.preventDefault();
    if (socket) {
      let message = {};
      message.type = "logout";
      let jsonMessage = JSON.stringify(message);
      socket.send(jsonMessage);
    }
    dispatch(fetchLogOut());
    history.push('/');
  }, [dispatch, socket, history]);
  
  React.useEffect(() => {
    dispatch(fetchInitNotices());
  }, [dispatch]);

  return (
    <div className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link to={sessionStorage.getItem('x-auth-token') ? `/user/page/${user.uid}` : '/'}>Strings</Link>
        </div>
        <div className="header__right-block">
          <div className="header__actions">
            {sessionStorage.getItem('x-auth-token') ? (
              <>
                <Button
                  href=""
                  text="Log Out"
                  type="button"
                  onClick={handlerLogOut}
                  subClass="header-action"
                />
                <Link className="header__notice" to='/notice'>
                  <Notice />
                  {notice.length ? (
                  <div className="header__notice counter">
                    {notice.length}
                  </div>) : null}
                </Link>
              </>
            ) : (
              <Button
                href="/signIn"
                text="Sign In"
                type="button"
                subClass="header-action"
              />
            )}
          </div>
          {sessionStorage.getItem('x-auth-token') && <Menu />}
        </div>
      </div>
    </div>
  );
}
