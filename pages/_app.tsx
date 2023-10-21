import '../styles/global.css';
import 'bootstrap/dist/css/bootstrap.css'
import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebaseConfig'
import { onAuthStateChanged } from "firebase/auth";

import Layout from '../components/layout';


export const AuthContext = createContext(null);

export default function App({ Component, pageProps }) {
  const [userUid, setUser] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.uid) {
        setUser(user.uid);
      } else {
        setUser(null)
      }
    });
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => console.log('scope is: ', registration.scope));
    }
  }, [])

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || defaultLayout

  return <AuthContext.Provider value={userUid}>
    {getLayout(<Component {...pageProps} />)}
  </AuthContext.Provider>
}

function defaultLayout(page) {
  return <Layout>{page}</Layout>
}