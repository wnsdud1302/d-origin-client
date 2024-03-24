import { frontendServer } from '../../../config'
import  Image  from 'next/image'


const loader = ({src, width, quality}) => {
    return `${src}?w=${width}&q=${quality || 75}`
}

export default async function Page({params}){
    const name = decodeURIComponent(params.name)
    return(
        <div>
            <Image loader={loader} src={`${frontendServer}/api/project/image?name=${name}`} alt={name} width={2000} height={300}/>
            <img src={`${frontendServer}/api/project/image?name=${name}`} alt={name} width={2000} height={300}/>
        </div>
    )
}