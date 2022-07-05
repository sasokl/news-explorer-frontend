import Header from '../Header/Header';
import {Route, Switch, withRouter} from "react-router-dom";
import SavedNews from "../SavedNews/SavedNews";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import {useState} from "react";
import SignInPopup from "../SignInPopup/SignInPopup";
import SignUpPopup from "../SignUpPopup/SIgnUpPopup";
import SuccessPopup from "../SuccessPopup/SuccessPopup";


function App() {
  //TODO fix the temp solution for logged in variable
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isSignInPopupOpen, setIsSignInPopupOpen] = useState(false);
  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);

  const handleSignIn = () => {
    setIsLoggedIn(true);
  };

  const handleSignUp = () => {
    setIsSuccessPopupOpen(true)
  };

  const handleSignInClick = () => {
    setIsSignInPopupOpen(true);
  };

  const handleSignUpClick = () => {
    setIsSignUpPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsSignInPopupOpen(false);
    setIsSignUpPopupOpen(false);
    setIsSuccessPopupOpen(false);
  }

  return (
    <div className="app">
      <div className="page">
        <Header
          isLoggedIn={isLoggedIn}
          onLoginClick={handleSignInClick}
          setIsLoggedIn={(isLoggedInFlag) => setIsLoggedIn(isLoggedInFlag)}/>
        <Switch>
          <Route path="/saved-news">
            <SavedNews
              isLoggedIn={isLoggedIn}/>
          </Route>
          <Route path="/">
            <Main
              isLoggedIn={isLoggedIn}
              onSignInClick={handleSignInClick}/>
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
    </div>
  );
}

export default withRouter(App);
