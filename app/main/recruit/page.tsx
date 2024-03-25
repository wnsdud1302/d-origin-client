'use client'
import { useState } from "react";
import useSWR from "swr";
import Link from 'next/link'

interface Recruit{
  title: string;
  type: string;
  status: string;
  endDate: string;
}

const fetcher = async (url) => fetch(url).then(res => res.json())

export default function Page() {

    const [pageIndex, setPageIndex] = useState(0);
  
    const {data, error} = useSWR(`/api/recruit?page=${pageIndex}`, fetcher)
  
    return (
      <div className=" w-[90dvw] h-[90dvh] mt-[50px] mx-auto items-center">
        <div className='bg-white w-[60px] h-[5px] mx-auto mb-[10px] relative'/>
        <h1 className='text-2xl font-bold text-center'>Recruit</h1>
        {data ?
          <div className=''>
            <RecruitList data={data.content}/>
              <div className="flex justify-center mt-[10px] bottom-0">
                <button onClick={() => setPageIndex(pageIndex - 1)} disabled={pageIndex === 0 ? true : false }>&#10094; 이전</button>
                <div className=' w-4'/>
                <button onClick={() => setPageIndex(pageIndex + 1)} disabled={data && data.last}>다음 &#10095;</button>
              </div>
            </div> : <div className='text-center text-2xl my-[30dvh]'></div>
        }
      </div>
    )
  }

  const RecruitList = ({ data }) => {

    const grid = data.map((element: Recruit, index) => {
      const title = element.title
      const endDate = element.endDate
      const status = element.status
      return (
        <div key={index}>
          <Link className='flex items-center justify-center mx-auto' href={`recruit/${title}`}>
            {title} {endDate} {status}
          </Link>
        </div>
      )
    })

    return (
      <div className='w-[90vw]'>
        {data.length === 0 ? <div className='text-center text-2xl my-[30dvh]'>모집이 없습니다.</div>:
          <div className='grid grid-cols-3 gap-3 relative '>
            {grid}
          </div>
        }
      </div>
    )
}