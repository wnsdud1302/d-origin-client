'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import './project.css'
import Image from 'next/image'


const fetcher = async (url) => fetch(url).then(res => res.json())

export default function Page() {

    const [pageIndex, setPageIndex] = useState(0);
  
    const {data, error} = useSWR(`/api/project?page=${pageIndex}`, fetcher)
  
    return (
      <div className=" w-[90dvw] h-[90dvh] mt-[50px] mx-auto items-center">
        <div className='bg-white w-[60px] h-[5px] mx-auto mb-[10px] relative'/>
        <h1 className='text-2xl font-bold text-center'>Project</h1>
        {data ?
          <div className=''>
              <ProejctList data={data.content}/> 
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
  
  const ProejctList = ({ data }) => {
    
    const grid = data.map((element, index) => {
      return (
        <div key={index}>
          <Link className=' overflow-hidden' href={`project/${element.name}`}>
            <Image className='newsImage h-[auto] max-w-[100%] overflow-hidden' src={`/images/${element.name}/1.jpeg`} alt={element.name} width={500} height={300}/>
            <p className=' text-center mt-2'>{element.name}</p>
          </Link>
        </div>
      );
    });
  
  
    return (
      <div className='h-[50dvh]'>
        {data.length === 0 ? <div className='text-center text-2xl my-[30dvh]'>프로젝트가 없습니다.</div>:
          <div className='grid grid-cols-3 gap-4 relative '>
            {grid}
          </div>
        }
      </div>
  
    );
  }



