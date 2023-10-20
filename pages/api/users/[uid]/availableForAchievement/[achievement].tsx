import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../../utils/apiUtils'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const usersAlreadyRequested = await prisma.achievement_request.findMany({
        where: {
            user_achievement_request_requesting_userTouser: {
                uid: req.query.uid as any
            },
            achievement_achievement_request_achievementToachievement: {
                name: req.query.achievement as any
            },
            status: 0
        }
    })

    const availableUsers = await prisma.user.findMany({
        where: {
            username: {
                notIn: usersAlreadyRequested.map((user) => user.destination_user)
            }
        }
    })

    res.status(200).json({
        users: availableUsers
    })
}