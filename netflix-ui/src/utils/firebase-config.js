import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDTcUb7Nq8IidEfoX0HhADWnOg6JatcwIk",
  authDomain: "reac-netflix-clone.firebaseapp.com",
  projectId: "reac-netflix-clone",
  storageBucket: "reac-netflix-clone.appspot.com",
  messagingSenderId: "743359442964",
  appId: "1:743359442964:web:594f4f5c8f8ca21a2db701",
  measurementId: "G-B24D97SPQG"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
