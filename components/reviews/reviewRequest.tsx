import useSWR from 'swr';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

import styles from './reviewsRequest.module.css'


export default function ReviewRequest({ item, uid }) {  // TODO rimuovi uid
    const [showOk, setShowOk] = useState(false);
    const handleCloseOk = () => setShowOk(false);
    const handleShowOk = () => setShowOk(true);
    const [showNo, setShowNo] = useState(false);
    const handleCloseNo = () => setShowNo(false);
    const handleShowNo = () => setShowNo(true);

    return (<>
        <div>
            <div className={styles.review}>
                <div>
                    {item.icon} <b>{item.name}</b> <i>(da {item.user})</i>
                </div>
                <div className={styles.buttonsContainers}>
                    <Button variant="success" size="sm" onClick={handleShowOk}>ok</Button>
                    <Button variant="danger" size="sm" onClick={handleShowNo}>no</Button>
                </div>
            </div>
            <p><i>{item.description}</i></p>
        </div>

        <Modal
            show={showOk}
            onHide={handleCloseOk}
            centered
        >
            <Modal.Header closeButton className={styles.achievementModal}>
                <Modal.Title>
                    Accetta testimonianza
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Sei sicuro di voler testimoniare per questo achievement?
            </Modal.Body>
            <Modal.Footer className={styles.achievementModal}>
                <Button onClick={handleCloseOk} className={styles.modalReviewBackButton}>Indietro</Button>
                <Button onClick={() => { sendTestimonianza(item, 2, uid); handleCloseOk() /*TODO rimuovi uid*/ }} className={styles.modalReviewButton}>Testimonia</Button>
            </Modal.Footer>
        </Modal>
        <Modal
            show={showNo}
            onHide={handleCloseOk}
            centered
        >
            <Modal.Header closeButton className={styles.achievementModal}>
                <Modal.Title>
                    Rifiuta testimonianza
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Sei sicuro di voler rifiutare la testimonianza per questo achievement?
            </Modal.Body>
            <Modal.Footer className={styles.achievementModal}>
                <Button onClick={handleCloseNo} className={styles.modalReviewBackButton}>Indietro</Button>
                <Button onClick={() => { sendTestimonianza(item, 1, uid); handleCloseNo() /*TODO rimuovi uid*/ }} className={styles.modalReviewButton}>Rifiuta testimonianza</Button>
            </Modal.Footer>
        </Modal>
    </>
    )
}

function sendTestimonianza(item, status, uid) {/*TODO rimuovi uid*/
    fetch('/api/achievements/requests/confirm', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "requesting": item.user,
            "destination": uid,/*TODO rimuovi uid*/
            "name": item.name,
            "result": status
        })
    })
}