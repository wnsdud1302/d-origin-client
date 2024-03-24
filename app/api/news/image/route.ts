import { readFile } from "fs/promises";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest){
    const title = req.nextUrl.searchParams.get('title')
    try{
        const file = await readFile('./public/news/' + title + '.jpeg')
        return new Response(file, {headers: {'Content-Type': 'image/jpeg'}})
    } catch(e){
        return new Response(e.message, {status: 500})
    }
}