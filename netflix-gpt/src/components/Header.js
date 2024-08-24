import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, supportedLang } from "../utils/constants";
import { toggleGPTSearchView } from "../utils/GptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // navigate("/");
        // action is dispatch automatically from the body.js code onauthstatechange
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const UnSubscribe = onAuthStateChanged(auth, (user) => {
      // It is like a event listener so we have to unsubscribe this when component unmount
      if (user) {
        // user is signin/signup this if will be called
        const { uid, email, displayName, photoURL } = user;

        // Here we update the store
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        // navigate("/browse"); here we are not able to able navigate because it is outside the
        // router provider, so uske andr jo child hai udr se krwana pdhega ie Login

        navigate("/browse");
      } else {
        // user is signout this is called
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => {
      // because header can be load mulitple time in a single session,
      // so it is like a event listner , so we have to remove this also
      // when component unmounts
      UnSubscribe();
    };
  }, []);

  const handleGPTSearchClick = () => {
    // Toggle the GPT Search, we want jo browse me GPT Searrch component hai tbhi enable hoga jab Click krege,
    // we have 2 ways use State variable (Lifting up state) or we already using Redux so we are using this
    // so we will Create a New Slice , because always put seperations between the components.
    // we can also put every thing in one slice also
    dispatch(toggleGPTSearchView());
  };

  const handleLanguageChange = (e) => {
    // console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row md:justify-between">
      <img src={LOGO} className="w-44 mx-auto md:mx-0" alt="logo" />

      {user ? (
        <div className="flex items-center">
          {showGptSearch ? (
            <select
              className="p-2 m-2 bg-gray-500 text-white"
              onChange={handleLanguageChange}
            >
              {supportedLang.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          ) : null}
          <button
            onClick={handleGPTSearchClick}
            className="text-white py-2 px-4 mx-4 my-2 bg-purple-800 rounded-lg"
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
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
