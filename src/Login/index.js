import React,{ useState } from "react";
import firebase from 'firebase';

const Login = () => {
  const [authError, setauthError] = useState(null);

  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      setauthError(error);
    }
  };

  return (
    <div className="Login">
      <button onClick={handleSignIn} id="signUpbutton">Sign in with Google</button>
      {authError && (
        <div>
          <p>Error</p>
          <p>{authError.message}</p>
        </div>
      )}
    </div>
  );
};

export default Login;
