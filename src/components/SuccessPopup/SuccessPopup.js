import Popup from "../Popup/Popup";

function SuccessPopup({isOpen,onClose, onSignInClick}) {

  const handleRedirectClick = () => {
    onClose();
    onSignInClick();
  }
  return (
    <Popup
      popupType='success'
      isOpen={isOpen}
      onClose={onClose}>
      <h2 className="popup__title">Registration successfully completed!</h2>
      <p className='popup__link popup__link_type_success' onClick={handleRedirectClick}>Sign in</p>
    </Popup>
  );
}

export default SuccessPopup;