import Header from "./Header";
import { useState, useRef } from "react";
import { checkValidSignIn } from "../Utils/CheckValidData";
import { checkValidSignUp } from "../Utils/CheckValidData";

// import Bgimage from "./public/netflix_bg_img"
const Login = () =>{

    const [isSignInForm,setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null)
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
 
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm)
    }
    const handleSignIn = () => {

        console.log(email);
        console.log(password);

        const message = checkValidSignIn(email.current.value,password.current.value);
        setErrorMessage(message);

    }

    const handleSignUp = () => {

        
        const message = checkValidSignUp(email.current.value,password.current.value,name.current.value);
        setErrorMessage(message);

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

                    <button className="p-2 my-6 text-white bg-red-500 rounded-lg w-full" onClick={ isSignInForm ? handleSignIn : handleSignUp}>{isSignInForm ? "Sign In" : "Sign up"} </button>
                    <p className="cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up now" : "Already Registered? Sign In"}</p>
                </form>
        </div>

    )
}

export default Login;