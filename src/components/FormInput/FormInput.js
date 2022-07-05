function FormInput({type, name, value, handleChange, placeholder, minLength = 0, maxLength = 1024, isRequired = false, popupType = ''}) {
  return (
    <label className="form-input__label">
      {name.charAt(0).toUpperCase() + name.slice(1)}
      <input
        type={type}
        name={name}
        id={`${popupType}-${name}-input`}
        className={`form-input`}
        value={value || ''}
        onChange={handleChange}
        minLength={minLength}
        maxLength={maxLength}
        required={isRequired}
        placeholder={placeholder}
      />
      <span className={`form-input__error ${name}-input-error`}/>
    </label>
  );
}

export default FormInput;