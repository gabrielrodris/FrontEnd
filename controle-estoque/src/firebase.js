import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9jtcA-ib5HsgCWqb9oIFfwVrHgfFuuVg",
  authDomain: "controle-estoque-17294.firebaseapp.com",
  projectId: "controle-estoque-17294",
  storageBucket: "controle-estoque-17294.firebasestorage.app",
  messagingSenderId: "187670465997",
  appId: "1:187670465997:web:4bd26fa53a30d5f8298884",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
