import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const toggleSignupForm = () => {
    setIsSignIn(!isSignIn);
  };
  return (
    <div>
      <Header />

      <div className="absolute">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/8728e059-7686-4d2d-a67a-84872bd71025/e90516bd-6925-4341-a6cf-0b9f3d0c140a/IN-en-20240708-POP_SIGNUP_TWO_WEEKS-perspective_WEB_34324b52-d094-482b-8c2a-708dc64c9065_large.jpg" />
      </div>

      <div className="flex justify-center h-[100vh] items-center">
        <form className="w-3/12 absolute bg-black p-12 text-white rounded-lg bg-opacity-80">
          <h1 className="font-bold text-3xl py-4">
            {isSignIn ? "Sign In" : "Sign Up "}
          </h1>

          {!isSignIn ? (
            <input
              type="name"
              placeholder="Enter your Full Name"
              className="p-2 mb-6 w-full bg-gray-700"
            />
          ) : null}

          <input
            type="email"
            placeholder="Enter your Email"
            className="p-2 mb-6 w-full bg-gray-700"
          />
          <input
            type="password"
            placeholder="Enter your Password"
            className="p-2 mb-6 w-full bg-gray-700"
          />
          <button className="p-2 rounded-lg w-full bg-red-700 font-bold hover:bg-red-800">
            {isSignIn ? "Sign In" : "Sign Up "}
          </button>

          <p className="py-4">
            {isSignIn ? (
              <>
                New to Netflix?{" "}
                <span
                  onClick={() => toggleSignupForm()}
                  className="cursor-pointer hover:text-red-700 hover:underline transition duration-500 ease-in-out"
                >
                  Signup now
                </span>
              </>
            ) : (
              <>
                Already User ?{" "}
                <span
                  onClick={() => toggleSignupForm()}
                  className="cursor-pointer hover:text-red-700 hover:underline transition duration-500 ease-in-out"
                >
                  Signin now
                </span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

/*
NOTE -> Whenever we have a large always use FORMIK Library because it is very mandatory to handle all these
For React
*/