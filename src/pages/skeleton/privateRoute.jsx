import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ( prop ) => {
  const { component: Component } = prop;
  const auth = useSelector((store) => store.auth);

  return (
    <Route
      path="/:path"
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      component={() => {
        return (auth.success ? (
        <Component />
        ) : (
          // eslint-disable-next-line react/prop-types,react/jsx-props-no-spreading
          <Redirect to={'/signIn'} />
        ))
      }}
    />
  );
};
