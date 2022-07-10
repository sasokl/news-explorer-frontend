import FormInput from "../FormInput/FormInput";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import {useState} from "react";
import {logError} from "../../utils/Constants";

function SignUpPopup({
                       isOpen,
                       onClose,
                       onSignUp,
                       onSignInClick
}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fetchError, setFetchError] = useState('');


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
    onSignUp(email, password, username)
      .then(res => {
        setFetchError(res.message);
        throw new Error(res.message)
      })
      .catch(logError);
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
      submitButtonText='Sign up'>
      <FormInput
        popupType='signup'
        type="email"
        name="email"
        value={email}
        handleChange={handleEmailChange}
        placeholder="Enter email"
        minLength="1"
        maxLength="30"
        isRequired={true}/>
      <FormInput
        popupType='signup'
        type="password"
        name="password"
        value={password}
        handleChange={handlePasswordChange}
        placeholder="Enter password"
        minLength="6"
        maxLength="30"
        isRequired={true}/>
      <FormInput
        popupType='signup'
        type="text"
        name="username"
        value={username}
        handleChange={handleUsernameChange}
        placeholder="Enter username"
        minLength="3"
        maxLength="30"
        isRequired={true}/>
    </PopupWithForm>
  );
}

export default SignUpPopup;