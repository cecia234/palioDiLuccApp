import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
// configuration
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
