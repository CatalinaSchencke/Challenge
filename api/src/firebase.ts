import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-zVj1Cc4G97x8cYn3hraIMjS7q3UfaVM",
  authDomain: "luna-pets.firebaseapp.com",
  projectId: "luna-pets",
  storageBucket: "luna-pets.appspot.com",
  messagingSenderId: "1036864312768",
  appId: "1:1036864312768:web:3903da2b8a72f40ea92425"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
export  {db};