function PopupForm({name, submitButtonText, onSubmit, children}) {

  const handleButtonMousedown = (e) => {
    e.target.className = 'popup__submit-button popup__submit-button_mousedown'
  }

  const handleButtonMouseup = (e) => {
    e.target.className = 'popup__submit-button'
  }

  const handleSubmit= (e) => {
    e.preventDefault();
    onSubmit();
  }
  return (
    <form
      className='popup__form'
      action="#"
      name={`${name}-form`}
      noValidate={true}>
      <fieldset className="popup__fieldset">
        {children}
        <span className={`form-input__error ${name}-submit-input-error`}/>
        <button
          onClick={handleSubmit}
          onMouseDown={handleButtonMousedown}
          onMouseUp={handleButtonMouseup}
          onMouseLeave={handleButtonMouseup}
          className='popup__submit-button'
          type="submit">
          {submitButtonText}
        </button>
      </fieldset>
    </form>
  );
}

export default PopupForm;