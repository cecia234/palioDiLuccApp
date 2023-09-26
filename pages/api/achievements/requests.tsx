import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if(req.method === 'GET') {
        const requests = (await prisma.achievement_request.findMany({ 
            where: { 
                destination_user: req.body.users || 'marione', 
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
        })

        res.status(200);
    }
}