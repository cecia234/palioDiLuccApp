import { IAchievement } from "../../pages/home";


export default function Achievement({data}: {data: IAchievement}) {
    return (
        <>
            <p>{data.icon}</p>
            <p>{data.name}</p>
        </>
    )
}