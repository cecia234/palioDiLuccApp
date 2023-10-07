import type { NextApiRequest, NextApiResponse } from 'next'

import { getUserDetailsFromUid, getUserNonCompletedAchievementsDetails } from '../../../../../utils/apiUtils';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let limit: number;

    if (req.query.limit && typeof req.query.limit === 'string') {
        limit = parseInt(req.query.limit);
    }

    const user = await getUserDetailsFromUid(req.query.uid as any)

    const user_missing_achievements = await getUserNonCompletedAchievementsDetails(user.username);

    res.status(200).json({
        nextAchievementsToComplete: user_missing_achievements
    })
}