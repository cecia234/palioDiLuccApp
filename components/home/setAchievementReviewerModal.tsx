import useSWR from 'swr';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import styles from './achievement.module.css';
import { getAllUsers } from '../../utils/fetchUtils';
import { Spinner } from 'react-bootstrap';
interface IUser {
    username: string,
    propic: string
}


export default function SetAchievementReviewerModal(p) {
    let {users, data, ...props} = p;
    const currentUser = 'marione';

    let {usersa, isError, isLoading} = getAllUsers()

    if (isLoading) return <Spinner />
    if (isError) return <div >Loading</div>
    const originalList = usersa;
    let filteredList = originalList;

    let searchText = '';
    const handleInputChange = (e) => {
        const newText = e.target.value;
        searchText = newText;

        // Filtra la lista originale in base al testo di input
        const filtered = originalList.filter((item) =>
            item.username.toLowerCase().includes(newText.toLowerCase())
        );

        filteredList = filtered;
    };

    const achievement = props.data

    return (
        <>
            <Modal
                {...props}
                centered
            >
                <Modal.Header closeButton className={styles.achievementModal}>
                    <Modal.Title>
                        Aggiungi achievement: seleziona testimone
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.achievementModal}>
                    <div>
                        <input
                            type="text"
                            placeholder="Cerca tra gli utenti..."
                            value={searchText}
                            onChange={handleInputChange}
                        />
                        <div className={styles.itemList}>
                            {filteredList.map((item) => (
                                <div className={styles.achievementDiv} key={item.username} onClick={() => {
                                    props.onHide()
                                    sendAchievementRequest(achievement.name, item.username)
                                }}><p>🙃️ <b>{item.username}</b></p></div>
                            ))}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className={styles.achievementModal}>
                    <Button onClick={props.onHide} className={styles.modalBackButton}>Indietro</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function sendAchievementRequest(achievementName, username) {
    fetch('/api/achievements/requests/make', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "requesting": 'marione', // TODO
            "destination": username,
            "name": achievementName
        })
    })
}