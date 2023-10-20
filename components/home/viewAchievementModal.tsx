import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import styles from './achievement.module.css';
import { EAchievementStatus } from '../../lib/types';
import SetAchievementReviewerModal from './setAchievementReviewerModal';


export default function ViewAchievementModal(props) {
    const [showAchievementReviewerModal, setShowAchievementReviewerModal] = useState(false);


    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className={styles.achievementModal}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.data.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.achievementModal}>
                    <h2 className={styles.modalIcon}>
                        {props.data.icon}
                    </h2>
                    <p className={styles.modalDescription}>
                        {props.data.description}
                    </p>
                </Modal.Body>
                <Modal.Footer className={styles.achievementModal}>
                    <Button onClick={props.onHide} className={styles.modalBackButton}>Indietro</Button>
                    {
                        props.data.status === EAchievementStatus.UNDONE ?
                            <Button onClick={() => setShowAchievementReviewerModal(true)} className={styles.modalCompleteButton}>Completa</Button> : null
                    }
                </Modal.Footer>
            </Modal>

            {
                showAchievementReviewerModal
                &&
                <SetAchievementReviewerModal
                    show={showAchievementReviewerModal}
                    onHide={() => setShowAchievementReviewerModal(false)}
                    data={props.data}
                    uid='HHoyw2EzJYhwcmfeWoCr1y2K0Dh1'
                />
            }
        </>
    );
}
