function PopupForm({
                     name,
                     submitButtonText,
                     onSubmit,
                     fetchError,
                     children
}) {


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
      onSubmit={handleSubmit}
      action="#"
      name={`${name}-form`}
      noValidate={true}>
      <fieldset className="popup__fieldset">
        {children}
        <span className={`form-input__error form-input__error_type_submit`}>{fetchError}</span>
        <button
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