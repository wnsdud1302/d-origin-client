import { frontendServer } from '../../../config'
import  Image  from 'next/image'

export default async function Page({params}){
    const name = decodeURIComponent(params.name)
    return(
        <div>
            <Image src={`${frontendServer}/api/project/image?name=${name}`} alt={name} width={2000} height={300}/>
        </div>
    )
}