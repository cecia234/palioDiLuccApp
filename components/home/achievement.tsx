import { IAchievement } from "../../pages/home";
import Stack from 'react-bootstrap/Stack';
import styles from './achievement.module.css';

export default function Achievement({data}: {data: IAchievement}) {
    return (
        <>
            <Stack>
                <p className={styles.icon}>{data.icon}</p>
                <p className={styles.name}>{data.name}</p>
            </Stack>
        </>
    )
}