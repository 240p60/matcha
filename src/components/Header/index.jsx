import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Menu, Button } from '../index';
import { fetchLogOut } from '../../store/Auth/actions';

import './Header.scss';

export default function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handlerLogOut = React.useCallback((e) => {
    e.preventDefault();
    dispatch(fetchLogOut());
    history.push('/');
  }, [dispatch, history]);

  return (
    <div className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link to={sessionStorage.getItem('x-auth-token') ? `/user/page/${user.uid}` : '/'}>Strings</Link>
        </div>
        <div className="header__right-block">
          <div className="header__actions">
            {sessionStorage.getItem('x-auth-token') ? (
              <Button
                href=""
                text="Log Out"
                type="button"
                onClick={handlerLogOut}
                subClass="header-action"
              />
            ) : (
              <Button
                href="/signIn"
                text="Sign In"
                type="button"
                subClass="header-action"
              />
            )}
          </div>
          <Menu></Menu>
        </div>
      </div>
    </div>
  );
}
