import type { NextApiRequest, NextApiResponse } from 'next'
import { getUserDetailsFromUid, prisma } from '../../../../utils/apiUtils'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const requesting_user = req.body.requesting
    const destination_user_uid = req.body.destination/*TODO rimuovi uid*/
    const achievement = req.body.name
    const result = req.body.result

    const user = await getUserDetailsFromUid(destination_user_uid)

    await prisma.achievement_request.update({
        where: {
            requesting_user_destination_user_achievement: {
                destination_user: user.username,
                requesting_user: requesting_user,
                achievement
            }
        },
        data: {
            status: result
        }
    })

    await prisma.user_achievement.create({
        data: {
            user: requesting_user,
            achievement,
            status: 2
        }
    })

    res.status(200).send({});
}