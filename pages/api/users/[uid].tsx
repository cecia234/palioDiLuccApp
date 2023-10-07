import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../utils/apiUtils'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = await prisma.user.findFirst({ where: { uid: req.query.uid as any } })

    res.status(200).json({
        user
    })
}