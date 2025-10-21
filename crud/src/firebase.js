import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBwjLR5lfrthaxMi7TVmUL4YtIuP4EdwOY",
    authDomain: "myapp-crud-d63be.firebaseapp.com",
    projectId: "myapp-crud-d63be",
    storageBucket: "myapp-crud-d63be.firebasestorage.app",
    messagingSenderId: "741129455003",
    appId: "1:741129455003:web:b9528fb04500687ef60d3e"
  };

  
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);