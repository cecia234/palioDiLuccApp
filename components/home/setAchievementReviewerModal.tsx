import useSWR from 'swr';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import styles from './achievement.module.css';
import { fetcher } from '../../utils/fetchUtils';
interface IUser {
    username: string,
    propic: string
}

export default function SetAchievementReviewerModal(props) {

    let userFetch = useSWR('/api/users/all', fetcher)
    const currentUser = 'marione';

    let users = userFetch.data ? userFetch.data.users : [];
    users = users.filter((u) => u.username !== currentUser);

    const [originalList, setOriginalList] = useState(users);
    const [filteredList, setFilteredList] = useState(originalList);
    const [searchText, setSearchText] = useState('');
    const handleInputChange = (e) => {
        const newText = e.target.value;
        setSearchText(newText);

        // Filtra la lista originale in base al testo di input
        const filtered = originalList.filter((item) =>
            item.username.toLowerCase().includes(newText.toLowerCase())
        );

        setFilteredList(filtered);
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