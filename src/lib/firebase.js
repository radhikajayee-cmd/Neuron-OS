import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAIDozt77NoHXnZKsVjIRw-Hpj1fzW4v1o",
    authDomain: "neuronos-2e60c.firebaseapp.com",
    projectId: "neuronos-2e60c",
    storageBucket: "neuronos-2e60c.firebasestorage.app",
    messagingSenderId: "1087034076045",
    appId: "1:1087034076045:web:446e90249e6f2a4ac76bc4",
    measurementId: "G-C1BP38JF9L"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);