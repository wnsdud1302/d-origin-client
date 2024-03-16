'use client'

const fetcher = async (url) => fetch(url).then(res => res.json())

export default function Page() {

  return (
    <div>
      구인 구직이 없습니다.
    </div>
  )

    // const [pageIndex, setPageIndex] = useState(0);
  
    // const {data, error} = useSWR(`/api/recruit?page=${pageIndex}`, fetcher)
  
    // return (
    //   <div className=" w-[90dvw] h-[90dvh] mt-[50px] mx-auto items-center">
    //     <div className='bg-white w-[60px] h-[5px] mx-auto mb-[10px] relative'/>
    //     <h1 className='text-2xl font-bold text-center'>Project</h1>
    //     {data ?
    //       <div className=''>
    //           <div className="flex justify-center mt-[10px] bottom-0">
    //             <button onClick={() => setPageIndex(pageIndex - 1)} disabled={pageIndex === 0 ? true : false }>&#10094; 이전</button>
    //             <div className=' w-4'/>
    //             <button onClick={() => setPageIndex(pageIndex + 1)} disabled={data && data.last}>다음 &#10095;</button>
    //           </div>
    //         </div> : <div className='text-center text-2xl my-[30dvh]'></div>
    //     }
    //   </div>
    // )
  }