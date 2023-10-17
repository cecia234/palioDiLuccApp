import { auth } from '../../firebaseConfig'
import { IAchievement, IUser } from '../../lib/types';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetchUtils';
import { signOut } from 'firebase/auth';

import { Stack } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

import AddAchievementButton from "./addAchievementButton";
import AchievementContainer from "./achievementContainer";
import NewReviewAlert from "./newReviewAlert";


export default function HomeBody({userUid}) {          
    let userFetch = useSWR(`/api/users/${userUid}`, userUid? fetcher : () => {})
    const lastAchievementFetch = useSWR(`/api/achievements/lastCompleted/${userUid}`, userUid? fetcher : () => {})
    const nextAchievementFetch = useSWR(`/api/achievements/nextToComplete/${userUid}/9`, userUid? fetcher : () => {})
    let nextAchievementsToComplete: IAchievement[];
    let lastCompletedAchievements: IAchievement[];
    let user: IUser;
  
    lastCompletedAchievements = lastAchievementFetch?.data ? lastAchievementFetch.data.lastCompletedAchievements : [];
    nextAchievementsToComplete = nextAchievementFetch?.data ? nextAchievementFetch.data.nextAchievementsToComplete : [];
    user = userFetch?.data ? userFetch.data.user : {name: ''};
    const signOutFunc = () => {signOut(auth)};

    return <>
    <h1>Ciao {user.name}, ecco il tuo palio di Lucca finora</h1>
    <Stack gap={3}>
      <Button variant='danger' onClick={signOutFunc}>Logout</Button>
      <NewReviewAlert userUid={userUid}></NewReviewAlert>
      <AddAchievementButton></AddAchievementButton>
      <AchievementContainer key="lastCompleted" title="Ultimi Achievement completati" achievements={lastCompletedAchievements}></AchievementContainer>
      <AchievementContainer key="nextToComplete" title="Prossimi Achievement consigliati" achievements={nextAchievementsToComplete}></AchievementContainer>
    </Stack>
  </>
}