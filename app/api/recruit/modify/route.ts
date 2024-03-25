import { NextResponse } from "next/server"
import { backendServer } from "../../../config"
import { getServerSession } from "next-auth"
import { rename, rm, writeFile } from "fs/promises"

const fetcher = async (url: any, recruit: any) => {
    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recruit)
    })
    const data = await res.json()
    return NextResponse.json({data, status: 200})
}

export async function GET(req: any){
    const query = req.nextUrl.searchParams
    try{
        const res = await fetch(`${backendServer}/recruit/${query.get('title')}`, {
            cache: 'no-store'
        })
        const recruit = await res.json()
        return NextResponse.json(recruit)
    } catch(e){
        return NextResponse.json({error: e.message, status: 500})
    }
}

export async function PUT(req: any){
    
    const sessoion = await getServerSession()

    if(!sessoion || sessoion.error){
        return NextResponse.json({data: 'unauthenticated', status: 401})
    }

    const query = req.nextUrl.searchParams
    const title = decodeURIComponent(query.get('title'))
    const body = await req.formData()

    const recruit = {
        title: body.get('title'),
        endDate: body.get('endDate'),
        content: body.get('content')
    }

    const file = body.get('image') as File

    if(body.get('title') !== query.get('title') && !file){
        await rename(`./public/images/recruit/${query.get('title')}.jpeg`, `./public/images/recruit/${body.get('title')}.jpeg`)
        return fetcher(`${backendServer}/recruit/modify?title=${query.get('title')}`, recruit)
    }

    if(file){
        const buffer = await file.arrayBuffer()
        await writeFile(`./public/images/recruit/${recruit.title}.jpeg`, Buffer.from(buffer))
    }

    return fetcher(`${backendServer}/recruit/modify?title=${query.get('title')}`, recruit)
}

export async function DELETE(req: any){

    const sessoion = await getServerSession()

    if(!sessoion || sessoion.error){
        return NextResponse.json({data: 'unauthenticated', status: 401})
    }

    const body = await req.json()

    body.forEach(async (title: string) => {
        try{
            const res = await fetch(`${backendServer}/recruit/delete?title=${title}`, {
                method: "DELETE"
            })
            await rm(`./public/images/recruit/${title}.jpeg`)
        } catch(e){
            return NextResponse.json({error: e.message, status: 500})
        }
    })
}