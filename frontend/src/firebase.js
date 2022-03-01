import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9viCgjtWbQ7BJJWDB04OHY3scxZBUrxI",
  authDomain: "fortune168-70129.firebaseapp.com",
  databaseURL:
    "https://fortune168-70129-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fortune168-70129",
  storageBucket: "fortune168-70129.appspot.com",
  messagingSenderId: "858593391797",
  appId: "1:858593391797:web:69ec53731a5c074ffabafc",
  measurementId: "G-ZJKY31T1YF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default getFirestore();
