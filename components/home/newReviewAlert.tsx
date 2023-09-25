import Link from 'next/link';
import Alert from 'react-bootstrap/Alert';


export default function NewReviewAlert({ newRequests }) {
    return (
        <Link href="/reviews">
            <Alert variant='warning'>
                Hai {newRequests} nuov{newRequests === 1 ? 'a' : 'e'} richiest{newRequests === 1 ? 'a' : 'e'} di testimonianza.
            </Alert>
        </Link>
    )
}