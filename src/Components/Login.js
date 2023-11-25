import Header from "./Header";
import { useState, useRef } from "react";
import { checkValidSignIn } from "../Utils/CheckValidData";
import { checkValidSignUp } from "../Utils/CheckValidData";
import { auth } from "../Utils/firebase";
import {
  signInWithEmailAndPassword,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/Userslice";
import { LOGO, USER_AVATAR } from "../Utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const message = isSignInForm
      ? checkValidSignIn(email.current.value, password.current.value)
      : checkValidSignUp(
          email.current.value,
          password.current.value,
          name.current.value
        );

    setErrorMessage(message);

    if (!message) {
      if (isSignInForm) {
        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed in
            // eslint-disable-next-line no-unused-vars
            const user = userCredential.user;
          })
          .catch((error) => {
            setErrorMessage("Please check your credentials");
          });
      } else {
        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(user, {
              displayName: name.current.value,
              photoURL: USER_AVATAR,
            })
              .then(() => {
                const { uid, email, displayName, photoURL } = auth.currentUser;
                dispatch(
                  addUser({
                    uid: uid,
                    email: email,
                    displayName: displayName,
                    photoURL: photoURL,
                  })
                );
              })
              .catch((error) => {
                setErrorMessage(error.message);
              });
          })
          .catch((error) => {
            const errorMessage = error.message;
            setErrorMessage(errorMessage);
          });
      }
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="h-screen object-cover md:h-auto"
          src={LOGO}
          alt="background"
        />
      </div>
      <form
        onSubmit={handleFormSubmit}
        className="bg-black p-12 absolute w-full md:w-3/12 my-24 m-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-2xl py-4">
          {isSignInForm ? "Sign In" : "Sign up"}
        </h1>

        {!isSignInForm && (
          <input
            type="text"
            ref={name}
            placeholder="Full Name"
            className="p-2 my-4 bg-gray-900 w-full"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Enter email"
          className="p-2 my-4 bg-gray-900 w-full"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 my-4 w-full bg-gray-900"
        />
        <p className="text-red-500">{errorMessage}</p>

        <button
          className="p-2 my-6 text-white bg-red-500 rounded-lg w-full"
          type="submit"
        >
          {isSignInForm ? "Sign In" : "Sign up"}
        </button>
        <p className="cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up now"
            : "Already Registered? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
