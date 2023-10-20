import useSWR from 'swr';
import { Accordion, Stack } from "react-bootstrap";

import { EAchievementStatus, IAchievement } from "../lib/types";
import styles from './achievementList.module.css'
import { useContext } from 'react';
import { AuthContext } from './_app';
import NavigationBar from '../components/navbar';


let achievements = {} as any;    
let user;
let sectionedAchievements = {}
const fetcher = (...args) => fetch(...[(args as any)]).then((res) => res.json())

export default function AchievementList() {
    const uid = useContext(AuthContext);
    const achievementList = useSWR('/api/achievements/all/'+uid, fetcher)
    let userFetch = useSWR(`/api/users/${uid}/infos`, uid ? fetcher : () => {})


    if (achievementList.data) {
        achievements = groupBy(achievementList.data.achievements, (achievement) => achievement.section)

        sectionedAchievements['Viaggio 🚗️'] =achievements.viaggio;
        sectionedAchievements['Fiera🎪️'] =achievements.fiera;
        sectionedAchievements['Appartamento 🏡️'] =achievements.appartamento;
    } else {
        return <h1>Loading...</h1>
    }

    if(userFetch.data) {
        user = userFetch.data.user;
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
                                <div className={styles.stampContainer}>
                                    <div className={styles.stampPlaceholderContainer}>
                                        <img src='/images/TIMBROLUCCA.svg' className={styles.stampPlaceholder}></img>
                                    </div>
                                    {
                                    (  item.status === EAchievementStatus.DONE ?

                                    <img src='/images/TIMBROLUCCA.svg' id={`stamp-${item.name.replaceAll(' ', '-')}`} className={styles.stamp}></img>
                                    :
                                    '')
                                    }
                                    <style>{`
                                        #${`stamp-${item.name.replaceAll(' ', '-')}`} {
                                            transform: rotate(${getStampUniqueRotation(user.username, item.name)}deg);
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

function getStampUniqueRotation(username: string, achievementName: string) {
    const codedUsername = getTotalCharCode(username);
    const codedAch = getTotalCharCode(achievementName);

    return codedUsername + codedAch;
}

function getTotalCharCode(s: string): number{
    let charCodeArr = [];
    
    for(let i = 0; i < s.length; i++){
        let code = s.charCodeAt(i);
        charCodeArr.push(code);
    }
    
    return charCodeArr.reduce((partialSum, a) => partialSum + a, 0);
}