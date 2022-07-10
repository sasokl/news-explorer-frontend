import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ children, username, path }) {
  return (
    <Route path={path}>
      {username === '' ? <Redirect to={"/"} /> : children  }
    </Route>
  );
}

export default ProtectedRoute;