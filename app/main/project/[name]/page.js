import { FrontendServer, backendServer } from '../../../config';
import Image from 'next/image';

const fetcher = async (url) => fetch(url).then(res => res.json())


export default async function page({ params }) {
    const decode = decodeURIComponent(params.name);

    const res = await fetch(`${backendServer}/project/${decode}`, {
        cache: 'no-store'
    })
    const project = await res.json()

    return (
        <div className='fade-in-up mx-[50px] mt-[50px]'>
            <div className=' bg-white w-[60px] h-[5px] mx-auto mb-10px'></div>
            <h1 className=' text-center text-[70px]'>{project.name}</h1>
            <Image src={`/images/${project.name}/1.jpg`} alt={project.name} width={2000} height={300}/>
            <div className=' grid grid-cols-2 mt-[20px]'>
                <DescribeTable project={project}/>
                <p className='mt-[20px] text-[2dvw]'>{project.description}</p>
            </div>
            
        </div>
    );
}


const DescribeTable = ({project}) => {
    return(
        <div className=" relative">
        <table className="text-[2vw] text-justify w-[45dvw] font-mono" cellPadding={5} cellSpacing="5" width="20%">
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