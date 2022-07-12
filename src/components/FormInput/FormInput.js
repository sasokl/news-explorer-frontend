import {useState} from "react";

function FormInput({type, name, value, handleChange, placeholder, minLength = 0, maxLength = 1024, isRequired = false, popupType = '', customValidator = ''}) {

  const [errorText, setErrorText] = useState('');

  const handleTextChanged = (e) => {
    handleChange(e);
    const customError = customValidator !== '' ? customValidator(e.target.value) : '';
    const defaultError = !e.target.validity.valid ? e.target.validationMessage : '';
    setErrorText(customError === '' ? defaultError : customError);
  }

  return (
    <label className="form-input__label">
      {name.charAt(0).toUpperCase() + name.slice(1)}
      <input
        type={type}
        name={name}
        id={`${popupType}-${name}-input`}
        className={`form-input`}
        value={value || ''}
        onChange={handleTextChanged}
        minLength={minLength}
        maxLength={maxLength}
        required={isRequired}
        placeholder={placeholder}
      />
      <span className={`form-input__error ${name}-input-error`}>{errorText}</span>
    </label>
  );
}

export default FormInput;