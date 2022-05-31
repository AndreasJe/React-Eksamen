// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(firebaseApp);
const db = getFirestore(app);

export default firebaseConfig;
