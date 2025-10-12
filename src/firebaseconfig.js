import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ConnectUs Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCplBdL7IrJ_NBAXf6WNm_RxGELuMPqUVo",
  authDomain: "connectus-8e637.firebaseapp.com",
  projectId: "connectus-8e637",
  storageBucket: "connectus-8e637.firebasestorage.app",
  messagingSenderId: "605783315041",
  appId: "1:605783315041:web:5b07a1a79edad7c237d020"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);