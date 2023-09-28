import Login from "./Login";
import Browse from "./Browse"
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { addUser, removeUser } from "../Utils/Userslice";


const Body = () =>{
    //Ideally we can add this routing at the App level(App.js) so that we could use the 'useNavigate' hook here itself in the 'onAuthStageChanged' API.
    //As we haven't done that, we are using the 'useNavigate' hook in the 'Login.js' file.
    const dispatch = useDispatch()
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/browse",
            element: <Browse />
        },
    ]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            //onAuthStageChanged is similar to the event listener
            if (user) {
              // If user signs in & also when user signs up to the website
              const { uid, email, displayName, photoURL } = user;
              dispatch(addUser({ uid: uid, email: email , displayName: displayName, photoURL: photoURL }))
              //above - adding these properties to the store
            } else {
              // User is signed out
              dispatch(removeUser())
            }
          });

    },[])


    return(
        <div>
            <RouterProvider router={appRouter} />      
        </div>
    )
}

export default Body;