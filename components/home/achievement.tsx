import Stack from 'react-bootstrap/Stack';

import { IAchievement } from "../../pages/home";
import styles from './achievement.module.css';
import {useState} from 'react';
import ViewAchievementModal from './viewAchievementModal';

export default function Achievement({ data }: { data: IAchievement }) {
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            <Stack onClick={() => setModalShow(true)}>
                <h2 className={styles.icon}>{data.icon}</h2>
                <p className={styles.name}>{data.name}</p>
            </Stack>
            
            <ViewAchievementModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                data = {data}
            />
        </>
    )
}