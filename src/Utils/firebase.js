// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSVwEjRl-MaBzSagINDAJsnvK-DbGiuM8",
  authDomain: "netflix-gpt-a620a.firebaseapp.com",
  projectId: "netflix-gpt-a620a",
  storageBucket: "netflix-gpt-a620a.appspot.com",
  messagingSenderId: "328023325259",
  appId: "1:328023325259:web:795595ae652d0403e3ebce",
  measurementId: "G-FZDNZNWVY2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
setPersistence(auth, browserSessionPersistence);

export { auth };
