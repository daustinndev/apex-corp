import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB673NL6AALvGh874Tax9JrVTk5ScdTMNM",
  authDomain: "apexcorp-74590.firebaseapp.com",
  projectId: "apexcorp-74590",
  storageBucket: "apexcorp-74590.appspot.com",
  messagingSenderId: "920080956167",
  appId: "1:920080956167:web:b8bb7b35237f7f6b5223a2"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
const db = getFirestore(app);
export {db}