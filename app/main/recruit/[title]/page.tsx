import { redirect } from "next/dist/server/api-utils";
import { backendServer } from "../../../config"
import Link from "next/link";

interface Recruit{
    title: string;
    endDate: string;
    content: string;
}

export default async function Page({params}){

    const res = await fetch(`${backendServer}/recruit/${params.title}`, {
        cache: 'no-store'
    })
    const data: Recruit = await res.json()

    const content = data.content

    console.log(data)
    return(
        <div className=" whitespace-pre-wrap">
            <Link className="ml-10" href="/main/recruit">뒤로가기</Link>
            <div className=" flex mx-auto items-center justify-center mt-16">
                <div>
                    <h1 className="text-[30px] text-center">{data.title}</h1>
                    <h2>{data.endDate}</h2>
                    <p>{content}</p>
                </div>
            </div>
            
        </div>
    )
}