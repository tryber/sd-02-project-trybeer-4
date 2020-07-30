import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import requestAPI from './services/backEndAPI';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [authorized, setAuthorized] = useState(false);
  const [tokenIsValid, setTokenIsValid] = useState(false);
  const user = JSON.parse(localStorage.getItem('user')) || {};

  useEffect(() => {
    requestAPI('GET', '/users/token', null, user.token)
    .then(() => setAuthorized(true))
    .catch(() => setAuthorized(false))
    .then(() => setTokenIsValid(true));
  }, [user.token])

  if (!tokenIsValid) return <div>Carregando...</div>

  return (
    <Route
      {...rest}
      render={(props) => (
        authorized
        ? <Component {...props} />
        : <Redirect to="/login" />
      )}
    />
  );
};

export default PrivateRoute;
