import { readFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const title = req.nextUrl.searchParams.get('title')

    try{
        const file = await readFile('./public/images/recruit/' + title + '.jpeg')
        return new Response(file, {headers: {'Content-Type': 'image/jpeg'}})
    } catch(e){
        return NextResponse.json(e.message, {status: 500})
    }
}