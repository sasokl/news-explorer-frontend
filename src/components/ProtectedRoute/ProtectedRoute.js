import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import CirclePreloader from "../CirclePreloader/CirclePreloader";

function ProtectedRoute({children, isLoggedIn, path, isTokenChecked}) {
  console.log('isTokenChecked ')
  console.log(isTokenChecked)
  console.log('isLoggedIn ')
  console.log(isLoggedIn)
  return (
    <Route path={path}>
      {
        isTokenChecked ?
          isLoggedIn ? children : <Redirect to={"/"}/> :
          <section className="saved-news-header">
            <CirclePreloader/>
          </section>
      }
    </Route>
  );
}

export default ProtectedRoute;