import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import { Context } from '../../Context';

import './MenuComponent.scss';

export default function MenuComponent() {
  const { user, photos } = React.useContext(Context);
  // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
  return (
    <Menu right>
      <Link className="MenuItem" id="home" to="/">
        Home
      </Link>
      <Link className="MenuItem" id="home" to={`/user/page/${user.uid}`}>
        User Page
      </Link>
      {(user.fname !== '' && (Array.isArray(photos[user.uid]) && !!photos[user.uid].length)) && (
        <>
        <Link className="MenuItem" id="matchs" to="/matchs">
          Matchs
        </Link>
        <Link className="MenuItem" id="chat" to="/dialogs">
          Dialogs
        </Link>
        <Link className="MenuItem" id="followers" to="/followers">
          Followers
        </Link>
        <Link className="MenuItem" id="guests" to="/guests">
          My Guests
        </Link>
        <Link className="MenuItem" id="history" to="/history">
          Visit History
        </Link>
        <Link className="MenuItem" id="ignore" to="/ignore/list">
          Ignore List
        </Link>
        <Link className="MenuItem" id="black" to="/black/list">
          Black List
        </Link>
        </>
      )}
    </Menu>
  );
}
