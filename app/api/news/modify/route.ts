import { NextRequest, NextResponse } from "next/server";
import { backendServer } from "../../../config";
import { getServerSession } from "next-auth";
import { writeFile } from "fs/promises";
import { rm } from "fs/promises";

export async function GET(req: NextRequest){
    const id = req.nextUrl.searchParams.get("id");
    const res = await fetch(`${backendServer}/news/${id}`)
    const data = await res.json()
    return NextResponse.json(data)
}

export async function PUT(req: NextRequest){

    const sessoion = await getServerSession()

    if(!sessoion || sessoion.error){
        return NextResponse.json({data: 'unauthenticated', status: 401})
    }

    const id = req.nextUrl.searchParams.get("id");
    const body = await req.formData()

    const news = {
        title: body.get('title'),
        content: body.get('content'),
    }

    const file = body.get('image') as File
    if(file){
        const buffer = await file.arrayBuffer()
        await writeFile(`./public/news/${news.title}.jpeg`, Buffer.from(buffer))
    }

    const res = await fetch(`${backendServer}/news/modify?id=${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    const data = await res.json()
    return NextResponse.json(data)
}

export async function DELETE(req: NextRequest){
    const sessoion = await getServerSession()

    if(!sessoion || sessoion.error){
        return NextResponse.json({data: 'unauthenticated', status: 401})
    }

    const body = await req.json()

    body.forEach(async (id: number) => {
        try{
            const res = await fetch(`${backendServer}/news/modify?id=${id}`, {
                method: "DELETE"
            })
            const data = await res.text()
            await rm(`./public/news/${data}.jpeg`)
        } catch(e){
            return NextResponse.json({error: e.message, status: 500})
        }
    })
}