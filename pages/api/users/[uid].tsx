import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = await prisma.user.findFirst({ where: { uid: req.query.uid as any } })

    res.status(200).json({
        user
    })
}