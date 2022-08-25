// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDg5zPl3VLRlpc5DT8YAuo9MyDquSyiMQQ",
  authDomain: "my-portfolio-97058.firebaseapp.com",
  projectId: "my-portfolio-97058",
  storageBucket: "my-portfolio-97058.appspot.com",
  messagingSenderId: "859032155976",
  appId: "1:859032155976:web:11a68d89b05ce15b99e57d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
