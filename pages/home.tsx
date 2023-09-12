import Layout from "../components/layout";
import AddAchievementButton from "../components/home/addAchievementButton";


export default function Home() {
    return <>
        <Layout>
            <h1>Fermati un attimo</h1>
            <p>Qui sei al sicuro nella tua home</p>
            <AddAchievementButton></AddAchievementButton>
        </Layout>
    </>
}