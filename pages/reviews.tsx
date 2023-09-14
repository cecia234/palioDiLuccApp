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

export default function Reviews() {
    return <>
        <Layout>
            <h1>Hai le seguenti richieste di testimonianza</h1>
            <Stack gap={3}>
                {
                    reviews.map((item) => <ReviewRequest item={item}></ReviewRequest>)
                }
            </Stack>
        </Layout>
    </>
}