// main.js
import { auth } from './firebase.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import { signOut } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';

const db = getFirestore();
let modoAtual = 'real';

onAuthStateChanged(auth, user => {
  if (user) atualizarSaldo();
});

function mudarModo(modo) {
  modoAtual = modo;
  document.getElementById('btnReal').className = modo === 'real' ? 'ativo' : 'inativo';
  document.getElementById('btnDemo').className = modo === 'demo' ? 'ativo' : 'inativo';
  atualizarSaldo();
}

function atualizarSaldo() {
  const user = auth.currentUser;
  if (!user) return;
  const userRef = doc(db, "usuarios", user.uid);
  getDoc(userRef).then(docSnap => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      const saldo = modoAtual === 'real' ? data.saldoreal : data.saldodemo;
      document.getElementById('saldo').innerText = saldo.toFixed(2);
    }
  });
}

function logout() {
  signOut(auth).then(() => {
    window.location.href = "auth.html";
  });
}

function setValor(inputId, valor) {
  document.getElementById(inputId).value = valor;
}

function apostar(id) {
  const valor = parseFloat(document.getElementById(`aposta${id}`).value);
  const auto = parseFloat(document.getElementById(`auto${id}`).value);
  alert(`Aposta ${id} registrada com R$${valor.toFixed(2)} | Auto cash-out em ${auto}x (${modoAtual})`);
}

function depositar() {
  alert("Simulação de depósito no modo: " + modoAtual);
}

function sacar() {
  alert("Simulação de saque no modo: " + modoAtual);
}

window.logout = logout;
window.setValor = setValor;
window.apostar = apostar;
window.depositar = depositar;
window.sacar = sacar;
window.mudarModo = mudarModo;