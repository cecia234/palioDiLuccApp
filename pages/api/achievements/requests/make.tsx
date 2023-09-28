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
        
        await prisma.achievement_request.create({
            data: {
                status: 0,
                requesting_user: requesting_user,
                destination_user: destination_user,
                achievement: achievement
            }
        })

        res.status(200);
    }
