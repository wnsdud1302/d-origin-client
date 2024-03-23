import { readFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const name = req.nextUrl.searchParams.get('name')
    try{
        console.log(name)
        const file = await readFile('./public/images/' + name + '/1.jpeg')
        return new Response(file, {headers: {'Content-Type': 'image/jpeg'}})
    
    } catch(e){
        return new Response(e.message, {status: 500})
    }
}