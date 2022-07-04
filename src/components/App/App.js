import Header from '../Header/Header';
import {Route, Switch, withRouter} from "react-router-dom";
import SavedNews from "../SavedNews/SavedNews";
import Main from "../Main/Main";

function App(props) {
  return (
    <div className="app">
      <div className="page">
        <Header/>
        <Switch>
          <Route path="/saved-news">
            <SavedNews/>
          </Route>
          <Route path="/">
            <Main/>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
