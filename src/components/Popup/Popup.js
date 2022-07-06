import {useEffect} from "react";
import useWindowWidth from "../../utils/UseWindowWidth";

function Popup({popupType, isOpen, onClose, children}) {

  const {width} = useWindowWidth();
  const isMobile = width <= 580;
  const mobileContainerClass = isMobile ?
    popupType === 'menu' ?
      ' popup__container_type_top' :
      ' popup__container_type_bottom' :
    '';

  useEffect(() => {
    if (isOpen && (popupType === 'menu' && width > 580)) {
      onClose();
    }
  }, [width, isOpen, popupType, onClose])

  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [isOpen, onClose])

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`popup popup_type_${popupType}${isOpen ? ` popup_open` : ''}`}
      onClick={handleOverlay}
    >
      <div className={`popup__container${mobileContainerClass}`}>
        <button
          className="popup__close-button"
          onClick={onClose}
          type="button"/>
        {children}
      </div>
    </div>
  );
}

export default Popup;