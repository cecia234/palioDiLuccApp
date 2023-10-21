
import { useRouter } from 'next/router';
import HomeBody from '../components/home/homeBody';
import { AuthContext } from './_app'
import { useContext, useEffect } from 'react';

export default function Home() {
  const userUid = useContext(AuthContext);

  const router = useRouter();
  useEffect(() => {
    if (!userUid) {
      router.push('/login')
    }
  }, [])

  return <HomeBody userUid={userUid}></HomeBody>;
}
