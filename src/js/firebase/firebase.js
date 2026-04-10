import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBn2vSv9yPkU1DNPEeHbbuLu2qgMx98aOw",
  authDomain: "nuts-a589d.firebaseapp.com",
  projectId: "nuts-a589d",
  storageBucket: "nuts-a589d.firebasestorage.app",
  messagingSenderId: "666191332276",
  appId: "1:666191332276:web:066e8563a4ae98d86128e1",
  measurementId: "G-HX33EXRV9Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
const db = getFirestore(app);

export { db, auth, storage };

