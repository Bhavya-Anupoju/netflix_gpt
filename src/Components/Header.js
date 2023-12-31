import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../Utils/Userslice";
import { useEffect } from "react";
import { Netflix_Logo, SUPPORTED_CONSTANTS } from "../Utils/constants";
import { toggleGptSearchView } from "../Utils/gptSlice";
import { changeLanguage } from "../Utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const gpt = useSelector((store) => store.gpt.showGptSearch);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      //onAuthStageChanged is similar to the event listener
      if (user) {
        // If user signs in & also when user signs up to the website
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        //above - adding these properties to the store
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe;
    //Unsubscribe will be called when the component unmounts
  }, [dispatch, navigate]);

  const handleGptSearch = () => {
    //Toggle GPT Functionality
    dispatch(toggleGptSearchView());
  };

  const handlelanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="absolute px-8 w-screen py-2 bg-gradient-to-b from-black flex flex-col md:flex-row z-10  justify-between">
      <img
        className="w-44 mx-auto md:mx-0"
        src={Netflix_Logo}
        alt="Netflix Logo"
      />

      {user && (
        <div className="flex p-2 justify-between">
          {gpt && (
            <select
              className="bg-gray-900 rounded p-2 m-2 text-white"
              onChange={handlelanguageChange}
            >
              {SUPPORTED_CONSTANTS.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-2 px-4 mx-4 my-2 bg-red-700 text-white rounded"
            onClick={handleGptSearch}
          >
            {gpt ? "Homepage" : "GPT Search"}
          </button>
          <img
            className="hidden md:block w-12 h-12"
            alt="usericon"
            src={user.photoURL}
          />
          <button className="text-white font-bold p-2" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
