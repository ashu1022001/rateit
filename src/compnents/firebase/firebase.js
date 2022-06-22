import  firebase from 'firebase/app';
import {getFirestore} from "@firebase/firestore"
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyBOpl5dwx6zah1kLK5HzDAxy55DnS5twVY",
    authDomain: "rateit-5f983.firebaseapp.com",
    databaseURL: "https://rateit-5f983-default-rtdb.firebaseio.com",
    projectId: "rateit-5f983",
    storageBucket: "rateit-5f983.appspot.com",
    messagingSenderId: "512399821244",
    appId: "1:512399821244:web:cc125093064c1327da43b9",
    measurementId: "G-Q79CV2F3CC"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  const db = getFirestore(app);
  

 