import PopupWithForm from "../PopupWithForm/PopupWithForm";
import FormInput from "../FormInput/FormInput";
import {useState} from "react";
import {logError} from "../../utils/Constants";
import validator from "validator/es";

function SignInPopup({
                       isOpen,
                       onClose,
                       onSignIn,
                       onSignUpClick
                     }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [submitButtonText, setSubmitButtonText] = useState('Sign in');
  const [fetchError, setFetchError] = useState('');

  const clearFormData = () => {
    setEmail('');
    setPassword('');
    setFetchError('');
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  const handleSubmit = () => {
    setSubmitButtonText('Signing in...');
    onSignIn(email, password, clearFormData)
      .then(res => {
        if (res) {
          setFetchError(res.message);
          throw new Error(res.message)
        }
      })
      .catch(logError)
      .finally(() => {
        setSubmitButtonText('Sign in');
      });
  }

  const handleEmailValidation = (email) => {
    return validator.isEmail(email) ? '' : 'Invalid email';
  }

  return (
    <PopupWithForm
      popupType="signin"
      popupTitle="Sign in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onRedirect={onSignUpClick}
      fetchError={fetchError}
      submitButtonText={submitButtonText}
      isFormValid={isFormValid}>
      <FormInput
        popupType='signin'
        type="email"
        name="email"
        value={email}
        handleChange={handleEmailChange}
        placeholder="Enter email"
        minLength="1"
        maxLength="30"
        isRequired={true}
        customValidator={handleEmailValidation}
        setIsFormValid={setIsFormValid}/>
      <FormInput
        popupType='signin'
        type="password"
        name="password"
        value={password}
        handleChange={handlePasswordChange}
        placeholder="Enter password"
        maxLength="30"
        isRequired={true}
        setIsFormValid={setIsFormValid}/>
    </PopupWithForm>
  );
}

export default SignInPopup;