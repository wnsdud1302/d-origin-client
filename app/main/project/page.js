'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import './project.css'
import Image from 'next/image'
import { frontendServer } from '../../config'


const fetcher = async (url) => fetch(url).then(res => res.json())


export default function Page() {

    const [pageIndex, setPageIndex] = useState(0);
  
    const {data, error} = useSWR(`/api/project?page=${pageIndex}`, fetcher)
  
    return (
      <div className=" w-[1200px] mt-[50px] mx-auto items-center">
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
      const name = element.name
      return (
        <div key={index}>
          <Link className='' href={`project/${name}`}>
            <Image onContextMenu={e=>e.preventDefault()}
                   className='flex items-center justify-center object-cover h-[200px] w-[300px] mx-auto' 
                   src={`${frontendServer}/api/project/image?name=${name}`} alt={element.name} width={1000} height={300}/>
            <p className='text-center mt-2'>{element.name}</p>
          </Link>
        </div>
      );
    });
  
  
    return (
      <div>
        {data.length === 0 ? <div className='text-center text-2xl my-[30dvh]'>프로젝트가 없습니다.</div>:
          <div className='grid grid-cols-3 gap-3 relative '>
            {grid}
          </div>
        }
      </div>
  
    );
  }



