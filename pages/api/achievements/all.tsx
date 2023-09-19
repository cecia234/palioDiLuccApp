import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const user_achievements_codes = (await prisma.user_achievement.findMany({
        where: { 
            user: 'marione',
        },
        include: {
            achievement_user_achievement_achievementToachievement: true
        }
    })).map((el) => ({
        name: el.achievement_user_achievement_achievementToachievement.name,
        description: el.achievement_user_achievement_achievementToachievement.name,
        icon: el.achievement_user_achievement_achievementToachievement.icon,
        status: el.status
    }))
    
    res.status(200).json({
        achievements: user_achievements_codes
    })
}