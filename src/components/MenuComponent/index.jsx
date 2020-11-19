import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import { Context } from '../../Context';

import './MenuComponent.scss';

export default function MenuComponent() {
  const { user } = React.useContext(Context);
  // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
  return (
    <Menu right>
      <Link id="home" to="/">
        Home
      </Link>
      <Link id="home" to={`/user/page/${user.uid}`}>
        User Page
      </Link>
      <Link id="matchs" to="/matchs">
        Matchs
      </Link>
      <Link id="chat" to="/dialogs">
        Dialogs
      </Link>
      <Link id="ignore" to="/ignore/list">
        Ignore List
      </Link>
      <Link id="black" to="/black/list">
        Black List
      </Link>
    </Menu>
  );
}
