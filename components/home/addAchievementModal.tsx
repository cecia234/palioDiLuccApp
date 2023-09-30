import { useState } from 'react';
import useSWR from 'swr';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import styles from './achievement.module.css';
import SetAchievementReviewerModal from './setAchievementReviewerModal';
import { fetcher } from '../../utils/fetchUtils';




export default function AddAchievementModal(props) {

    let {achievementsToComplete, users, ...rest} = props;
    const [originalList, setOriginalList] = useState(achievementsToComplete);
    if (originalList !== achievementsToComplete) { // don't update unnecessarily
        setOriginalList(achievementsToComplete);
    }
    const [filteredList, setFilteredList] = useState(originalList);
    if (filteredList !== originalList) { // don't update unnecessarily
        setFilteredList(originalList);
    }
    const [searchText, setSearchText] = useState('');
    const [showAchievementReviewerModal, setShowAchievementReviewerModal] = useState(false);
    const [selectedAchievement, setSelectedAchievement] = useState({ icon: '', name: '', description: '', status: 'undone' })
    const handleInputChange = (e) => {
        const newText = e.target.value;
        setSearchText(newText);

        // Filtra la lista originale in base al testo di input
        const filtered = originalList.filter((item) =>
            item.name.toLowerCase().includes(newText.toLowerCase())
        );

        setFilteredList(filtered);
    };

    const setAchievementReviewer = (achievement) => {
        setSelectedAchievement(achievement);
        setShowAchievementReviewerModal(true)
    }

    return (
        <>
            <Modal
                {...rest}
                centered
            >
                <Modal.Header closeButton className={styles.achievementModal}>
                    <Modal.Title>
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
                        <div className={styles.itemList}>
                            {filteredList.map((item) => (
                                <div className={styles.achievementDiv} key={item.id} onClick={() => setAchievementReviewer(item)}><p>{item.icon} <b>{item.name}</b></p><p><i>{item.description}</i></p></div>
                            ))}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className={styles.achievementModal}>
                    <Button onClick={rest.onHide} className={styles.modalBackButton}>Indietro</Button>
                </Modal.Footer>
            </Modal>

            <SetAchievementReviewerModal
                show={showAchievementReviewerModal}
                onHide={() => setShowAchievementReviewerModal(false)}
                data={selectedAchievement}
                users={users}
            />
        </>
    );
}