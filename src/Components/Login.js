import Header from "./Header";
const Login = () =>{
    return(
        <div>
            <Header />
            <div className="absolute">    
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/42df4e1f-bef6-499e-87ff-c990584de314/5e7c383c-1f88-4983-b4da-06e14c0984ba/IN-en-20230904-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="background" />
            </div>
            {/* <h1>Sign In</h1> */}
            <form className="bg-black p-12 absolute">
                <input type="text" placeholder="Enter email" className="p-2 m-2" />
                <input type="text" placeholder="Password" className="p-2 m-2" />
                <button className="p-2 m-2 text-white bg-red-500 rounded-sm">Sign in</button>
            </form>
        </div>

    )
}

export default Login;