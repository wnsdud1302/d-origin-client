'use client'
import { useState } from "react";
import useSWR from "swr";
import Link from 'next/link'

interface Recruit{
  title: string;
  endDate: string;
  content: string;
}

const fetcher = async (url:string) => fetch(url).then(res => res.json())

export default function Page() {

    const [pageIndex, setPageIndex] = useState(0);
  
    const {data, error} = useSWR(`/api/recruit?page=${pageIndex}`, fetcher)
  
    return (
      <div className=" w-[90dvw] h-[90dvh] mx-auto items-center">
        <div className="mb-8 ml-5">
                <Link className="return" href={`/`}>
                    <p>&lt;&nbsp;</p>
                </Link>
        </div>
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

    const grid = data.map((element: Recruit, index:any) => {
      const title = element.title
      const endDate = element.endDate
      return (
        <li className="text-xl h-10 my-auto" key={index}>
          <Link className='flex ' href={`recruit/${title}`}>
            <p className="mr-10">{index+1}</p>
            <p>{title}</p>
          </Link>
        </li>

      )
    })

    return (
      <div className='w-[90vw]'>
        {data.length === 0 ? <div className='text-center text-2xl my-[30dvh]'>모집이 없습니다.</div>:
          <ol className=''>
            {grid}
          </ol>
        }
      </div>
    )
}