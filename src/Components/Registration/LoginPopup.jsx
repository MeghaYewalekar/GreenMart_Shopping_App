
//This React code implements a login/signup popup component (LoginPopup) with functionality for toggling between login and sign-in forms and closing the popup when clicking outside of it.
import React, { useState, useRef } from "react";
import Signin from "./Signin";
import Login from './Login';

const LoginPopup = ({ loginPopup, handleLoginPopup }) => {
  const [showSignIn, setShowSignIn] = useState(false);

  const handleSignIn = () => {
    setShowSignIn(!showSignIn);
  };

  const loginPopupRef = useRef();

  // Close the popup if clicking outside of it
  window.addEventListener("click", (e) => {
    if (e.target === loginPopupRef.current) {
      handleLoginPopup(false);
    }
  });


  return (
    <>
      {loginPopup && (
        <div
          ref={loginPopupRef}
          className="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-75 flex items-center justify-center"
        >
         <div className="rounded-lg shadow-xl lg:w-80 md:w-30 sm:w-80 bg-emerald-500 bg-opacity-60 p-3">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-white text-xl font-bold"
              onClick={() => handleLoginPopup(false)}
            >
              &times;
            </button>
            <div className="flex flex-col gap-6">
              {showSignIn ? (
                <Signin handleSignIn={handleSignIn} handleLoginPopup={handleLoginPopup}/>
              ) : (
                <Login handleSignIn={handleSignIn} handleLoginPopup={handleLoginPopup} />
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPopup;