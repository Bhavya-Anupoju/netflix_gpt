import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser,removeUser } from "../Utils/Userslice";
import { useEffect } from "react";
import { Netflix_Logo } from "../Utils/constants";


const Header = () =>{

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(store => store.user);
    const handleSignOut = () => {
        signOut(auth).then(() => {

          }).catch((error) => {
            navigate("/error")
          });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            //onAuthStageChanged is similar to the event listener
            if (user) {
              // If user signs in & also when user signs up to the website
              const { uid, email, displayName, photoURL } = user;
              dispatch(addUser({ uid: uid, email: email , displayName: displayName, photoURL: photoURL }))
              //above - adding these properties to the store
              navigate("/browse")

            } else {
              // User is signed out
              dispatch(removeUser())
              navigate("/")

            }
          });

          return () => unsubscribe;
          //Unsubscribe will be called when the component unmounts
          
    },[])

    return(
        <div className="absolute px-8 w-screen py-2 bg-gradient-to-b from-black z-10 flex justify-between" >
            <img className="w-44" src={Netflix_Logo} alt="Netflix Logo" />

            {user && (<div className="flex p-2">
                <img className="w-14" alt="usericon" src= {user?.photoURL} />
                <button className="text-white font-bold p-2" onClick={handleSignOut}>Sign Out</button>
            </div>)}
        </div>
        
    )
}

export default Header;