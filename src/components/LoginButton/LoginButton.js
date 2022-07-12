function LoginButton({isLoggedIn, setIsLoggedIn, onLoginClick, history, isThemeDark, onClose, username}) {

  const handleLogout = () => {
    setIsLoggedIn(false)
    history.push('/');
  }

  const logoutIcon = `login-button__logout-icon ${isThemeDark ? 'login-button__logout-icon_color_white' : 'login-button__logout-icon_color_black'}`;

  const loginBtn = isLoggedIn ?
    <button onClick={handleLogout} className={`login-button login-button_type_logout${isThemeDark ? ' login-button_theme_dark' : ''}`}
            type='submit'>{username}
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