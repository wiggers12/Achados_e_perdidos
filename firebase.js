// firebase.js

// Importa e inicializa o Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// CONFIGURAÇÃO DO FIREBASE
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_PROJECT_ID.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Login
export async function login(email, senha) {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, senha);
    return cred.user;
  } catch (error) {
    throw error;
  }
}

// Cadastro
export async function cadastrar(email, senha) {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, senha);
    await setDoc(doc(db, "usuarios", cred.user.uid), {
      saldo: 100.00
    });
    return cred.user;
  } catch (error) {
    throw error;
  }
}

// Ver saldo
export async function buscarSaldo(uid) {
  const ref = doc(db, "usuarios", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data().saldo : 0;
}

// Atualizar saldo
export async function atualizarSaldo(uid, novoSaldo) {
  const ref = doc(db, "usuarios", uid);
  await updateDoc(ref, { saldo: novoSaldo });
}

// Logout
export async function sair() {
  await signOut(auth);
}