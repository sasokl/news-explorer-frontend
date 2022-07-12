import PopupWithForm from "../PopupWithForm/PopupWithForm";
import FormInput from "../FormInput/FormInput";
import {useState} from "react";
import {logError} from "../../utils/Constants";

function SignInPopup({
                       isOpen,
                       onClose,
                       onSignIn,
                       onSignUpClick
}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fetchError, setFetchError] = useState('');


  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  const handleSubmit = () => {
    onSignIn(email, password)
      .then(res => {
        if(res){
          setFetchError(res.message);
          throw new Error(res.message)
        }
      })
      .catch(logError);
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
        submitButtonText='Sign in'>
        <FormInput
          popupType='signin'
          type="email"
          name="email"
          value={email}
          handleChange={handleEmailChange}
          placeholder="Enter email"
          minLength="1"
          maxLength="30"
          isRequired={true}/>
        <FormInput
          popupType='signin'
          type="password"
          name="password"
          value={password}
          handleChange={handlePasswordChange}
          placeholder="Enter password"
          minLength="6"
          maxLength="30"
          isRequired={true}/>
      </PopupWithForm>
  );
}

export default SignInPopup;