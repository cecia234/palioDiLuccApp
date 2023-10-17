
import HomeBody from '../components/home/homeBody';
import {AuthContext} from './_app'
import { useContext } from 'react';

export default function Home() {
    const userUid = useContext(AuthContext);

    if(userUid) {
      return <HomeBody userUid={userUid}></HomeBody>
    } else {
      return <h1>Loading...</h1>
  }
}
