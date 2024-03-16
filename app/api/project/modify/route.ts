import { NextRequest, NextResponse } from "next/server";
import { backendServer } from "../../../config";
import { getServerSession } from "next-auth";
import { writeFile } from "fs/promises";


export async function GET(req: NextRequest){
    try{
        const query = req.nextUrl.searchParams
        const res = await fetch(`${backendServer}/project/${query.get('name')}`, {
            cache: 'no-store'
        })
        const project = await res.json()
        return NextResponse.json(project)
    } catch(e){
        return NextResponse.json({error: e, status: 500})
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

    if(file){
        const buffer = await file.arrayBuffer()
        await writeFile(`./public/images/${body.get('name')}/1.jpeg`, Buffer.from(buffer))
    }

    const res = await fetch(`${backendServer}/project/modify?name=${query.get('name')}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
    })
    const data = await res.json()
    return NextResponse.json({data, status: 200})
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
    })

    return NextResponse.json({data: 'success', status: 200})
}