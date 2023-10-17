import useSWR from 'swr';
import { Accordion, Stack } from "react-bootstrap";

import { EAchievementStatus, IAchievement } from "../lib/types";
import styles from './achievementList.module.css'
import { useContext } from 'react';
import { AuthContext } from './_app';
import Layout from '../components/layout';
import NavigationBar from '../components/navbar';


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
        <Accordion defaultActiveKey={['Viaggio 🚗️', 'Fiera🎪️', 'Appartamento 🏡️']} >
            {
                Object.keys(sectionedAchievements).map((sectionName) => {
                    const section = sectionedAchievements[sectionName];
                    const sectionElements = section.map((item) => {
                        const element = (
                            <div className={item.status === EAchievementStatus.DONE ? styles.done : styles.undone}>
                                <div>
                                    <p>
                                        {item.icon} <b>{item.name}</b> {item.status === EAchievementStatus.DONE ? '✅' : ''}
                                    </p>
                                    <p><i>{item.description}</i></p>
                                </div>
                                <div className={styles.imageContainer}>
                                <img src='/images/TIMBROLUCCA.svg' className={styles.imageUndone}></img>
                                {
                                  (  item.status === EAchievementStatus.DONE ?

                                <img src='/images/TIMBROLUCCA.svg' id={`stamp-${item.name.replaceAll(' ', '-')}`} className={styles.stamp}></img>
                                :
                                '')
                                }
                                 <style>{`
                                    #${`stamp-${item.name.replaceAll(' ', '-')}`} {
                                        transform: rotate(${Math.random()*100}deg);
                                    }
                                `}</style>
                                </div>
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

AchievementList.getLayout = function getLayout(page) {
    return (
        <>
        <NavigationBar simplified={false}></NavigationBar>
        <div className={styles.accordion}>{page}</div>
      </>
    )
  }