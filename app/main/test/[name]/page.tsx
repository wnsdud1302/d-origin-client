import { frontendServer } from '../../../config'

export default async function Page({params}){
    const name = decodeURIComponent(params.name)
    const res = await fetch(`${frontendServer}/api/project/image?name=${name}`)

    return(
        <div>
            <img src={`${frontendServer}/api/project/image?name=${name}`} />
        </div>
    )
}