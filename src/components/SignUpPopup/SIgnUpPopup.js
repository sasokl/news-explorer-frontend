import FormInput from "../FormInput/FormInput";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import {useState} from "react";

function SignUpPopup({isOpen, onClose, onSignUp, onSignInClick}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');


  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  // temporary function
  const handleSubmit = () => {
    onClose();
    onSignUp();
  }

  return (
    <PopupWithForm
      popupType="signup"
      popupTitle="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onRedirect={onSignInClick}
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
        minLength="1"
        maxLength="30"
        isRequired={true}/>
      <FormInput
        popupType='signup'
        type="text"
        name="username"
        value={username}
        handleChange={handleUsernameChange}
        placeholder="Enter username"
        minLength="1"
        maxLength="30"
        isRequired={true}/>
    </PopupWithForm>
  );
}

export default SignUpPopup;