import type { NextApiRequest, NextApiResponse } from 'next'
import { getUserDetailsFromUid, prisma } from '../../../../utils/apiUtils';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const requesting_user = req.body.requesting
    const destination_user = req.body.destination
    const achievement = req.body.name

    const user = await getUserDetailsFromUid(requesting_user)

    await prisma.achievement_request.create({
        data: {
            status: 0,
            requesting_user: user.username,
            destination_user: destination_user,
            achievement: achievement
        }
    })

    res.status(200).send({});
}
