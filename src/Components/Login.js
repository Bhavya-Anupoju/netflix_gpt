import Header from "./Header";
import { useState } from "react"
// import Bgimage from "./public/netflix_bg_img"
const Login = () =>{

    const [isSignInForm,setIsSignInForm] = useState(true);
 
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm)
    } 

    return(
        <div>
            <Header />
            <div className="absolute">    
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/dc1cf82d-97c9-409f-b7c8-6ac1718946d6/14a8fe85-b6f4-4c06-8eaf-eccf3276d557/IN-en-20230911-popsignuptwoweeks-perspective_alpha_website_large.jpg " alt="background" />
            </div>
                <form className="bg-black p-12 absolute w-3/12 my-24 m-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
                    <h1 className="font-bold text-2xl py-4">{isSignInForm ? "Sign In" : "Sign up"}</h1>
                    {!isSignInForm && <input type="text" placeholder="Full Name" className="p-2 my-4 bg-gray-900 w-full" />}
                    <input type="text" placeholder="Enter email" className="p-2 my-4 bg-gray-900 w-full" />
                    <input type="text" placeholder="Password" className="p-2 my-4 w-full bg-gray-900" />
                    <button className="p-2 my-6 text-white bg-red-500 rounded-lg w-full">{isSignInForm ? "Sign In" : "Sign up"}</button>
                    <p className="cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up now" : "Already Registered? Sign In"}</p>
                </form>
        </div>

    )
}

export default Login;