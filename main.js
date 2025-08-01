import { auth, db } from './firebase.js';
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { doc, getDoc, updateDoc, setDoc } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

let userUID = null;
let modoAtual = 'real';
let saldoReal = 0;
let saldoDemo = 0;

// Atualiza o saldo e botões no topo da tela
function atualizarUI() {
  document.getElementById("saldo").innerText = (modoAtual === 'real' ? saldoReal : saldoDemo).toFixed(2);
  document.getElementById("btnReal").className = modoAtual === 'real' ? "ativo" : "inativo";
  document.getElementById("btnDemo").className = modoAtual === 'demo' ? "ativo" : "inativo";
}

// Trocar entre conta real e demo
window.mudarModo = function(novoModo) {
  modoAtual = novoModo;
  atualizarUI();
};

// Obter saldo atual com base no modo
window.getSaldoAtual = () => (modoAtual === 'real' ? saldoReal : saldoDemo);

// Atualizar saldo no Firestore
window.setSaldoAtual = async (novoSaldo) => {
  const ref = doc(db, "usuarios", userUID);
  if (modoAtual === 'real') {
    saldoReal = novoSaldo;
    await updateDoc(ref, { saldoReal });
  } else {
    saldoDemo = novoSaldo;
    await updateDoc(ref, { saldoDemo });
  }
  atualizarUI();
};

// Logout
window.logout = () => signOut(auth).then(() => location.href = "auth.html");

// Verifica usuário logado e carrega dados
onAuthStateChanged(auth, async (user) => {
  if (!user) return location.href = "auth.html";
  userUID = user.uid;

  const ref = doc(db, "usuarios", userUID);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    const data = snap.data();
    saldoReal = data.saldoReal ?? 0;
    saldoDemo = data.saldoDemo ?? 0;
    atualizarUI();
  } else {
    await setDoc(ref, { saldoReal: 100, saldoDemo: 100 });
    saldoReal = 100;
    saldoDemo = 100;
    atualizarUI();
  }
});