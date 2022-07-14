import React from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function LoginButton({isLoggedIn, setIsLoggedIn, onLoginClick, onLogout, history, isThemeDark}) {

  const currentUser = React.useContext(CurrentUserContext);

  const handleLogout = () => {
    onLogout();
    setIsLoggedIn(false)
    history.push('/');
  }

  const logoutIcon = `login-button__logout-icon ${isThemeDark ? 'login-button__logout-icon_color_white' : 'login-button__logout-icon_color_black'}`;

  const loginBtn = isLoggedIn ?
    <button onClick={handleLogout} className={`login-button login-button_type_logout${isThemeDark ? ' login-button_theme_dark' : ''}`}
            type='submit'>{currentUser.name}
      <div className={logoutIcon}/>
    </button> :
    <button onClick={onLoginClick} className={`login-button login-button_type_login${isThemeDark ? ' login-button_theme_dark' : ''}`}
            type='submit'>Sign in</button>;

  return (
    <>
      {loginBtn}
    </>
  );
}

export default LoginButton;