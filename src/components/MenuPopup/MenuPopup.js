import Popup from "../Popup/Popup";
import CustomLink from "../CustomLink/CustomLink";
import Navigation from "../Navigation/Navigation";
import LoginButton from "../LoginButton/LoginButton";

function MenuPopup({isLoggedIn, setIsLoggedIn, onLoginClick, history, isOpen, onClose}) {

  const handleLoginClick = () => {
    onClose();
    onLoginClick();
  }
  return (
    <Popup
    popupType='menu'
    isOpen={isOpen}
    onClose={onClose}>
      <CustomLink to='/' className={`menu-popup__logo logo logo_theme_dark`}>
        News Explorer
      </CustomLink>
      <Navigation
      isThemeDark={true}
      isLoggedIn={isLoggedIn}
      onClose={onClose}/>
      <div className='menu-popup__login-button'>
        <LoginButton
        onLoginClick={handleLoginClick}
        isLoggedIn={isLoggedIn}
        isThemeDark={true}
        history={history}
        onClose={onClose}
        cssClass='menu-popup__login-button'
        setIsLoggedIn={setIsLoggedIn}/>
      </div>
    </Popup>
  );
}

export default MenuPopup;