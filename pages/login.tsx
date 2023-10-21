
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router'


import { AuthContext } from "./_app";
import LoginBody from '../components/login/loginBody';


export default function Login() {
  const userUid = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (userUid) {
      router.push('/home')
    }
  }, [])


  return <LoginBody></LoginBody>

}