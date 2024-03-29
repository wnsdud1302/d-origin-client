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
            <div className="mb-8 ml-5">
                <Link className="return" href={`/main/recruit`}>
                    <p>&lt;&nbsp;</p>
                </Link>
            </div>
            <Link className="ml-10" href="/main/recruit">&lt;뒤로가기</Link>
            <div className=" flex mx-auto items-center justify-center mt-16">
                <div>
                    <h1 className="text-[30px] text-center font-bold">{data.title}</h1>
                    <p className="mt-10">{content}</p>
                </div>
            </div>
            
        </div>
    )
}