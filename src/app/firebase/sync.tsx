import { initializeApp } from "firebase/app";
import { getAuth, signOut as firebaseSignOut } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB0ZQLHtgUbWuyBwIGvloO-7Jx_RRl0axw",
  authDomain: "facility-management-2f7b8.firebaseapp.com",
  projectId: "facility-management-2f7b8",
  storageBucket: "facility-management-2f7b8.appspot.com",
  messagingSenderId: "682163158674",
  appId: "1:682163158674:web:9d78e49750249b16edb04b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, firebaseSignOut as signOut, db, storage };
