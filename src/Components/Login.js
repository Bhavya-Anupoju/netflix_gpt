import Header from "./Header";
import { useState, useRef } from "react";
import { checkValidSignIn } from "../Utils/CheckValidData";
import { checkValidSignUp } from "../Utils/CheckValidData";
import { auth } from "../Utils/firebase"
import { signInWithEmailAndPassword, updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/Userslice";
import { LOGO,photoURL } from "../Utils/constants";


// import Bgimage from "./public/netflix_bg_img"
const Login = () =>{

    const [isSignInForm,setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null)
    const dispatch = useDispatch()
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
 
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm)
    }

    const handleSignUp = () => {
        //Sign up Page
        const message = checkValidSignUp(email.current.value,password.current.value,name.current.value);
        setErrorMessage(message);

        //API call - Sign up
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          //the user we have above is not the current one. Its the old one.
          updateProfile(auth.currentUser, {
            displayName: name.current.value, photoURL: {photoURL}
            //we are not able to update displayName, photoURL as we are not giving any input on these at the .
            //We are providing after we successfully login 
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({ uid: uid, email: email , displayName: displayName, photoURL: photoURL }))
            //we are updating the current user's parameters 
          }).catch((error) => {
            setErrorMessage(error.message)
          });
        })
        .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
        // ..
        });
    }

    const handleSignIn = () => {
        //Sign In Page
        const message = checkValidSignIn(email.current.value,password.current.value);
        setErrorMessage(message);

        //API call - Sign In
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
        })
        .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorMessage)
        });
                
    }

    return(
        <div>
            <Header />
            <div className="absolute">    
                <img src={LOGO} alt="background" />
            </div>
                <form onSubmit={(e) => e.preventDefault()}className="bg-black p-12 absolute w-3/12 my-24 m-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
                    <h1 className="font-bold text-2xl py-4">{isSignInForm ? "Sign In" : "Sign up"}</h1>

                    {!isSignInForm && <input type="text" ref={name} placeholder="Full Name" className="p-2 my-4 bg-gray-900 w-full" />}

                    <input ref={email} type="text" placeholder="Enter email" className="p-2 my-4 bg-gray-900 w-full" />
                    
                    <input ref={password} type="password" placeholder="Password" className="p-2 my-4 w-full bg-gray-900" />
                    <p className="text-red-500">{errorMessage}</p>

                    <button className="p-2 my-6 text-white bg-red-500 rounded-lg w-full" onClick={ isSignInForm ? handleSignIn : handleSignUp} type="submit" >{isSignInForm ? "Sign In" : "Sign up"}</button>
                    <p className="cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up now" : "Already Registered? Sign In"}</p>
                </form>
        </div>

    )
}

export default Login;