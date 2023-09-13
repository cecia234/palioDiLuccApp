import Button from 'react-bootstrap/Button';
import styles from './addAchievementButton.module.css';
import { IAchievement } from '../../pages/home';
import { useState } from 'react';
import AddAchievementModal from './addAchievementModal';

export default function AddAchievementButton({ achievementsToComplete }: { achievementsToComplete: IAchievement[] }) {
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
            />
        </>
    )
}
