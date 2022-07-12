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
import mainApi from "../../utils/MainApi";
import newsApi from "../../utils/NewsApi";
import {logError} from "../../utils/Constants";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";


function App() {
  const history = useHistory();

  //TODO fix the temp solution for logged in variable
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [username, setUsername] = useState('');
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
    if(localStorageSearchedArray) setCards(localStorageSearchedArray);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      mainApi.getUser()
        .then(user => {
          setCurrentUser(user.data);


        })
        .catch(logError)

      mainApi.getArticles()
        .then(articles => {
          setSavedArticles(articles.data);
          localStorage.setItem('saved-articles', JSON.stringify(savedArticles))
        })
        .catch(logError)
    }
    else {
      clearData();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    console.log(savedArticles)
  }, [savedArticles])

  const handleSignIn = (email, password) => {
    return auth.authorize(email, password)
      .then(res => {
        if (res.ok) {
          res.json()
            .then(resJson => {
              localStorage.setItem('jwt', resJson.token);
              mainApi.updateToken(resJson.token);
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
    return mainApi.saveArticle(article)
      .then(article => {
        setSavedArticles([article.data, ...savedArticles]);
        localStorage.setItem('saved-articles', JSON.stringify(savedArticles));
      })
  }

  const handleDeleteArticle = (articleLink) => {
    const articleID = savedArticles.find(article => article.link === articleLink)._id;
    return mainApi.deleteArticle(articleID)
      .then(() => {
        setSavedArticles(state => state.filter(item => item._id !== articleID));
        localStorage.setItem('saved-articles', JSON.stringify(savedArticles));
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
    localStorage.removeItem('saved-articles');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
