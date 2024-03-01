'use client'

import useSWR from 'swr'
import { useState } from 'react'
import './news.css'
import Link from 'next/link';
import Image from 'next/image';

const fetcher = async (url) => fetch(url).then(res => res.json())

const getKey = (pageIndex, prevData) => {
  if(prevData && !prevData.length) return null;
  return `/api/news?page=${pageIndex}`
}

export default function Page() {

  const [pageIndex, setPageIndex] = useState(0);

  const {data, error} = useSWR(`/api/news?page=${pageIndex}`, fetcher)

  return (
    <div className=" w-[90dvw] h-[90dvh] mt-[50px] mx-auto items-center">
      <div className='bg-white w-[60px] h-[5px] mx-auto mb-[10px] relative'/>
      <h1 className='newsTitle'>News</h1>
      <div className=''>
        {data ?
        <div>
         <NewsList data={data.content}/>
          <div className="flex justify-center mt-[10px] bottom-0">
            <button onClick={() => setPageIndex(pageIndex - 1)} disabled={pageIndex === 0 ? true : false }>&#10094; 이전</button>
            <div className=' w-4'/>
            <button onClick={() => setPageIndex(pageIndex + 1)} disabled={data && data.last}>다음 &#10095;</button>
          </div>
        </div>
         :
         <div className='text-center text-2xl my-[30dvh]'>뉴스가 없습니다.</div>}

      </div>
    </div>
  )
}

const NewsList = ({ data }) => {
  
  const grid = data.map((element, index) => {
    return (
      <div key={index}>
        <Link className=' overflow-hidden' href={`/news/${element.id}`}>
          <Image className='newsImage h-[auto] max-w-[100%] overflow-hidden' src={`/news/${element.title}.jpg`} alt={element.title} width={500} height={300}/>
          <p className=' text-center mt-2'>{element.title}</p>
        </Link>
      </div>
    );
  });


  return (
    <div className='h-[50dvh]'>
      <div className='grid grid-cols-3 gap-4 relative '>
        {grid}
      </div>
    </div>

  );
}