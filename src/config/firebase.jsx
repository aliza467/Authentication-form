// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzmZDHPuY1wOYrld9WfwI2oN4-0jYkU50",
  authDomain: "form-auth-1e981.firebaseapp.com",
  projectId: "form-auth-1e981",
  storageBucket: "form-auth-1e981.appspot.com",
  messagingSenderId: "23107245856",
  appId: "1:23107245856:web:f2f492d8d006e2f5cd2945"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;