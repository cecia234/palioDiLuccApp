import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import styles from './achievement.module.css';


export default function ViewAchievementModal(props) {
    return (
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
                    props.data.status === 'undone' ?
                        <Button onClick={props.onAdd} className={styles.modalCompleteButton}>Completa</Button> : null
                }
            </Modal.Footer>
        </Modal>
    );
}
