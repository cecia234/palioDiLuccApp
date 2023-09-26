import useSWR from 'swr';
import { Stack } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

import Layout from "../components/layout";
import ReviewRequest from "../components/reviews/reviewRequest";


const reviews = [
    {
        user: "mario",
        name: "LA CUMMINA",
        icon: "💦",
        description: "Compra e bevi una bevanda discutibile con cummine dentro",
    },
    {
        user: "giovanni",
        name: "LA CUMMINA",
        icon: "💦",
        description: "Compra e bevi una bevanda discutibile con cummine dentro",
    },
    {
        user: "mara",
        name: "LA CUMMINA",
        icon: "💦",
        description: "Compra e bevi una bevanda discutibile con cummine dentro",
    },
    {
        user: "fra",
        name: "LA CUMMINA",
        icon: "💦",
        description: "Compra e bevi una bevanda discutibile con cummine dentro",
    },
]


const fetcher = (...args) => fetch(...[(args as any)]).then((res) => res.json())


export default function Reviews() {


    const lastAchievementFetch = useSWR('/api/achievements/requests', fetcher)

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
        <Layout>
            <h1>Hai le seguenti richieste di testimonianza</h1>
            <Stack gap={3}>
                {
                    reviewsRequests.map((item) => <ReviewRequest item={item}></ReviewRequest>)
                }
            </Stack>
        </Layout>
    </>
}