import { NextRequest, NextResponse } from "next/server";
import { backendServer } from "../../../config";
import { getServerSession } from "next-auth";
import { writeFile, rm, rename } from "fs/promises";

const fetcher = async (url: string, news: any) => {
    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(news)

    })
    const data = await res.json()
    return NextResponse.json({data, status: 200})
}

export async function GET(req: NextRequest){
    const title = req.nextUrl.searchParams.get("title");
    const res = await fetch(`${backendServer}/news/${title}`)
    const data = await res.json()
    return NextResponse.json(data)
}

export async function PUT(req: NextRequest){

    const sessoion = await getServerSession()

    if(!sessoion || sessoion.error){
        return NextResponse.json({data: 'unauthenticated', status: 401})
    }

    const title = req.nextUrl.searchParams.get("title");
    const body = await req.formData()

    const news = {
        title: body.get('title'),
        content: body.get('content'),
    }

    const file = body.get('image') as File

    if(body.get('title') !== title && !file){
        await rename(`./public/images/news/${title}.jpeg`, `./public/images/news/${body.get('title')}.jpeg`)
        return fetcher(`${backendServer}/news/modify?title=${title}`, news)
    }

    if(file){
        const buffer = await file.arrayBuffer()
        await writeFile(`./public/images/news/${news.title}.jpeg`, Buffer.from(buffer))
    }

    return fetcher(`${backendServer}/news/modify?title=${title}`, news)
}

export async function DELETE(req: NextRequest){
    const sessoion = await getServerSession()

    if(!sessoion || sessoion.error){
        return NextResponse.json({data: 'unauthenticated', status: 401})
    }

    const body = await req.json()

    body.forEach(async (title: string) => {
        try{
            const res = await fetch(`${backendServer}/news/delete?title=${title}`, {
                method: "DELETE"
            })
            await rm(`./public/images/news/${title}.jpeg`)
        } catch(e){
            return NextResponse.json({error: e.message, status: 500})
        }
    })
}