import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import {Route, Switch, withRouter} from "react-router-dom";

function App(props) {
  return (
    <div className="app">
      <div className="page">
        <Header/>
        <Switch>
          <Route path="/saved-news">
            <SearchForm/>
            <SearchForm/>
          </Route>
          <Route path="/">
            <SearchForm/>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
