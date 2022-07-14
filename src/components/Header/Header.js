import CustomLink from "../CustomLink/CustomLink";
import Navigation from "../Navigation/Navigation";
import useWindowWidth from "../../utils/UseWindowWidth";
import LoginButton from "../LoginButton/LoginButton";

function Header({isLoggedIn, setIsLoggedIn, onLoginClick, onLogout, onMenuClick, history}) {
  const {width} = useWindowWidth();

  const location = history.location.pathname;
  const isThemeDark = location === '/';

  const contentContainer = width > 580 ?
    <div className="header__content-container">
      <Navigation
        isThemeDark={isThemeDark}
        isLoggedIn={isLoggedIn}/>
      <LoginButton
        onLoginClick={onLoginClick}
        onLogout={onLogout}
        isLoggedIn={isLoggedIn}
        isThemeDark={isThemeDark}
        history={history}
        setIsLoggedIn={setIsLoggedIn}/>
    </div> :
    <button onClick={onMenuClick} className={`header__menu-btn ${isThemeDark ? 'header__menu-btn_white' : 'header__menu-btn_black'}`}/>;

  return (
    <header className={`header${isThemeDark ? ' header_theme_dark' : ''}`}>
      <CustomLink to='/' className={`header__logo logo${isThemeDark ? ' logo_theme_dark' : ''}`}>
        News Explorer
      </CustomLink>
      {contentContainer}
    </header>
  );
}

export default Header;