import type { NextApiRequest, NextApiResponse } from 'next'
import moment from 'moment-timezone';

import { getAllUserCompletedAchievements, getUserDetailsFromUid, getUserNonCompletedAchievementsDetails, prisma } from '../../../../../utils/apiUtils';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let limit: number;

    if (req.query.limit && typeof req.query.limit === 'string') {
        limit = parseInt(req.query.limit);
    }

    const user = await getUserDetailsFromUid(req.query.uid as any)

    const user_completed_achievements = await getAllUserCompletedAchievements(user.username);

    const whereCondition: any= {
        name: {
            notIn: user_completed_achievements.map((ach) => ach.achievement)
        }
    };
    const now = moment.utc().tz('Europe/Rome');
    if(
        (now.isAfter(moment.tz('2023-10-31T00:00:00', 'Europe/Rome')) && now.isBefore(moment.tz('2023-10-31T23:59:00', 'Europe/Rome')))
        ||
        (now.isAfter(moment.tz('2023-11-05T08:00:00', 'Europe/Rome')) && now.isBefore(moment.tz('2023-11-05T18:00:00', 'Europe/Rome')))
    ) {
        whereCondition.section = 'viaggio'
    } else if(
        now.hour() < 8 || now.hour() > 19
    ) {
        whereCondition.section = 'appartamento'
    } else if (
        now.hour() >= 8 || now.hour() <= 19
    ) {
        whereCondition.section = 'fiera'
    }

    const missing_achievements = await prisma.achievement.findMany({
        where: whereCondition,
        orderBy: {
            difficulty: 'asc'
        },
        take: limit
    })

    const user_missing_achievements = missing_achievements.map((achivement) => ({ ...achivement, status: 0 }))


    res.status(200).json({
        nextAchievementsToComplete: user_missing_achievements
    })
}