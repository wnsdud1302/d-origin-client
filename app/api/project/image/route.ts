import { readFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try{
        const name = req.nextUrl.searchParams.get('name')
        const file = await readFile('./public/images/' + name + '/1.jpeg')
        return new NextResponse(file, { headers: { 'Content-Type': 'image/jpeg' } })
    
    } catch(e){
        return NextResponse.json({error: e.message, status: 500})
    }
}