import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    // const nextAchievementsToComplete: IAchievement[] = [
    //     {
    //         name: "IL RITORNO DEL BROLYCULO",
    //         icon: "🍑",
    //         description: "Sai già cosa devi fare",
    //         status: 'undone',
    //     },
    //     {
    //         name: "GOURMET RACE",
    //         icon: "🧔🏿",
    //         description: "Mangia kebab (o falafel), ramen e pizza in una sola giornata",
    //         status: 'undone',
    //     },
    //     {
    //         name: "LA CUMMINA",
    //         icon: "💦",
    //         description: "Compra e bevi una bevanda discutibile con cummine dentro",
    //         status: 'undone',
    //     },
    //     {
    //         name: "ULTRA SIDE CHARACTER",
    //         icon: "🤔",
    //         description: "Ma chi cazzo cosplaya Shino Aburame? Fai una foto con un personaggio super side",
    //         status: 'undone',
    //     },
    //     {
    //         name: "PARITA’",
    //         icon: "🧬",
    //         description: "Incontra e fai una foto con un content creator, ma di genere opposto al tuo.",
    //         status: 'undone',
    //     },
    //     {
    //         name: "GAMER ESPERTO",
    //         icon: "🎮",
    //         description: "Prova almeno 5 videogiochi nello stesso giorno. Punti bonus se partecipi a un torneo o a un evento videoludico.",
    //         status: 'undone',
    //     },
    //     {
    //         name: "NANOMACHINES, SON!",
    //         icon: "🧑🏻‍💻",
    //         description: "Sperimenta la realtà virtuale",
    //         status: 'undone',
    //     },
    //     {
    //         name: "SENTIRSI GIOVANI…",
    //         icon: "🧔🏿‍♂️",
    //         description: 'Porta un cosplay anche improvvisato per un giorno (No, la maglia del Palio di Pieris non è un cosplay)',
    //         status: 'undone',
    //     },
    //     {
    //         name: "QUALCUNO L’HA MAI FATTO?",
    //         icon: "🙅🏻‍♂️",
    //         description: 'Entra nella cattedrale di Lucca. Punti bonus se in cosplay.',
    //         status: 'undone',
    //     },
    // ];

    const user_achievements_codes = (await prisma.user_achievement.findMany({ 
        where: { 
            user: 'marione', 
            status: 0
        },
        include: {
            achievement_user_achievement_achievementToachievement: true
        }
    })).map((ach) => ach.achievement_user_achievement_achievementToachievement)
    
    res.status(200).json({
        nextAchievementsToComplete: user_achievements_codes
    })
}