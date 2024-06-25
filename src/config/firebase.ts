// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7lYILV4lkuy-yVl4PTywouo1EDZbDQug",
  authDomain: "reactfirebaseproj-ba4af.firebaseapp.com",
  projectId: "reactfirebaseproj-ba4af",
  storageBucket: "reactfirebaseproj-ba4af.appspot.com",
  messagingSenderId: "842331348022",
  appId: "1:842331348022:web:5bf02f17fc975f18f04c97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)