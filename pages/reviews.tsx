import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from 'next/router'
import useSWR, { mutate } from 'swr';
import { useEffect, useState } from 'react';
import { Stack } from "react-bootstrap";

import { auth } from '../firebaseConfig'
import ReviewRequest from "../components/reviews/reviewRequest";


const fetcher = (...args) => fetch(...[(args as any)]).then((res) => res.json())


export default function Reviews() {
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


    const lastAchievementFetch = useSWR(`/api/achievements/requests/pending/${userUid}`, fetcher, { refreshInterval: 1000 })

    let reviewsRequests = lastAchievementFetch.data ? lastAchievementFetch.data.requests : [];
    reviewsRequests = reviewsRequests.map((item) => {
        return {
            user: item.requesting_user,
            name: item.achievement_achievement_request_achievementToachievement.name,
            icon: item.achievement_achievement_request_achievementToachievement.icon,
            description: item.achievement_achievement_request_achievementToachievement.description
        }
    })

    return <>
        <h1>Hai le seguenti richieste di testimonianza</h1>
        <Stack gap={3}>
            {
                reviewsRequests.map((item) => <ReviewRequest uid={userUid} item={item}></ReviewRequest>)
            }
        </Stack>
    </>
}