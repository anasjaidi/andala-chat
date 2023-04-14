import { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../store/userSlice";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import classes from "./AuthForm.module.css";
import axios from "axios";

const AuthForm = () => {
  const history = useHistory();
  const isLogin_ = useSelector((state) => state.user.loggedIn);

  const [isLogin, setIsLogin] = useState(true);

  const dispatcher = useDispatch();

  const passwordRef = useRef();
  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    const entredEmailValue = emailRef.current.value;
    const entredPasswordValue = passwordRef.current.value;

    let endpoint;
    let req;

    if (isLogin) {
      endpoint = "/api/v1/user/signin";
      req = {
        email: entredEmailValue,
        password: entredPasswordValue,
      };
    } else {
      const entredFirstNameValue = firstNameRef.current.value;
      const entredLastNameValue = lastNameRef.current.value;
      endpoint = "/api/v1/user/signup";

      req = {
        firstName: entredFirstNameValue,
        lastName: entredLastNameValue,
        email: entredEmailValue,
        password: entredPasswordValue,
      };
    }

    try {
      const data = await axios.post(endpoint, req);
	  console.log("token is : ", data.data.token)
      localStorage.setItem("token", data.data.token);
      dispatcher(userAction.login({ token: data.data.token }));
      history.push("/");
    }
	catch (e) {
      console.log(e);
    }
  };

  return (
    <section className={classes.auth}>
      <Toaster position="top-right" reverseOrder={false} />
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form>
        {!isLogin && (
          <>
            <div className={classes.control}>
              <label htmlFor="firstName">first name</label>
              <input type="text" id="firstName" required ref={firstNameRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor="lastName">last name</label>
              <input type="text" id="lastName" required ref={lastNameRef} />
            </div>
          </>
        )}
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          <button onClick={submitFormHandler}>
            {isLogin ? "Login" : "Create Account"}
          </button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
