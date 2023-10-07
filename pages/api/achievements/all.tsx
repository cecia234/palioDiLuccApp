import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../utils/apiUtils'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // TODO: prendere tutti gli achievements da tabella "achievement" e associare lo status trovato in "user_achievement"
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