import Header from '../Header/Header';
import {Route, Switch, withRouter} from "react-router-dom";
import SavedNews from "../SavedNews/SavedNews";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import {useState} from "react";


function App() {
  //TODO fix the temp solution for logged in variable
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="app">
      <div className="page">
        <Header
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={(isLoggedInFlag) => setIsLoggedIn(isLoggedInFlag)}/>
        <Switch>
          <Route path="/saved-news">
            <SavedNews
              isLoggedIn={isLoggedIn}/>
          </Route>
          <Route path="/">
            <Main
              isLoggedIn={isLoggedIn}/>
          </Route>
        </Switch>
        <Footer/>
      </div>
    </div>
  );
}

export default withRouter(App);
