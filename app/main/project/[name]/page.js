'use client'
import { frontendServer, backendServer } from '../../../config';
import Image from 'next/image';
import useSWR from 'swr';

const fetcher = async (url) => fetch(url).then(res => res.json())

export default function Page({ params }) {
    const decode = decodeURIComponent(params.name);

    const {data: project, error} = useSWR(`${backendServer}/project/${decode}`, fetcher)

    return (
        <div className='fade-in-up mx-auto mt-[50px]'>
            <div className=' bg-white w-[60px] h-[5px] mx-auto mb-10px'></div>
            <h1 className=' text-center text-[40px]'>{project.name}</h1>
            <Image className='flex items-center justify-center mx-auto'
                   src={`${frontendServer}/api/project/image?name=${project.name}`} 
                   onContextMenu={e=>e.preventDefault()} 
                   width={1000} height={300}/>
            {project && <div className=' grid grid-cols-2 mt-[20px]'>
                <DescribeTable project={project}/>
                <p className='mt-[0px] text-[15px] whitespace-pre-wrap'>{project.description}</p>
            </div>}
            
        </div>
    );
}


const DescribeTable = ({project}) => {
    return(
        <div className=" relative">
        <table className="text-[15px] text-justify w-[20dvw]" cellPadding={5} cellSpacing="5" width="20vw">
            <tbody>
            <tr>
                <td>이름: </td>
                <td>{project.name}</td>
            </tr>
            <tr>
                <td>연면적: </td>
                <td>{project.area} m²</td>
            </tr>
            <tr>
                <td>규모: </td>
                <td>{project.scale}</td>
            </tr>
            </tbody>
        </table>
    </div>
    )
}