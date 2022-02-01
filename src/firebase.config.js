import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQNF4-3d1SZwyrLRk5N4b7-175pjT2BO8",
  authDomain: "house-marketplace-app-706c3.firebaseapp.com",
  projectId: "house-marketplace-app-706c3",
  storageBucket: "house-marketplace-app-706c3.appspot.com",
  messagingSenderId: "629576441165",
  appId: "1:629576441165:web:00bf7856ed4f6c6e49ab04",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
