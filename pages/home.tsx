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
import { fetcher } from '../utils/fetchUtils';

export default function Home() {
  const router = useRouter();
  const [userUid, setUser] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid)
      } else {
        console.log("user is logged out")
        router.push('/login')
      }
    });
  }, [])

  let userFetch = useSWR(`/api/users/${userUid}`, fetcher)
  const lastAchievementFetch = useSWR(`/api/achievements/lastCompleted/${userUid}`, fetcher)
  const nextAchievementFetch = useSWR(`/api/achievements/nextToComplete/${userUid}/9`, fetcher)
  let nextAchievementsToComplete: IAchievement[];
  let lastCompletedAchievements: IAchievement[];
  let user: IUser;

  lastCompletedAchievements = lastAchievementFetch?.data ? lastAchievementFetch.data.lastCompletedAchievements : [];
  nextAchievementsToComplete = nextAchievementFetch?.data ? nextAchievementFetch.data.nextAchievementsToComplete : [];
  user = userFetch?.data ? userFetch.data.user : '';

  return <>
    <h1>Ciao {user.name}, ecco il tuo palio di Lucca finora</h1>
    <Stack gap={3}>
      <Button variant='danger' onClick={() => signOut(auth)}>Logout</Button>
      <NewReviewAlert></NewReviewAlert>
      <AddAchievementButton></AddAchievementButton>
      <AchievementContainer title="Ultimi Achievement completati" achievements={lastCompletedAchievements}></AchievementContainer>
      <AchievementContainer title="Prossimi Achievement consigliati" achievements={nextAchievementsToComplete}></AchievementContainer>
    </Stack>
  </>
}
