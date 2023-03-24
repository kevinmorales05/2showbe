// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase-admin/app";
import { getAnalytics } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCi_OeKYuWFLM93s3Jwv53yeL-doTM-sos",
  authDomain: "showapp-fbe93.firebaseapp.com",
  projectId: "showapp-fbe93",
  storageBucket: "showapp-fbe93.appspot.com",
  messagingSenderId: "561395922301",
  appId: "1:561395922301:web:b8b86ec6e9de7cc5ecc814",
  measurementId: "G-2LJW8PMTZ2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
//initialize Firebase messaging
export const messaging = getMessaging(app);