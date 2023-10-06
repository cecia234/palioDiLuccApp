import useSWR from 'swr';
import Layout from "../components/layout";
import AddAchievementButton from "../components/home/addAchievementButton";
import AchievementContainer from "../components/home/achievementContainer";
import { Stack } from "react-bootstrap";
import NewReviewAlert from "../components/home/newReviewAlert";
import { IAchievement, IUser } from '../lib/types';
import {useEffect} from 'react';
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../firebaseConfig'


const fetcher = (...args) => fetch(...[(args as any)]).then((res) => res.json())

export default function Home() {
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              // ...
              console.log("uid", uid)
            } else {
              // User is signed out
              // ...
              console.log("user is logged out")
            }
          });
         
    }, [])
    let userFetch = useSWR('/api/users/current', fetcher)
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
        <Layout>
            <h1>Ciao {user.name}, ecco il tuo palio di Lucca finora</h1>
            <Stack gap={3}>
                {newRequests ? <NewReviewAlert newRequests={newRequests}></NewReviewAlert> : ''}
                <AddAchievementButton achievementsToComplete={nextAchievementsToComplete}></AddAchievementButton>
                <AchievementContainer title="Ultimi Achievement completati" achievements={lastCompletedAchievements}></AchievementContainer>
                <AchievementContainer title="Prossimi Achievement consigliati" achievements={nextAchievementsToComplete}></AchievementContainer>
            </Stack>
        </Layout>
    </>
}