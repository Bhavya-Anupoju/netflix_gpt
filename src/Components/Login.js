import Header from "./Header";
import { useState, useRef } from "react";
import { checkValidSignIn } from "../Utils/CheckValidData";
import { checkValidSignUp } from "../Utils/CheckValidData";
import { auth } from "../Utils/firebase"
import { signInWithEmailAndPassword, updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/Userslice";


// import Bgimage from "./public/netflix_bg_img"
const Login = () =>{

    const [isSignInForm,setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null)
    const dispatch = useDispatch()
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
    const navigate = useNavigate();
 
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm)
    }
    const handleSignIn = () => {
        //Sign In Page
        console.log(email);
        console.log(password);

        const message = checkValidSignIn(email.current.value,password.current.value);
        setErrorMessage(message);

        //API call - Sign In
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            navigate("/browse")

        })
        .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorMessage)
        });
                
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
          console.log(user);
          updateProfile(auth.currentUser, {
            displayName: name.current.value, photoURL: "https://cdn-icons-png.flaticon.com/512/219/219969.png"
            //we are not able to update displayName, photoURL as we are not giving any input on these at the .
            //We are providing after we successfully login 
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({ uid: uid, email: email , displayName: displayName, photoURL: photoURL }))
            //we are updating the current user's parameters 
            navigate("/")
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

    return(
        <div>
            <Header />
            <div className="absolute">    
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/dc1cf82d-97c9-409f-b7c8-6ac1718946d6/14a8fe85-b6f4-4c06-8eaf-eccf3276d557/IN-en-20230911-popsignuptwoweeks-perspective_alpha_website_large.jpg " alt="background" />
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