import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import styles from './achievement.module.css';


export default function AddAchievementModal(props) {
    const [originalList, setOriginalList] = useState(props.achievementsToComplete);
    const [filteredList, setFilteredList] = useState(originalList);
    const [searchText, setSearchText] = useState('');
    const handleInputChange = (e) => {
        const newText = e.target.value;
        setSearchText(newText);

        // Filtra la lista originale in base al testo di input
        const filtered = originalList.filter((item) =>
            item.name.toLowerCase().includes(newText.toLowerCase())
        );

        setFilteredList(filtered);
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className={styles.achievementModal}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Aggiungi un achievement completato
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.achievementModal}>
                <div>
                    <input
                        type="text"
                        placeholder="Cerca achievements..."
                        value={searchText}
                        onChange={handleInputChange}
                    />
                        {filteredList.map((item) => (
                            <p key={item.id}>{item.name}</p>
                        ))}
                </div>
            </Modal.Body>
            <Modal.Footer className={styles.achievementModal}>
                <Button onClick={props.onHide} className={styles.modalBackButton}>Indietro</Button>
            </Modal.Footer>
        </Modal>
    );
}