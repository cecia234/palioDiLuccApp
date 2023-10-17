import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import styles from './achievement.module.css';
import SetAchievementReviewerModal from './setAchievementReviewerModal';
import { fetcher } from '../../utils/fetchUtils';
import { AuthContext } from '../../pages/_app';


export default function AddAchievementModal(props) {
    const uid = useContext(AuthContext);
    const nextAchievementFetch = useSWR(`/api/achievements/nextToComplete/${uid}/all`, fetcher);
    const achievementsToComplete = nextAchievementFetch.data ? nextAchievementFetch.data.nextAchievementsToComplete : [];

    const [filteredList, setFilteredList] = useState(achievementsToComplete);
    if (filteredList !== achievementsToComplete) { // don't update unnecessarily
        setFilteredList(achievementsToComplete);
    }
    const [searchText, setSearchText] = useState('');
    const [showAchievementReviewerModal, setShowAchievementReviewerModal] = useState(false);
    const [selectedAchievement, setSelectedAchievement] = useState({ icon: '', name: '', description: '', status: 'undone' })
    const handleInputChange = (e) => {
        const newText = e.target.value;
        setSearchText(newText);

        // Filtra la lista originale in base al testo di input
        const filtered = achievementsToComplete.filter((item) =>
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
                {...props}
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
                    <Button onClick={props.onHide} className={styles.modalBackButton}>Indietro</Button>
                </Modal.Footer>
            </Modal>

            <SetAchievementReviewerModal
                show={showAchievementReviewerModal}
                onHide={() => setShowAchievementReviewerModal(false)}
                data={selectedAchievement}
            />
        </>
    );
}