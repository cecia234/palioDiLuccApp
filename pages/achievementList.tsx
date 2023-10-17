import useSWR from 'swr';
import { Stack } from "react-bootstrap";

import { EAchievementStatus, IAchievement } from "../lib/types";
import styles from './achievementList.module.css'
import { useContext } from 'react';
import { AuthContext } from './_app';


let achievements = []
const fetcher = (...args) => fetch(...[(args as any)]).then((res) => res.json())

export default function AchievementList() {
    const uid = useContext(AuthContext);
    const achievementList = useSWR('/api/achievements/all/'+uid, fetcher)

    if (achievementList.data) {
        achievements = groupBy(achievementList.data.achievements, (achievement) => achievement.section)
    } else {
        return <h1>Loading...</h1>
    }

    return <>
        <h1>Lista achievements</h1>
        <Stack gap={3}>
            {
                Object.keys(achievements).map((sectionName) => {
                    const section = achievements[sectionName];
                    const sectionElements = section.map((item) => {
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
                    
                    return <div key={sectionName}>
                        <h2>{sectionName}</h2>
                        <hr></hr>
                        {sectionElements}
                    </div>
            })
            }
        </Stack>
    </>
}

const groupBy = (x,f)=>x.reduce((a,b,i)=>((a[f(b,i,x)]||=[]).push(b),a),{});