import useSWR from 'swr';
import { Stack } from "react-bootstrap";

import { EAchievementStatus, IAchievement } from "../lib/types";
import styles from './achievementList.module.css'


let achievements = []
const fetcher = (...args) => fetch(...[(args as any)]).then((res) => res.json())

export default function AchievementList() {
    const achievementList = useSWR('/api/achievements/all', fetcher)

    if (achievementList.data) {
        achievements = achievementList.data.achievements
    } else {
        return <h1>Loading...</h1>
    }

    return <>
        <h1>Lista achievements</h1>
        <Stack gap={3}>
            {
                achievements.map((item) => {
                    const element = (
                        <div className={item.status === EAchievementStatus.DONE ? styles.done : styles.undone}>
                            <p>
                                {item.icon} <b>{item.name}</b> {item.status === EAchievementStatus.DONE ? '✅' : ''}
                            </p>
                            <p><i>{item.description}</i></p>
                        </div>
                    )

                    return element

                })
            }
        </Stack>
    </>
}