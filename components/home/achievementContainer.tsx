import { IAchievement } from "../../pages/home";
import Achievement from "./achievement";
import styles from './achievementContainer.module.css';
import { Stack } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function AchievementContainer({ achievements, title }: { achievements: IAchievement[], title: string }) {
    const rows = getRows(achievements);

    return (
        <>
            <Stack>
                <h2 className={styles.title}> {title.toUpperCase()} </h2>
                <div className={styles.divcolor}>
                        <Container>
                            <Row>
                                {rows[0]}
                            </Row>
                            <Row>                                
                                {rows[1]}
                            </Row>
                            <Row>                                   
                                {rows[2]}
                            </Row>
                        </Container>
                </div>
            </Stack>
        </>
    )
}

function getRows(achievements: IAchievement[]) {
    const rows = [];
    let a = [];
    for (let i = 0; i < achievements.length; i++) {
        const element = <Col className={styles.achievementColumn}><Achievement data={achievements[i] || { name: '', icon: '' }}></Achievement></Col>;
        if (i === 3 || i === 6) {
            rows.push(a);
            a = [];
        }
        a.push(element);
    }
    rows.push(a);
    return rows;
}
