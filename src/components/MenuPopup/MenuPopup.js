import Popup from "../Popup/Popup";

function MenuPopup({isOpen, onClose}) {
  return (
    <Popup
    popupType='menu'
    isOpen={isOpen}
    onClose={onClose}>
    </Popup>
  );
}

export default MenuPopup;