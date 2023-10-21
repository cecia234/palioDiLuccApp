import styles from './navbar.module.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { Stack } from 'react-bootstrap';
import useWindowDimensions from '../hooks/useWindowsDimensions';

export default function NavigationBar({ simplified }) {
    const { height, width } = useWindowDimensions();
    const expand = true;
    return (
        <Navbar sticky="top" expand={false} className={styles.navbar}>
            <Container fluid className={styles.navbar}>
                <Link href="/">
                    <Image
                        src="/images/TIMBROLUCCA.svg" // Route of the image file
                        height={height * 0.1 || 50} // Desired size with correct aspect ratio
                        width={width * 0.1 || 50} // Desired size with correct aspect ratio
                        alt="Your Name"
                    />
                </Link>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton className={styles.navbarMenu}>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} className={styles.navbarTitle}>
                            Menù
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className={styles.navbarMenu}>
                        <Nav className={styles.navbarMenu}>
                            <Stack gap={1}>
                                {simplified ? '' : <Link href="/" className={styles.menuVoice}>Home</Link>}
                                <Link href="/achievementList" className={styles.menuVoice}>Lista Achievement</Link>
                                {simplified ? '' : <Link href="/leaderboard" className={styles.menuVoice}>Classifica</Link>}
                                <Link href="/about" className={styles.menuVoice}>Dicono di noi</Link>
                            </Stack>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}