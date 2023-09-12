import Layout from "../components/layout";
import AddAchievementButton from "../components/home/addAchievementButton";
import AchievementContainer from "../components/home/achievementContainer";
import { Stack } from "react-bootstrap";

export interface IAchievement {
    name: string,
    icon: string
}

const lastCompletedAchievements: IAchievement[] = [
    {
        name: "Cura Paliativa",
        icon: "☕"
    },
    {
        name: "Il cacco",
        icon: "💩"
    },
    {
        name: "Lo spisno",
        icon: "💧"
    },
    {
        name: "Cura Paliativa2",
        icon: "☕"
    },
    {
        name: "Il cacco2",
        icon: "💩"
    },
    {
        name: "Lo spisno2",
        icon: "💧"
    },
    {
        name: "Cura Paliativa3",
        icon: "☕"
    },
    {
        name: "Il cacco3",
        icon: "💩"
    },
    {
        name: "Lo spisno3",
        icon: "💧"
    },
];

const nextAchievementsToComplete: IAchievement[] = [
    {
        name: "Ferma al lucca comics?",
        icon: "🤔"
    },
    {
        name: "Sceicco",
        icon: "🧔🏿‍♂️"
    },
    {
        name: "Zar",
        icon: "🙅🏻‍♂️"
    },
    {
        name: "Ferma al lucca comics? 2",
        icon: "🤔"
    },
    {
        name: "Sceicco 2",
        icon: "🧔🏿‍♂️"
    },
    {
        name: "Zar 2",
        icon: "🙅🏻‍♂️"
    },
    {
        name: "Ferma al lucca comics? 3",
        icon: "🤔"
    },
    {
        name: "Sceicco 3",
        icon: "🧔🏿‍♂️"
    },
    {
        name: "Zar 3",
        icon: "🙅🏻‍♂️"
    },
];

export default function Home() {
    return <>
        <Layout>
            <h1>Il tuo palio di Lucca finora</h1>
            <Stack gap={3}>
            <AddAchievementButton></AddAchievementButton>
            <AchievementContainer title = "Ultimi Achievement completati" achievements={lastCompletedAchievements}></AchievementContainer>
            <AchievementContainer title = "Prossimi Achievement consigliati" achievements={nextAchievementsToComplete}></AchievementContainer>
            </Stack>
        </Layout>
    </>
}