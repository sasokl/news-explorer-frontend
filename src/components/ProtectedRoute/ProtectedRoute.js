import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import CirclePreloader from "../CirclePreloader/CirclePreloader";

function ProtectedRoute({children, isLoggedIn, path, isTokenChecked}) {
  return (
    <Route path={path}>
      {
        isTokenChecked
          ? isLoggedIn
            ? children
            : <Redirect to={{
              pathname: "/",
              state: {signInPopupOpen: true},
            }}/>
          :
          <section className="saved-news-header">
            <CirclePreloader/>
          </section>
      }
    </Route>
  );
}

export default ProtectedRoute;