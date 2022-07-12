import {useState} from "react";

function FormInput({type, name, value, handleChange, placeholder, minLength = 0, maxLength = 1024, isRequired = false, popupType = '', customValidator = '', setIsFormValid}) {

  const [errorText, setErrorText] = useState('');

  const handleTextChanged = (e) => {
    handleChange(e);
    if(customValidator !== '') e.target.setCustomValidity(customValidator(e.target.value));
    setErrorText(e.target.validationMessage);
    setIsFormValid(e.target.closest("form").checkValidity());
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