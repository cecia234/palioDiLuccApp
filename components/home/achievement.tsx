import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';

import { IAchievement } from "../../pages/home";
import styles from './achievement.module.css';
import {useState} from 'react';


function MyVerticallyCenteredModal(props) {
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
          <h3 className={styles.modalIcon}>
            {props.data.icon}
          </h3>
          <p className={styles.modalDescription}>
            {props.data.description}
          </p>
        </Modal.Body>
        <Modal.Footer className={styles.achievementModal}>
          <Button onClick={props.onHide} className={styles.modalBackButton}>Indietro</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default function Achievement({ data }: { data: IAchievement }) {
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            <Stack onClick={() => setModalShow(true)}>
                <p className={styles.icon}>{data.icon}</p>
                <p className={styles.name}>{data.name}</p>
            </Stack>
            
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                data = {data}
            />
        </>
    )
}