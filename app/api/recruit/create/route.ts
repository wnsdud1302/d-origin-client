import { writeFile } from "fs/promises";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { backendServer } from "../../../config";

export async function POST(req: NextRequest){

    const session = await getServerSession()

    if(!session || session.error){
        return new NextResponse('unauthenticated', {status: 401})
    }

    const query = req.nextUrl.searchParams

    try{
        const body = await req.formData()

        const recruit = {
            title: body.get('title'),
            type: body.get('type'),
            status: body.get('status'),
            endDate: body.get('endDate'),
            content: body.get('content')
        }

        const file = body.get('image') as File

        if(file){
            const buffer = await file.arrayBuffer()
            const image = Buffer.from(buffer)
            await writeFile(`./public/images/recruit/${recruit.title}.jpeg`, image)
        }

        const res = await fetch(`${backendServer}/recruit/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recruit)
        })
        const result = await res.json()
        return NextResponse.json({data: {...result}, status: 200})
    } catch(e){
        return NextResponse.json({error: e.message, status: 500})
    }
}