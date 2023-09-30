import Button from 'react-bootstrap/Button';
import styles from './addAchievementButton.module.css';
import { useState } from 'react';
import AddAchievementModal from './addAchievementModal';
import { IUser, IAchievement } from '../../lib/types';

export default function AddAchievementButton({ achievementsToComplete, users }: { achievementsToComplete: IAchievement[], users: IUser[] }) {
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            <Button onClick={() => setModalShow(true)} className={styles.addAchievementButton} variant="primary" size="lg">
                Aggiungi achievement
            </Button>

            <AddAchievementModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                achievementsToComplete={achievementsToComplete}
                users ={users}
            />
        </>
    )
}
