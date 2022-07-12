import FormInput from "../FormInput/FormInput";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import {useState} from "react";
import {logError} from "../../utils/Constants";
import validator from "validator/es";

function SignUpPopup({
                       isOpen,
                       onClose,
                       onSignUp,
                       onSignInClick
                     }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [submitButtonText, setSubmitButtonText] = useState('Sign up');
  const [fetchError, setFetchError] = useState('');

  const clearFormData = () => {
    setEmail('');
    setPassword('');
    setUsername('');
    setFetchError('');
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  const handleSubmit = () => {
    setSubmitButtonText('Creating account..');
    onSignUp(email, password, username, clearFormData, setSubmitButtonText)
      .then(res => {
        if (res) {
          setFetchError(res.message);
          throw new Error(res.message)
        }
      })
      .catch(logError)
      .finally(() => {
        setSubmitButtonText('Sign up');
      });
  }

  const handleEmailValidation = (email) => {
    return validator.isEmail(email) ? '' : 'Invalid email';
  }

  return (
    <PopupWithForm
      popupType="signup"
      popupTitle="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onRedirect={onSignInClick}
      fetchError={fetchError}
      submitButtonText={submitButtonText}
      isFormValid={isFormValid}>
      <FormInput
        popupType='signup'
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
        popupType='signup'
        type="password"
        name="password"
        value={password}
        handleChange={handlePasswordChange}
        placeholder="Enter password"
        minLength="8"
        maxLength="30"
        isRequired={true}
        setIsFormValid={setIsFormValid}/>
      <FormInput
        popupType='signup'
        type="text"
        name="username"
        value={username}
        handleChange={handleUsernameChange}
        placeholder="Enter username"
        minLength="3"
        maxLength="30"
        isRequired={true}
        setIsFormValid={setIsFormValid}/>
    </PopupWithForm>
  );
}

export default SignUpPopup;