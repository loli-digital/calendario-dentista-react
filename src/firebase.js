import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "clinica-dental-navarro-54354.firebaseapp.com",
  projectId: "clinica-dental-navarro-54354",
  storageBucket: "clinica-dental-navarro-54354.firebasestorage.app",
  messagingSenderId: "459444134687",
  appId: "1:459444134687:web:e8d817c2ea31228ccf462a"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);