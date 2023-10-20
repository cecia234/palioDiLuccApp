import { PrismaClient } from '@prisma/client'


const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }


export const prisma =

  globalForPrisma.prisma || new PrismaClient()


if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma


export async function getUserDetailsFromUid(uid: string) {
    // utente associato a uid
    return await prisma.user.findFirst({ where: { uid: uid } })
}

export async function getAllUserCompletedAchievements(username: string) {
    // tutti gli achievement completati da quell'utente
    return await prisma.user_achievement.findMany({
        where: {
            user: username
        }
    })
}

export async function getUserNonCompletedAchievementsDetails(username: string, limit?: number) {
    const user_completed_achievements = await getAllUserCompletedAchievements(username);

    const missing_achievements = await prisma.achievement.findMany({
        where: {
            name: {
                notIn: user_completed_achievements.map((ach) => ach.achievement)
            }
        },
        take: limit
    })

    return missing_achievements.map((achivement) => ({ ...achivement, status: 0 }))
}


