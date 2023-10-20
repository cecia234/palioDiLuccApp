import Button from 'react-bootstrap/Button';
import { useState } from 'react';

import styles from './addAchievementButton.module.css';
import AddAchievementModal from './addAchievementModal';


export default function AddAchievementButton() {
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            <Button onClick={() => setModalShow(true)} className={styles.addAchievementButton} variant="primary" size="lg">
                Aggiungi achievement
            </Button>

            {
                modalShow
                &&
                <AddAchievementModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            }
        </>
    )
}
