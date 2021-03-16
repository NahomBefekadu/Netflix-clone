import React, { useState } from "react";
import "./Login.css";
import SignIn from "./SignIn";

function Login() {
  const [signIn, setSignIn] = useState(false);
  return (
    <div className="login">
      <div className="login__background">
        <img
          className="login__logo"
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt="login logo"
        />
        <button className="login__button" onClick={() => setSignIn(true)}>
          Sign In
        </button>
        <div className="login__gradient"></div>
      </div>
      <div className="login__content">
        {signIn ? (
          <SignIn />
        ) : (
          <>
            <h1>Unlimited movies, TV shows, and more.</h1>
            <h2>watch anywhere. Cancel at any time.</h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>
            <div className="login__formSection">
              <form className="login__form">
                <input type="text" placeholder="Email address" />
                <button
                  type="submit"
                  className="login__formButton"
                  onClick={() => setSignIn(true)}
                >
                  Getting Started
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
