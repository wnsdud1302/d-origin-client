import { NextRequest } from 'next/server'
import { frontendServer } from '../../config'

export async function Page(req: NextRequest){
    const name = req.nextUrl.searchParams.get('name')
    const res = await fetch(`${frontendServer}/api/project/image?name=${name}`)

    return(
        <div>
            <img src={URL.createObjectURL(await res.blob())} />
            <img src={`${frontendServer}/api/project/image?name=${name}`} />
        </div>
    )
}