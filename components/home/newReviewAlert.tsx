import Link from 'next/link';
import useSWR from 'swr';
import Alert from 'react-bootstrap/Alert';

import { fetcher } from '../../utils/fetchUtils';


export default function NewReviewAlert({ userUid }) {

    const numRequestsFetch = useSWR(`/api/achievements/numRequests/${userUid}`, fetcher)

    let newRequests = numRequestsFetch.data ? numRequestsFetch.data.numRequests : 0;
    if (newRequests) {
        return (
            <Link href="/reviews">
                <Alert variant='warning'>
                    Hai {newRequests} nuov{newRequests === 1 ? 'a' : 'e'} richiest{newRequests === 1 ? 'a' : 'e'} di testimonianza.
                </Alert>
            </Link>
        )
    } else {
        return <></>
    }
}