import { backendServer } from "../../../config"

interface Recruit{
    title: string;
    type: string;
    status: string;
    endDate: string;
    content: string;
}

export default async function Page({params}){

    const res = await fetch(`${backendServer}/recruit/${params.title}`)
    const data: Recruit = await res.json()

    return(
        <div>
            <h1>{data.title}</h1>
            <h2>{data.type}</h2>
            <p>{data.content}</p>
        </div>
    )
}