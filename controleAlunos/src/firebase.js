
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAn33I5sQCdw36w52S8sjgs7uvf6AxeWr8",
  authDomain: "controlealunos-eeaf4.firebaseapp.com",
  projectId: "controlealunos-eeaf4",
  storageBucket: "controlealunos-eeaf4.firebasestorage.app",
  messagingSenderId: "306377349123",
  appId: "1:306377349123:web:4ac045e0bcace37a7b9636",
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const storage = getStorage(app);
