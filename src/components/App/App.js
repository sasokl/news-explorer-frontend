import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Header from '../Header/Header';
import {Route, Switch, useHistory, withRouter} from "react-router-dom";
import SavedNews from "../SavedNews/SavedNews";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import {useEffect, useState} from "react";
import * as auth from "../../utils/AuthApi"
import SignInPopup from "../SignInPopup/SignInPopup";
import SignUpPopup from "../SignUpPopup/SignUpPopup";
import SuccessPopup from "../SuccessPopup/SuccessPopup";
import MenuPopup from "../MenuPopup/MenuPopup";
import api from "../../utils/MainApi";



function App() {
  const history = useHistory();

  //TODO fix the temp solution for logged in variable
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const [isSignInPopupOpen, setIsSignInPopupOpen] = useState(false);
  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [isMenuPopupOpen, setIsMenuPopupOpen] = useState(false);

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {

  }, [isLoggedIn])

  const handleSignIn = (email, password) => {
    return auth.authorize(email, password)
      .then(res => {
        if (res.ok) {
          res.json()
            .then(resJson => {
              localStorage.setItem('jwt', resJson.token);
              api.updateToken(resJson.token);
              checkToken()
              closeAllPopups();
            })
        } else return res.json();
      })
  };

  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setUsername(res.data.name);
            setIsLoggedIn(true);
          }
        });
    }
  };



  const handleSignUp = (email, password, username) => {
    return auth.register(email, password, username)
      .then((res) => {
        if (res.ok) {
          closeAllPopups();
          setIsSuccessPopupOpen(true);
        } else return res.json();
      })
  };

  const handleSignInClick = () => {
    setIsSignInPopupOpen(true);
  };

  const handleSignUpClick = () => {
    setIsSignUpPopupOpen(true);
  };

  const handleMenuClick = () => {
    setIsMenuPopupOpen(true);
  };

  const handleSearchClick = () => {
    setIsSearching(true);
  };

  const closeAllPopups = () => {
    setIsSignInPopupOpen(false);
    setIsSignUpPopupOpen(false);
    setIsSuccessPopupOpen(false);
    setIsMenuPopupOpen(false);
  };

  return (
    <div className="app">
      <div className="page">
        <Header
          isLoggedIn={isLoggedIn}
          onLoginClick={handleSignInClick}
          onMenuClick={handleMenuClick}
          setIsLoggedIn={(isLoggedInFlag) => setIsLoggedIn(isLoggedInFlag)}
          history={history}
          username={username}/>
        <Switch>
          <ProtectedRoute path="/saved-news" username={username}>
            <SavedNews
              isLoggedIn={isLoggedIn}/>
          </ProtectedRoute>
          <Route path="/">
            <Main
              isLoggedIn={isLoggedIn}
              isSearching={isSearching}
              onSignInClick={handleSignInClick}
              onSearchClick={handleSearchClick}/>
          </Route>
        </Switch>
        <Footer/>
      </div>
      <SignInPopup
        isOpen={isSignInPopupOpen}
        onSignIn={handleSignIn}
        onSignUpClick={handleSignUpClick}
        onClose={closeAllPopups}/>
      <SignUpPopup
        isOpen={isSignUpPopupOpen}
        onSignUp={handleSignUp}
        onSignInClick={handleSignInClick}
        onClose={closeAllPopups}/>
      <SuccessPopup
        isOpen={isSuccessPopupOpen}
        onClose={closeAllPopups}
        onSignInClick={handleSignInClick}/>
      <MenuPopup
        isOpen={isMenuPopupOpen}
        onClose={closeAllPopups}
        isLoggedIn={isLoggedIn}
        onLoginClick={handleSignInClick}
        setIsLoggedIn={(isLoggedInFlag) => setIsLoggedIn(isLoggedInFlag)}
        history={history}/>
    </div>
  );
}

export default withRouter(App);
