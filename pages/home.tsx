import { auth } from '../firebaseConfig'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { IAchievement, IUser } from '../lib/types';
import { useRouter } from 'next/router'
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { Stack } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

import AddAchievementButton from "../components/home/addAchievementButton";
import AchievementContainer from "../components/home/achievementContainer";
import NewReviewAlert from "../components/home/newReviewAlert";


const fetcher = (...args) => fetch(...[(args as any)]).then((res) => res.json())

export default function Home() {
  const router = useRouter();
  const [userUid, setUser] = useState('');
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUser(uid)
        // ...
        console.log("uid", uid)
      } else {
        // User is signed out
        // ...
        console.log("user is logged out")
        router.push('/login')

      }
    });

  }, [])
  let userFetch = useSWR(`/api/users/${userUid}`, fetcher)
  const lastAchievementFetch = useSWR('/api/achievements/lastCompleted', fetcher)
  const nextAchievementFetch = useSWR('/api/achievements/nextToComplete/9', fetcher)
  const numRequestsFetch = useSWR('/api/achievements/numRequests', fetcher)
  let nextAchievementsToComplete: IAchievement[];
  let lastCompletedAchievements: IAchievement[];
  let user: IUser;

  let newRequests: number;

  nextAchievementsToComplete = nextAchievementFetch.data ? nextAchievementFetch.data.nextAchievementsToComplete : [];
  lastCompletedAchievements = lastAchievementFetch.data ? lastAchievementFetch.data.lastCompletedAchievements : [];
  user = userFetch.data ? userFetch.data.user : '';
  newRequests = numRequestsFetch.data ? numRequestsFetch.data.numRequests : 0;

  return <>
    <h1>Ciao {user.name}, ecco il tuo palio di Lucca finora</h1>
    <Stack gap={3}>
      <Button variant='danger' onClick={logout}>Logout</Button>
      {newRequests ? <NewReviewAlert newRequests={newRequests}></NewReviewAlert> : ''}
      <AddAchievementButton achievementsToComplete={nextAchievementsToComplete}></AddAchievementButton>
      <AchievementContainer title="Ultimi Achievement completati" achievements={lastCompletedAchievements}></AchievementContainer>
      <AchievementContainer title="Prossimi Achievement consigliati" achievements={nextAchievementsToComplete}></AchievementContainer>
    </Stack>
  </>
}

function logout() {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });

}