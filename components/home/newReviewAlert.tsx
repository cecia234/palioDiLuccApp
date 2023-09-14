import Link from 'next/link';
import Alert from 'react-bootstrap/Alert';


export default function NewReviewAlert({ newRequests }) {
    return (
        <Link href="/reviews">
            <Alert variant='warning'>
                Hai {newRequests} nuove richieste di testimonianza.
            </Alert>
        </Link>
    )
}