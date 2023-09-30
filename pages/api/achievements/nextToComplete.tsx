import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let limit: number;
    if (req.body.limit) {
        limit = req.body.limit;
    }

    const user_achievements = await prisma.user_achievement.findMany({
        where: {
            user: 'marione'
        }
    })

    const user_achievements_codes = (await prisma.achievement.findMany({
        where: {
            name: {
                notIn: user_achievements.map((ach) => ach.achievement)
            }
        },
        take: limit
    }))

    res.status(200).json({
        nextAchievementsToComplete: user_achievements_codes
    })
}