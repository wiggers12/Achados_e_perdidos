// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBKlVI23YoxRb1fntQKy-ZfkzaDM-MWsSQ",
  authDomain: "doce-sabor-caseiro.firebaseapp.com",
  projectId: "doce-sabor-caseiro",
  storageBucket: "doce-sabor-caseiro.appspot.com",
  messagingSenderId: "414062499771",
  appId: "1:414062499771:web:1a811377bc6bbf145f969e",
  measurementId: "G-KMC0FC7Z4H"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Exportações
export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
};