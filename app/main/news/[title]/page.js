'use client'
import { backendServer, frontendServer } from "../../../config";
import Image from 'next/image'
import useSWR from 'swr'

const fetcher = async (url) => fetch(url).then(res => res.json())

export default async function page({params}) {
    const decode = decodeURIComponent(params.title)

    const {data, error} = useSWR(`${backendServer}/news/${decode}`, fetcher)

    const res = await fetch(`${backendServer}/news/${decode}` , {
        cache: "no-store",
    })
    const news = await res.json()

    return (
        <div>
            <div className='bg-white w-[60px] h-[5px] mx-auto mb-[10px] relative mt-[40px]'/>
            <h1 className='newsTitle mb-[10px]'>{news.title}</h1>
            <div className='mx-auto w-[95vw] whitespace-pre-wrap'>
                <Image src={`${frontendServer}/api/news/image?title=${news.title}`} 
                       alt={news.title} 
                       width={2000} height={300}/>
                <p className='mt-[10px]'>{news.content}</p>

            </div>
            
        </div>
    );
}