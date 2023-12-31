import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import styles from './achievement.module.css';
import { getAllUsersAvailableForAchievementRequest } from '../../utils/fetchUtils';
import { Spinner } from 'react-bootstrap';
import { AuthContext } from '../../pages/_app';
interface IUser {
    username: string,
    propic: string
}


export default function SetAchievementReviewerModal(p) {
    const uid = useContext(AuthContext)
    let { data, ...props } = p;


    let { users, isError, isLoading } = getAllUsersAvailableForAchievementRequest(uid, data.name)

    if (isLoading) return <Spinner />
    if (isError) return <div >Loading</div>
    const originalList = users.filter((u) => u.uid !== uid);

    return <Modalina achievement={data} originalList={originalList} {...props}></Modalina> 
}

function Modalina(p) {
    const uid = useContext(AuthContext)
    let { achievement, originalList, ...props } = p;
    let [filteredList, setFilteredList] = useState(originalList)
    let [searchText, setSearchText] = useState('')
    const handleInputChange = (e) => {
        const newText = e.target.value;

        // Filtra la lista originale in base al testo di input
        const filtered = originalList.filter((item) =>
            item.username.toLowerCase().includes(newText.toLowerCase())
        );

        setFilteredList(filtered);
        setSearchText(newText);
    };

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
                                    sendAchievementRequest(achievement.name, uid, item.username)
                                }}><p>{item.propic}  <b>{item.username}</b></p></div>
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

async function sendAchievementRequest(achievementName, uid, username) {
    const resp = await fetch('/api/achievements/requests/make', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "requesting": uid,
            "destination": username,
            "name": achievementName
        })
    })

    if (resp.status >= 200 && resp.status < 400) {
        alert('Richiesta inviata con successo!');
    } else {
        alert("Si è verificato stato un problema con l'invio della richiesta")
    }
}