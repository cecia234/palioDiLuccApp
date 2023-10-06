import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDVkPc1frrVWTv5SaTEaFFNbbkElsZz0Y",
  authDomain: "paliodiluccapp.firebaseapp.com",
  projectId: "paliodiluccapp",
  storageBucket: "paliodiluccapp.appspot.com",
  messagingSenderId: "22055438778",
  appId: "1:22055438778:web:f60b7cc857eb94e6747583"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;