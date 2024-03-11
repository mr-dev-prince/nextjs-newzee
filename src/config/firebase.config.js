import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDgTeWlHC43eEzllBhCNrR8_G8c1RJjKGA",
  authDomain: "newzee-26edd.firebaseapp.com",
  projectId: "newzee-26edd",
  storageBucket: "newzee-26edd.appspot.com",
  messagingSenderId: "677534222461",
  appId: "1:677534222461:web:86512046553c974d630914",
  measurementId: "G-T17PMDWB9N",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
