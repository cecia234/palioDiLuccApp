import styles from './navbar.module.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'next/image';
import Link from 'next/link';

export default function NavigationBar() {
    const expand = true;
    return (
        <Navbar sticky="top" expand={false} className={styles.navbar}>
            <Container fluid className={styles.navbar}>
                <Link href="/">
                    <Image
                        src="/images/TIMBROLUCCA.svg" // Route of the image file
                        height={typeof window !== "undefined" ? window.innerHeight * 0.1 : 50} // Desired size with correct aspect ratio
                        width={typeof window !== "undefined" ? window.innerHeight * 0.1 : 50} // Desired size with correct aspect ratio
                        alt="Your Name"
                    />
                </Link>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                            Menù
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Link href="/">Home</Link>
                            <Link href="/achievementList">Lista Achievement</Link>
                            <Link href="/leaderboard">Classifica</Link>
                            <Link href="/about">Dicono di noi</Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}