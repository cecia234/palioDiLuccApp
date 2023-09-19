import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // L'array commentato è un oggetto di default in caso non ci siano achievement disponibili
    /*
    const lastCompletedAchievements: IAchievement[] = [
        {
            name: "Cura Paliativa",
            icon: "☕",
            description: "Prendi un caffè corretto al solito baretto",
            status: 'done',
        },
        {
            name: "FANBOY",
            icon: "👕",
            description: "Passa una giornata con del vestiario dedicato a un content creator o a un fumetto/videogioco. Punti bonus se incontri il corrispettivo creator o cosplayer, provandolo.",
            status: 'done',
        },
        {
            name: "TABLETOP MASTA",
            icon: "🎲",
            description: "Spendi almeno 55€ in giochi da tavolo o di carte, dal rinomato capannone",
            status: 'done',
        },
        {
            name: "CULTURAL IMPORTER",
            icon: "🗯️",
            description: "Chiedi una foto a un/a cosplayer ma fallo in un dialetto a scelta.",
            status: 'done',
        },
        {
            name: "NOSTALGICO",
            icon: "😪",
            description: "Dormi in sacco a pelo per tutta la durata del soggiorno. Punti bonus se non usi la doccia.",
            status: 'done',
        },
        {
            name: "MIO PADRE? PEFFO",
            icon: "😨",
            description: "Fai cringiare Dario Moccia con un meme stra-morto e provalo con una foto/video",
            status: 'done',
        },
        {
            name: "PERVERTITO",
            icon: "🔞",
            description: "Acquista un volume di un hentai. Punti bonus se è un’action figure hentai.",
            status: 'done',
        },
        {
            name: "DIREZIONE: LAGO DURIA",
            icon: "🗺️",
            description: "Fatti una foto con cosplayer sulla riva del fiume",
            status: 'done',
        },
        {
            name: "SHINZOU WO SASAGEYO",
            icon: "⚔️",
            description: "Ottieni un’interazione di qualsiasi tipo con quelli dell’esercito. Punti bonus se dura almeno 5 minuti.",
            status: 'done',
        },
    ];*/
    const user_achievements_codes = (await prisma.user_achievement.findMany({ 
        where: { 
            user: 'marione', 
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