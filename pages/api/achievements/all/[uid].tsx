import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../utils/apiUtils'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    
    const user_achievements_codes = (await prisma.user_achievement.findMany({
        where: {
            user_user_achievement_userTouser: {
                uid: req.query.uid as string
            }
        }
    }))

    const achIds = user_achievements_codes.map((a) => a.achievement);

    const achievements = (await prisma.achievement.findMany()).map((el) => {
        return ({
            section: el.section,
            name: el.name,
            description: el.description,
            icon: el.icon,
            status: achIds.includes(el.name) ? 2 : 0
        })
    });
    




    // map((el) => ())

    res.status(200).json({
        achievements
    })
}