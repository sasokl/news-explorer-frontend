import CustomLink from "../CustomLink/CustomLink";
import Navigation from "../Navigation/Navigation";
import {useHistory} from "react-router-dom";

function Header({isLoggedIn, setIsLoggedIn, onLoginClick}) {


  const history = useHistory();
  const location = history.location.pathname;
  const isThemeDark = location === '/';

  const logoutIcon = `header__logout-ico ${isThemeDark ? 'header__logout-ico_color_white' : 'header__logout-ico_color_black'}`;

  const handleLogout = () => {
    setIsLoggedIn(false)
    history.push('/');
  }

  const loginBtn = isLoggedIn ?
    <button onClick={handleLogout} className={`header__login-btn header__login-btn_type_logout${isThemeDark ? ' header__login-btn_theme-dark' : ''}`} type='submit'>Elise<div className={logoutIcon}/></button> :
    <button onClick={onLoginClick} className={`header__login-btn header__login-btn_type_login${isThemeDark ? ' header__login-btn_theme-dark' : ''}`} type='submit'>Sign in</button>;

  return (
    <header className={`header${isThemeDark ? ' header_theme-dark' : ''}`}>
      <CustomLink to='/' className={`header__logo${isThemeDark ? ' header__logo_theme-dark' : ''}`}>
        News Explorer
      </CustomLink>
      <Navigation
        isThemeDark={isThemeDark}
      loggedIn={isLoggedIn}/>
      {loginBtn}
    </header>
  );
}

export default Header;