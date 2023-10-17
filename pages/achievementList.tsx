import useSWR from 'swr';
import { Accordion, Stack } from "react-bootstrap";

import { EAchievementStatus, IAchievement } from "../lib/types";
import styles from './achievementList.module.css'
import { useContext } from 'react';
import { AuthContext } from './_app';


let achievements = {} as any;
let sectionedAchievements = {}
const fetcher = (...args) => fetch(...[(args as any)]).then((res) => res.json())

export default function AchievementList() {
    const uid = useContext(AuthContext);
    const achievementList = useSWR('/api/achievements/all/'+uid, fetcher)

    if (achievementList.data) {
        achievements = groupBy(achievementList.data.achievements, (achievement) => achievement.section)

        sectionedAchievements['Viaggio 🚗️'] =achievements.viaggio;
        sectionedAchievements['Fiera🎪️'] =achievements.fiera;
        sectionedAchievements['Appartamento 🏡️'] =achievements.appartamento;
    } else {
        return <h1>Loading...</h1>
    }

    return <>
        <h1>Lista achievements</h1>
        <Accordion defaultActiveKey={['Viaggio 🚗️', 'Fiera🎪️', 'Appartamento 🏡️']}>
            {
                Object.keys(sectionedAchievements).map((sectionName) => {
                    const section = sectionedAchievements[sectionName];
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
                    
                    return <Accordion.Item eventKey={sectionName}>
                        <Accordion.Header><b>{sectionName}</b></Accordion.Header>
                        <Accordion.Body>
                            {sectionElements}
                        </Accordion.Body>
                    </Accordion.Item>
            })
            }

        </Accordion>
    </>
}

const groupBy = (x,f)=>x.reduce((a,b,i)=>((a[f(b,i,x)]||=[]).push(b),a),{});