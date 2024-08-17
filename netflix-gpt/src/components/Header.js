import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        // action is dispatch automatically from the body.js code onauthstatechange
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  return (
    <div className="px-12 w-[100%] py-6 bg-gradient-to-b from-black flex items-center justify-between">
      <img
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        className="w-44"
        alt="logo"
      />

      {user ? (
        <div className="flex items-center">
          <img alt="signout icon" className="w-12" src={user?.photoURL} />
          <button
            onClick={handleLogout}
            className="ml-2 hover:underline hover:text-red-950 text-red-800 font-bold"
          >
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
