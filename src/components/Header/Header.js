import CustomLink from "../CustomLink/CustomLink";
import Navigation from "../Navigation/Navigation";
import {useHistory} from "react-router-dom";
import useWindowWidth from "../../utils/UseWindowWidth";
import {useState} from "react";

function Header({isLoggedIn, setIsLoggedIn, onLoginClick, onMenuClick, closePopup}) {

  const {width} = useWindowWidth();

  const history = useHistory();
  const location = history.location.pathname;
  const isThemeDark = location === '/';

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const logoutIcon = `header__logout-ico ${isThemeDark ? 'header__logout-ico_color_white' : 'header__logout-ico_color_black'}`;

  const handleLogout = () => {
    setIsLoggedIn(false)
    history.push('/');
  }

  const handleMenuClick = () => {
    setIsMenuOpened(true);
    onMenuClick();
  }

  const loginBtn = isLoggedIn ?
    <button onClick={handleLogout} className={`header__login-btn header__login-btn_type_logout${isThemeDark ? ' header__login-btn_theme-dark' : ''}`} type='submit'>Elise<div className={logoutIcon}/></button> :
    <button onClick={onLoginClick} className={`header__login-btn header__login-btn_type_login${isThemeDark ? ' header__login-btn_theme-dark' : ''}`} type='submit'>Sign in</button>;

  console.log(isMenuOpened);
  const contentContainer = width > 580 ?
    <div className="header__content-container">
      <Navigation
        isThemeDark={isThemeDark}
        loggedIn={isLoggedIn}/>
      {loginBtn}
    </div> :
    isMenuOpened ?
      <button onClick={closePopup} className={`header__menu-btn header__menu-btn_close`}/> :
      <button onClick={handleMenuClick} className={`header__menu-btn ${isThemeDark ? 'header__menu-btn_white' : 'header__menu-btn_black'}`}/>;

  return (
    <header className={`header${isThemeDark ? ' header_theme-dark' : ''}`}>
      <CustomLink to='/' className={`header__logo${isThemeDark ? ' header__logo_theme-dark' : ''}`}>
        News Explorer
      </CustomLink>
      {contentContainer}
    </header>
  );
}

export default Header;