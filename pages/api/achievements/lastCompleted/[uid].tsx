import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserDetailsFromUid, prisma } from '../../../../utils/apiUtils';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const user = await getUserDetailsFromUid(req.query.uid as any)

    const user_achievements_codes = (await prisma.user_achievement.findMany({
        where: {
            user_user_achievement_userTouser: { uid: user.uid },
            status: 2
        },
        include: {
            achievement_user_achievement_achievementToachievement: true
        }
    })).map((ach) => ach.achievement_user_achievement_achievementToachievement)

    res.status(200).json({
        lastCompletedAchievements: user_achievements_codes
    })
}