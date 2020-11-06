import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { Header } from '../../components/index';
import routes from './routes';
import history from '../../history';

const Skeleton = () => (
  <Router history={history}>
    <div className={styles.skeleton}>
      <MainTopBar />
      <div className="leftmenu-and-maincontent__container">
        <LeftMenuBar />
        <Switch>
          {Object.values(routes).map((route) => (
            <Route
              key={route.path}
              exact
              path={route.path}
              component={route.component}
            />
          ))}
        </Switch>
      </div>
    </div>
  </Router>
);

export default Skeleton;