import CustomLink from "../CustomLink/CustomLink";
import Navigation from "../Navigation/Navigation";
import {useHistory} from "react-router-dom";
import {useState} from "react";

function Header() {
  //TODO fix the temp solution for logged in variable
  const [loggedIn, setLoggedIn] = useState(true);

  const history = useHistory();
  const location = history.location.pathname;
  const isThemeDark = location === '/';

  const logoutIcon = `header__logout-ico ${isThemeDark ? 'header__logout-ico_color_white' : 'header__logout-ico_color_black'}`;

  const loginBtn = loggedIn ?
    <button onClick={() => setLoggedIn(false)} className={`header__login-btn header__login-btn_type_logout${isThemeDark ? ' header__login-btn_theme-dark' : ''}`} type='submit'>Elise<div className={logoutIcon}/></button> :
    <button onClick={() => setLoggedIn(true)} className={`header__login-btn header__login-btn_type_login${isThemeDark ? ' header__login-btn_theme-dark' : ''}`} type='submit'>Sign in</button>;

  return (
    <header className={`header${isThemeDark ? ' header_theme-dark' : ''}`}>
      <CustomLink to='/' className={`header__logo${isThemeDark ? ' header__logo_theme-dark' : ''}`}>
        News Explorer
      </CustomLink>
      <Navigation
        isThemeDark={isThemeDark}
      loggedIn={loggedIn}/>
      {loginBtn}
    </header>
  );
}

export default Header;