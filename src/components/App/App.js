import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Header from '../Header/Header';
import {Route, Switch, useHistory, useLocation, withRouter} from "react-router-dom";
import SavedNews from "../SavedNews/SavedNews";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import {useEffect, useState} from "react";
import * as auth from "../../utils/AuthApi"
import SignInPopup from "../SignInPopup/SignInPopup";
import SignUpPopup from "../SignUpPopup/SignUpPopup";
import SuccessPopup from "../SuccessPopup/SuccessPopup";
import MenuPopup from "../MenuPopup/MenuPopup";
import mainApi from "../../utils/MainApi";
import newsApi from "../../utils/NewsApi";
import {logError} from "../../utils/Constants";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";


function App() {
  const history = useHistory();
  const signInPopupOpenState = useLocation().state?.signInPopupOpen;

  //TODO fix the temp solution for logged in variable
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [cards, setCards] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);


  const [isSignInPopupOpen, setIsSignInPopupOpen] = useState(false);
  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [isMenuPopupOpen, setIsMenuPopupOpen] = useState(false);

  useEffect(() => {
    checkToken();
    const localStorageSearchedArray = JSON.parse(localStorage.getItem('searched-articles'));
    if (localStorageSearchedArray) setCards(localStorageSearchedArray);
  }, []);

  useEffect(() => {
    if(signInPopupOpenState) {
      setIsSignInPopupOpen(true);
      window.history.replaceState({}, document.title)
    }
  },[signInPopupOpenState])

  useEffect(() => {
    if (isLoggedIn) {
      mainApi.getArticles()
        .then(articles => {
          setSavedArticles([...articles.data]);
        })
        .catch(logError)
    }
  }, [isLoggedIn]);

  const handleSignIn = (email, password, formClearData) => {
    return auth.authorize(email, password)
      .then(res => {
        if(res) {
          localStorage.setItem('jwt', res.token);
          mainApi.updateToken(res.token);
          checkToken()
          formClearData();
          closeAllPopups();
        }
      })
  };

  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((user) => {
          if (user) {
            setCurrentUser(user.data);
            setIsLoggedIn(true);
          }
        })
        .catch(logError)
        .finally(() => {
          setIsTokenChecked(true);
        });
    } else setIsTokenChecked(true)
  };


  const handleSignUp = (email, password, username, clearFormData) => {
    return auth.register(email, password, username)
      .then(() => {
        clearFormData();
        closeAllPopups();
        setIsSuccessPopupOpen(true);
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

  const handleSearchClick = (keyword) => {
    setIsSearching(true);
    newsApi.find(keyword)
      .then(articles => {
        articles = articles
          .map(article => {
            return {
              isSaved: !!savedArticles.find(item => item.link === article.url),
              keyword: `${keyword}`,
              image: article.urlToImage,
              link: article.url,
              title: article.title,
              text: article.description,
              date: article.publishedAt,
              source: article.source.name,
            };
          })
        setCards(articles);
        localStorage.setItem('searched-articles', JSON.stringify(articles));
        setIsSearching(false)
      })
      .catch((err) => {
        setCards([]);
        logError(err);
      })
      .finally(() => {
        setIsSearching(false);
      });
  };

  const handleSaveArticle = (article) => {
    mainApi.saveArticle(article)
      .then(article => {
        setSavedArticles([article.data, ...savedArticles]);
      })
      .catch(logError)
  }

  const handleDeleteArticle = (articleLink) => {
    const articleID = savedArticles.find(article => article.link === articleLink)._id;
    mainApi.deleteArticle(articleID)
      .then(() => {
        setSavedArticles(state => state.filter(item => item._id !== articleID));
      })
      .catch(logError);
  }

  const closeAllPopups = () => {
    setIsSignInPopupOpen(false);
    setIsSignUpPopupOpen(false);
    setIsSuccessPopupOpen(false);
    setIsMenuPopupOpen(false);
  };

  const clearData = () => {
    localStorage.removeItem('jwt');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div className="page">
          <Header
            isLoggedIn={isLoggedIn}
            onLoginClick={handleSignInClick}
            onLogout={clearData}
            onMenuClick={handleMenuClick}
            setIsLoggedIn={setIsLoggedIn}
            history={history}/>
          <Switch>
            <ProtectedRoute path="/saved-news" isLoggedIn={isLoggedIn} isTokenChecked={isTokenChecked}>
              <SavedNews
                isLoggedIn={isLoggedIn}
                savedArticles={savedArticles}
                onSignInClick={handleSignInClick}
                onDeleteArticle={handleDeleteArticle}/>
            </ProtectedRoute>
            <Route path="/">
              <Main
                isLoggedIn={isLoggedIn}
                isSearching={isSearching}
                onSaveArticle={handleSaveArticle}
                onDeleteArticle={handleDeleteArticle}
                savedArticles={savedArticles}
                cards={cards}
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
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
