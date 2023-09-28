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
        res.status(500);
    }
}