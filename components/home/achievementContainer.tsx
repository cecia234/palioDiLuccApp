import { IAchievement } from "../../pages/home";
import Achievement from "./achievement";
import styles from './achievementContainer.module.css';

export default function AchievementContainer({achievements, title}: {achievements: IAchievement[], title: string}) {
    return (
        <>
            <div className={styles.divcolor}>
            <h2> {title} </h2>
            {achievements.map((achievement: IAchievement) => {
                return <Achievement data = {achievement}></Achievement>
            })}
            </div>
        </>
    )
}