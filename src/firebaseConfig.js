import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyBR7C25d19M7pK0SrGdELInh-pLP61u_H4",
  authDomain: "excelproject-9c2e3.firebaseapp.com",
  projectId: "excelproject-9c2e3",
  storageBucket: "excelproject-9c2e3.appspot.com",
  messagingSenderId: "123669142079",
  appId: "1:123669142079:web:a7bc34729852bef30af68a"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(app);

export {
  db,
  auth,
}

