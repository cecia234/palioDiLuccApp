import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../utils/apiUtils';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {


    const numRequests = (await prisma.achievement_request.count({
        where: {
            user_achievement_request_destination_userTouser: { uid: req.query.uid as any },
            status: 0
        },
    }));

    res.status(200).json({
        numRequests
    })
}