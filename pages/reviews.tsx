import useSWR from 'swr';
import { Stack } from "react-bootstrap";

import ReviewRequest from "../components/reviews/reviewRequest";


const fetcher = (...args) => fetch(...[(args as any)]).then((res) => res.json())


export default function Reviews() {


    const lastAchievementFetch = useSWR('/api/achievements/requests/pending', fetcher)

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
                reviewsRequests.map((item) => <ReviewRequest item={item}></ReviewRequest>)
            }
        </Stack>
    </>
}