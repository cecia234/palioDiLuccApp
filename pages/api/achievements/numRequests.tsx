import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {


    const numRequests = (await prisma.achievement_request.count({ 
        where: { 
            destination_user: 'marione', 
            status: 0
        },
    }));
    
    res.status(200).json({
        numRequests
    })
}