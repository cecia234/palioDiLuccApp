import Layout from "../components/layout";
import AddAchievementButton from "../components/home/addAchievementButton";
import AchievementContainer from "../components/home/achievementContainer";
import { Stack } from "react-bootstrap";

export interface IAchievement {
    name: string,
    icon: string,
    description?: string
}

const lastCompletedAchievements: IAchievement[] = [
    {
        name: "Cura Paliativa",
        icon: "☕",
        description: "Prendi un caffè corretto al solito baretto"
    },
    {
        name: "FANBOY",
        icon: "👕",
        description: "Passa una giornata con del vestiario dedicato a un content creator o a un fumetto/videogioco. Punti bonus se incontri il corrispettivo creator o cosplayer, provandolo."
    },
    {
        name: "TABLETOP MASTA",
        icon: "🎲",
        description: "Spendi almeno 55€ in giochi da tavolo o di carte, dal rinomato capannone"
    },
    {
        name: "CULTURAL IMPORTER",
        icon: "🗯️",
        description: "Chiedi una foto a un/a cosplayer ma fallo in un dialetto a scelta."
    },
    {
        name: "NOSTALGICO",
        icon: "😪",
        description: "Dormi in sacco a pelo per tutta la durata del soggiorno. Punti bonus se non usi la doccia."
    },
    {
        name: "MIO PADRE? PEFFO",
        icon: "😨",
        description: "Fai cringiare Dario Moccia con un meme stra-morto e provalo con una foto/video"
    },
    {
        name: "PERVERTITO",
        icon: "🔞",
        description: "Acquista un volume di un hentai. Punti bonus se è un’action figure hentai."
    },
    {
        name: "DIREZIONE: LAGO DURIA",
        icon: "🗺️",
        description: "Fatti una foto con cosplayer sulla riva del fiume"
    },
    {
        name: "SHINZOU WO SASAGEYO",
        icon: "⚔️",
        description: "Ottieni un’interazione di qualsiasi tipo con quelli dell’esercito. Punti bonus se dura almeno 5 minuti."
    },
];

const nextAchievementsToComplete: IAchievement[] = [
    {
        name: "IL RITORNO DEL BROLYCULO",
        icon: "🍑",
        description: "Sai già cosa devi fare"
    },
    {
        name: "GOURMET RACE",
        icon: "🧔🏿",
        description: "Mangia kebab (o falafel), ramen e pizza in una sola giornata"
    },
    {
        name: "LA CUMMINA",
        icon: "💦",
        description: "Compra e bevi una bevanda discutibile con cummine dentro"
    },
    {
        name: "ULTRA SIDE CHARACTER",
        icon: "🤔",
        description: "Ma chi cazzo cosplaya Shino Aburame? Fai una foto con un personaggio super side"
    },
    {
        name: "PARITA’",
        icon: "🧬",
        description: "Incontra e fai una foto con un content creator, ma di genere opposto al tuo."
    },
    {
        name: "GAMER ESPERTO",
        icon: "🎮",
        description: "Prova almeno 5 videogiochi nello stesso giorno. Punti bonus se partecipi a un torneo o a un evento videoludico."
    },
    {
        name: "NANOMACHINES, SON!",
        icon: "🧑🏻‍💻",
        description: "Sperimenta la realtà virtuale"
    },
    {
        name: "SENTIRSI GIOVANI…",
        icon: "🧔🏿‍♂️",
        description: 'Porta un cosplay anche improvvisato per un giorno (No, la maglia del Palio di Pieris non è un cosplay)'
    },
    {
        name: "QUALCUNO L’HA MAI FATTO?",
        icon: "🙅🏻‍♂️",
        description: 'Entra nella cattedrale di Lucca. Punti bonus se in cosplay.'
    },
];

export default function Home() {
    return <>
        <Layout>
            <h1>Il tuo palio di Lucca finora</h1>
            <Stack gap={3}>
            <AddAchievementButton></AddAchievementButton>
            <AchievementContainer title = "Ultimi Achievement completati" achievements={lastCompletedAchievements}></AchievementContainer>
            <AchievementContainer title = "Prossimi Achievement consigliati" achievements={nextAchievementsToComplete}></AchievementContainer>
            </Stack>
        </Layout>
    </>
}