import { mkdir, writeFile } from "fs/promises";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { backendServer } from "../../../config";
import next from "next";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
    const session = await getServerSession()

    if(!session || session.error){
        return NextResponse.json({data: 'unauthenticated', status: 401})
    }
    
    const body = await req.formData()

    const news = {
        title: body.get('title'),
        content: body.get('content')
    }

    const file = body.get('image') as File
    const buffer = await file.arrayBuffer()
    const image = Buffer.from(buffer)

    await writeFile(`./public/news/${news.title}.jpg`, image)

    const res = await fetch(`${backendServer}/news/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(news)
    })

    const result = await res.json()

    return NextResponse.json({data: {...result}, status: 200})

}