'use client'
import { backendServer, frontendServer } from "../../../config";
import Image from 'next/image';
import useSWR from 'swr';
import Link from 'next/link';

const fetcher = async (url) => fetch(url).then(res => res.json())

export default function Page({params}) {
    const decode = decodeURIComponent(params.title)

    const {data: news, error} = useSWR(`/api/news/modify?title=${decode}`, fetcher)

    return (
        <div className="fade-in-up mx-auto">
            <div className="mb-8 ml-5">
                <Link className="return" href={`/main/news`}>
                    <p>&lt;&nbsp;</p>
                </Link>
            </div>
            {news &&
            <><div className='bg-white w-[60px] h-[5px] mx-auto mb-[10px] relative mt-[40px]' />
            <h1 className='newsTitle mb-8'>{news.title}</h1>
                <div>
                        <Image src={`${frontendServer}/api/news/image?title=${news.title}`}
                            className="flex items-center justify-center mx-auto w-[700px]"
                            onContextMenu={e => e.preventDefault()}
                            alt={news.title}
                            width={1000} height={300} />
                        <p className='mt-[30px] mx-auto w-[700px] whitespace-pre-wrap'>
                            {news.content}
                        </p>

                </div></>
            }
            
        </div>
    );
}