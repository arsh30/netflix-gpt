import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
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
  return (
     <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img src={LOGO} className="w-44" alt="logo" />

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

  //   <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
  //   <img className="w-44" src={LOGO} alt="logo" />
  //   {user && (
  //     <div className="flex p-2">
  //       <img className="w-12 h-12" alt="usericon" src={user?.photoURL} />
  //       <button onClick={handleLogout} className="font-bold text-white ">
  //         (Sign Out)
  //       </button>
  //     </div>
  //   )}
  // </div>
  );
};

export default Header;
