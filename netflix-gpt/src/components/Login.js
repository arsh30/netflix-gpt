import React, { useRef, useState } from "react";
import Header from "./Header";
import backGroundImg from "../assets/backgroundBanner.jpg";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useRef(null); // null is initial value
  const password = useRef(null);
  const name = useRef(null);

  const handleToggleSigninForm = () => {
    setIsSignInForm((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) {
      return;
    }

    // Signin/Signin Login
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User signed up:", user);
          // Handle successful sign-up, e.g., redirecting to a welcome page
          // Note: here we dispatch an action and append the user in the store
          // but we will not do this, firebase give us utility api
          // onauthstatechange (manage user in docs), it automatically call whenever the user
          // signin, signup, signout , whenever any authentication state changes this api will automatically called
          // so will do state changes within it.

          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL:
              "https://yt3.googleusercontent.com/ytc/AIdro_lt506YzYB3boXuLsCfTpcyseonCiWQGQ6QJD463sVIIdg=s900-c-k-c0x00ffffff-no-rj",
          })
            .then(() => {
              // So WE HAVE TO WRITE THIS ON ROOT LEVEL.  IE APP.JS OR BODY.JS
              const { uid, email, displayName, photoURL } = auth.currentUser;

              // Here we update the store
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );

              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User signed in:", user);
          // Handle successful sign-in, e.g., redirecting to a dashboard
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    }
  };
  return (
    <div
      className="w-[100%] h-[100vh]"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backGroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header />

      <div className="max-w-[50%] sm:max-w-[25%] p-8 bg-[rgba(0,0,0,0.5)] mx-auto">
        <form action="" className="grid grid-cols-1 text-white">
          <h1 className="text-white font-bold text-[20px] mb-4">
            {isSignInForm ? "Sign in" : "Sign up"}
          </h1>
          {!isSignInForm ? (
            <input
              ref={name}
              autoComplete="true"
              type="text"
              placeholder="Full Name"
              className="h-[40px] p-[10px] my-2 rounded border-[0.5px] border-[#ccc] bg-[transparent] outline-none mb-3 text-white"
            />
          ) : null}
          <input
            autoComplete="true"
            ref={email}
            type="text"
            placeholder="Email Address"
            className="h-[40px] p-[10px] my-2 rounded border-[0.5px] border-[#ccc] bg-[transparent] outline-none mb-3 text-white"
          />

          <input
            autoComplete="true"
            ref={password}
            type="password"
            placeholder="Password"
            className="h-[40px] p-[10px] my-2 rounded border-[0.5px] border-[#ccc] bg-[transparent] outline-none mb-4 text-white"
          />

          {errorMessage ? (
            <p className="text-red-500 font-bold text-[16px] py-2">
              {errorMessage}
            </p>
          ) : null}

          <button
            onClick={handleSubmit}
            className="p-[10px] my-[10px] bg-red-800 rounded-xl text-white cursor-pointer hover:bg-red-900 mb-4"
          >
            {isSignInForm ? "Sign in" : "Sign up"}
          </button>

          <p className="text-[14px] mt-4">
            {isSignInForm ? "New to Netflix?" : "Already a User ?"}{" "}
            <span
              onClick={handleToggleSigninForm}
              className="hover:underline hover:text-red-700 cursor-pointer"
            >
              {isSignInForm ? "Signup" : "Sign in"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

/*
NOTE -> Whenever we have a large fields of form, always use FORMIK Library because it is very mandatory to handle all these
For React
*/
