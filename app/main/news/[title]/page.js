'use client'
import { backendServer, frontendServer } from "../../../config";
import Image from 'next/image'
import useSWR from 'swr'

const fetcher = async (url) => fetch(url).then(res => res.json())

export default function Page({params}) {
    const decode = decodeURIComponent(params.title)

    const {data: news, error} = useSWR(`/api/news/modify?title=${decode}`, fetcher)

    return (
        <div className="fade-in-up mx-auto mt-[50px]">
            {news &&
            <><div className='bg-white w-[60px] h-[5px] mx-auto mb-[10px] relative mt-[40px]' />
            <h1 className='newsTitle mb-[10px]'>{news.title}</h1>
                <div>
                        <Image src={`${frontendServer}/api/news/image?title=${news.title}`}
                            className="flex items-center justify-center mx-auto w-[700px]"
                            onContextMenu={e => e.preventDefault()}
                            alt={news.title}
                            width={1000} height={300} />
                        <p className='mt-[10px] mx-auto w-[800px]'>
                            {news.content}
                        </p>

                </div></>
            }
            
        </div>
    );
}