import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
        const requesting_user = req.body.requesting
        const destination_user = req.body.destination
        const achievement = req.body.name
        const result = req.body.result
        
        await prisma.achievement_request.update({
            where: {
                requesting_user_destination_user_achievement: {
                    destination_user: destination_user,
                    requesting_user: requesting_user,
                    achievement
                }
            },
            data: {
                status: result
            }
        }).then(() => prisma.user_achievement.update({
            where: {
                user_achievement:{
                    user: requesting_user,
                    achievement
                }
            },
            data: {
                status: 2
            }
        }))

        res.status(200);
}