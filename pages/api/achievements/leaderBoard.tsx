import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { EAchievementStatus } from '../../../lib/types';


const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const user_achievements_codes = (await prisma.user_achievement.findMany({
        where: { 
            status: EAchievementStatus.DONE,
        },
        include: {
            user_user_achievement_userTouser: {
                select: {
                    name: true
                }
            },
            achievement_user_achievement_achievementToachievement: {
                select: {
                    difficulty: true
                }
            }
        },        
    })).map((el) => ({
        user: el.user_user_achievement_userTouser.name,
        difficulty: el.achievement_user_achievement_achievementToachievement.difficulty,
    }))
    const usersObj = {};
    user_achievements_codes.forEach((achievement) => {
        if(!usersObj[achievement.user]) {
            usersObj[achievement.user] = {
                bronze: 0,
                silver: 0,
                gold: 0
            };
        }
        switch(achievement.difficulty) {
            case 1:
                usersObj[achievement.user].bronze++
                break;
            case 2:
                usersObj[achievement.user].silver++
                break;
            case 3:
                usersObj[achievement.user].gold++
        }        
    })

    const usersArr = Object.keys(usersObj).map((name) => ({...usersObj[name], username: name}))
    
    res.status(200).json({
        users: usersArr
    })
}