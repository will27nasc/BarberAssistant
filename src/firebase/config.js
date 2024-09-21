import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDCawrPmZbwSA_3Ie760xvbPtDxAMETGLo",
    authDomain: "barberassistant-9f4f5.firebaseapp.com",
    projectId: "barberassistant-9f4f5",
    storageBucket: "barberassistant-9f4f5.appspot.com",
    messagingSenderId: "29776865886",
    appId: "1:29776865886:web:a908af7da6db4a0f7962cf",
    measurementId: "G-N9RXV57S7M"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };