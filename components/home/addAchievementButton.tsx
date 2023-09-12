import Button from 'react-bootstrap/Button';
import styles from './addAchievementButton.module.css';

function addAchievement() {
    alert("TODO: aggiunta achievement")
}

export default function AddAchievementButton() {
    return (
        <Button onClick= {addAchievement} className= {styles.addAchievementButton} variant="primary" size="lg">
            Aggiungi achievement
        </Button>
    )
}