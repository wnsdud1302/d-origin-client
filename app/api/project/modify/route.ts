import { NextRequest, NextResponse } from "next/server";
import { backendServer } from "../../../config";
import { getServerSession } from "next-auth";
import { writeFile, rm, unlink, mkdir, rename } from "fs/promises";


const fetcher = async (url: string, project: any) => {
    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)

    })
    const data = await res.json()
    return NextResponse.json({data, status: 200})
}

export async function GET(req: NextRequest){
    try{
        const query = req.nextUrl.searchParams
        const res = await fetch(`${backendServer}/project/${query.get('name')}`, {
            cache: 'no-store'
        })
        const project = await res.json()
        return NextResponse.json(project)
    } catch(e){
        return NextResponse.error()
    }
}

export async function PUT(req: NextRequest){

    const sessoion = await getServerSession()
    
    if(!sessoion || sessoion.error){
        return NextResponse.json({data: 'unauthenticated', status: 401})
    }

    const query = req.nextUrl.searchParams
    const body = await req.formData()

    const project = {
        name: body.get('name'),
        description: body.get('description'),
        area: body.get('area'),
        scale: body.get('scale')
    }

    const file = body.get('image') as File

    if(body.get('name') !== query.get('name') && file){
        await rename(`./public/images/project/${query.get('name')}`, `./public/images/project/${body.get('name')}`)
        await writeFile(`./public/images/project/${body.get('name')}/1.jpeg`, Buffer.from(await file.arrayBuffer()))
        return fetcher(`${backendServer}/project/modify?name=${query.get('name')}`, project)
    }

    if(body.get('name') !== query.get('name') && !file){
        await rename(`./public/images/project/${query.get('name')}`, `./public/images/project/${body.get('name')}`)
        return fetcher(`${backendServer}/project/modify?name=${query.get('name')}`, project)
        
    }

    if(file){
        const buffer = await file.arrayBuffer()
        await rename(`./public/images/proejct/${query.get('name')}`, `./public/images/project/${body.get('name')}`)
        await writeFile(`./public/images/project/${body.get('name')}/1.jpeg`, Buffer.from(buffer))
    }

    return fetcher(`${backendServer}/project/modify?name=${query.get('name')}`, project)
}

export async function DELETE(req: NextRequest){
    const sessoion = await getServerSession()
    
    if(!sessoion || sessoion.error){
        return NextResponse.json({data: 'unauthenticated', status: 401})
    }

    const body = await req.json()
    body.forEach(async (name: string) => {
        await fetch(`${backendServer}/project/delete?name=${name}`, {
            method: 'DELETE'
        })
        await rm(`./public/images/project/${name}`, {recursive: true})
    })

    return NextResponse.json({data: 'success', status: 200})
}