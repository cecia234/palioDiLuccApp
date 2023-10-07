import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../../utils/apiUtils';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === 'GET') {
        const requests = (await prisma.achievement_request.findMany({
            where: {
                user_achievement_request_destination_userTouser: {
                    uid: req.query.uid as any
                },
                status: 0
            },
            include: {
                achievement_achievement_request_achievementToachievement: true
            }
        }));

        res.status(200).json({
            requests
        })
    } else {
        res.status(500);
    }
}