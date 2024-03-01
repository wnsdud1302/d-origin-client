import { backendServer } from "../../../config";

export default async function page({params}) {

    const res = await fetch(`${backendServer}/news/id/${params.id}` , {
        cache: "no-store",
    })
    const news = await res.json()

    return (
        <div>
            <div className='bg-white w-[60px] h-[5px] mx-auto mb-[10px] relative mt-[40px]'/>
            <h1 className='newsTitle mb-[10px]'>{news.title}</h1>
            <div className='mx-auto w-[95vw]'>
                <img  src={`/news/${news.title}.jpg`} alt={news.title}/>
                <p className='mt-[10px]'>{news.content}</p>

            </div>
            
        </div>
    );
}