// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbTcbHndXe0yYTB5wCWpFJFfNl5AZObCE",
  authDomain: "resumee-363ae.firebaseapp.com",
  projectId: "resumee-363ae",
  storageBucket: "resumee-363ae.appspot.com",
  messagingSenderId: "901002296662",
  appId: "1:901002296662:web:83d28dfa8292161d322af7",
  measurementId: "G-WJ55HZZC6L",
};

console.log("All Environment Variables:", process.env);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
