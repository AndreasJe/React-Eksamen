// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
import { getAnalytics } from "node_modules/firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAqWRKUJZlh1-T8bUJVmaqW-E8chcZywc",
  authDomain: "react-first-41bb5.firebaseapp.com",
  databaseURL:
    "https://react-first-41bb5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-first-41bb5",
  storageBucket: "react-first-41bb5.appspot.com",
  messagingSenderId: "130794024310",
  appId: "1:130794024310:web:387cab054cbef3ab18de57",
  measurementId: "G-3RY0Q5SGLE",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
