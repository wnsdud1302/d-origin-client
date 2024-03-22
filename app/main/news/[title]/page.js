import { backendServer } from "../../../config";
import Image from 'next/image'

export default async function page({params}) {
    const decode = decodeURIComponent(params.title)

    const res = await fetch(`${backendServer}/news/${decode}` , {
        cache: "no-store",
    })
    const news = await res.json()

    return (
        <div>
            <div className='bg-white w-[60px] h-[5px] mx-auto mb-[10px] relative mt-[40px]'/>
            <h1 className='newsTitle mb-[10px]'>{news.title}</h1>
            <div className='mx-auto w-[95vw]'>
                <Image src={`/news/${news.title}.jpeg`} alt={news.title} width={2000} height={300}/>
                <p className='mt-[10px]'>{news.content}</p>

            </div>
            
        </div>
    );
}