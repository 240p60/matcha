import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';

import './MenuComponent.scss';

export default function MenuComponent() {
  // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
  return (
    <Menu right>
      <Link id="home" to="/">
        Home
      </Link>
      <Link id="home" to="/user/page">
        User Page
      </Link>
      <Link id="matchs" to="/matchs">
        Matchs
      </Link>
      <Link id="chat" to="/dialogs">
        Dialogs
      </Link>
    </Menu>
  );
}
