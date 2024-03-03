import { NextRequest, NextResponse } from "next/server";
import { backendServer } from "../../../config";
import { writeFile, mkdir } from "fs/promises";
import { getServerSession } from "next-auth";
import { Buffer } from "buffer";
import { verifyJwtAccessToken } from "../../lib/jwt";

export async function POST(req: NextRequest) {

    const session = await getServerSession()

    const token = session.token

    console.log(`token: ${token}`)


    if(!session || !verifyJwtAccessToken(token)){
        return NextResponse.json({data: 'unauthenticated', status: 401})
    }


    const params = req.nextUrl.searchParams

    const body = await req.formData()

    const project = {
        name: body.get('name'),
        description: body.get('description'),
        area: body.get('area'),
        scale: body.get('scale')
    }

    const files = body.getAll('image')

    files.forEach(async (file) => {
        file = file as File
        const buffer = await file.arrayBuffer()
        await mkdir(`./public/images/${body.get('name')}`)
        await writeFile(`./public/images/${body.get('name')}/1.jpg`, Buffer.from(buffer))
    })

    const res = await fetch(`${backendServer}/project/create?category=${params.get('category')}`, {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
    })

    const result = await res.json()

    return NextResponse.json({data: {...result}, status: 200})

}