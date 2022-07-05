import PopupForm from "../PopupForm/PopupForm";
import Popup from "../Popup/Popup";

function PopupWithForm({
                         popupType,
                         popupTitle,
                         isOpen,
                         onClose,
                         onSubmit,
                         onRedirect,
                         submitButtonText,
                         children
                       }) {

  const handleRedirectClick = () => {
    onClose();
    onRedirect();
  }

  return (
    <Popup
      popupType={popupType}
      isOpen={isOpen}
      onClose={onClose}>
      <h2 className="popup__title">{popupTitle}</h2>
      <PopupForm
        name={popupType}
        onSubmit={onSubmit}
        submitButtonText={submitButtonText}
        submitButtonClassName={`popup__submit-button`}>
        {children}
      </PopupForm>
      <p className='popup__text'>or <span onClick={handleRedirectClick} className='popup__link'>{`${popupType === 'signin' ? 'Sign up' : 'Sign in'}`}</span>
      </p>
    </Popup>
  );
}

export default PopupWithForm;