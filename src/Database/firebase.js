// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGeogWLh89gi93m-2bY6_59fYcS3H8ceA",
  authDomain: "excellentstaff-25cfc.firebaseapp.com",
  projectId: "excellentstaff-25cfc",
  storageBucket: "excellentstaff-25cfc.appspot.com",
  messagingSenderId: "921923981278",
  appId: "1:921923981278:web:6479585d1aa1862a75574f",
  measurementId: "G-SQCCPWC3SM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const Database = getFirestore(app);

export {auth,Database}