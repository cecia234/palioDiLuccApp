import type { NextApiRequest, NextApiResponse } from 'next'
import { getUserDetailsFromUid, prisma } from '../../../utils/apiUtils';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const username = req.body.username
    const name = req.body.name
    const surname = req.body.surname
    const mail = req.body.email
    const propic = req.body.propic
    const uid = req.body.uid

    try {
        await prisma.user.create({
            data: {
                username,
                name,
                surname,
                mail,
                propic,
                uid
            }
        })
        res.status(200).send({});
    } catch (err) {
        res.status(500).send({error: err.message});
    }

}
