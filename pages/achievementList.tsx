import { Stack } from "react-bootstrap";

import Layout from "../components/layout";
import { IAchievement } from "./home";
import styles from './achievementList.module.css'

const achievements: IAchievement[] = [
    {
        name: "Cura Paliativa",
        icon: "☕",
        description: "Prendi un caffè corretto al solito baretto",
        status: 'undone',
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
        status: 'undone',
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
    {
        name: "IL RITORNO DEL BROLYCULO",
        icon: "🍑",
        description: "Sai già cosa devi fare",
        status: 'done',
    },
    {
        name: "GOURMET RACE",
        icon: "🧔🏿",
        description: "Mangia kebab (o falafel), ramen e pizza in una sola giornata",
        status: 'undone',
    },
    {
        name: "LA CUMMINA",
        icon: "💦",
        description: "Compra e bevi una bevanda discutibile con cummine dentro",
        status: 'done',
    },
    {
        name: "ULTRA SIDE CHARACTER",
        icon: "🤔",
        description: "Ma chi cazzo cosplaya Shino Aburame? Fai una foto con un personaggio super side",
        status: 'done',
    },
    {
        name: "PARITA’",
        icon: "🧬",
        description: "Incontra e fai una foto con un content creator, ma di genere opposto al tuo.",
        status: 'done',
    },
    {
        name: "GAMER ESPERTO",
        icon: "🎮",
        description: "Prova almeno 5 videogiochi nello stesso giorno. Punti bonus se partecipi a un torneo o a un evento videoludico.",
        status: 'undone',
    },
    {
        name: "NANOMACHINES, SON!",
        icon: "🧑🏻‍💻",
        description: "Sperimenta la realtà virtuale",
        status: 'done',
    },
    {
        name: "SENTIRSI GIOVANI…",
        icon: "🧔🏿‍♂️",
        description: 'Porta un cosplay anche improvvisato per un giorno (No, la maglia del Palio di Pieris non è un cosplay)',
        status: 'undone',
    },
    {
        name: "QUALCUNO L’HA MAI FATTO?",
        icon: "🙅🏻‍♂️",
        description: 'Entra nella cattedrale di Lucca. Punti bonus se in cosplay.',
        status: 'undone',
    },
];

export default function AchievementList() {
    return <>
        <Layout>
            <h1>Lista achievements</h1>
            <Stack gap={3}>
                {
                    achievements.map((item) => {
                        const element = (
                            <div className={item.status === 'done' ? styles.done : styles.undone}>
                                <p>
                                    {item.icon} <b>{item.name}</b> {item.status === 'done' ? '✅' : ''}
                                </p>
                                <p><i>{item.description}</i></p>
                            </div>
                        )

                        return element

                    })
                }
            </Stack>
        </Layout>
    </>
}