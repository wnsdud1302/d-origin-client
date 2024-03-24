import { NextRequest, NextResponse } from "next/server";
import { backendServer } from "../../config";

export async function GET(req: NextRequest){
    const query = req.nextUrl.searchParams
    try{
        const res = await fetch(`${backendServer}/recruit?page=${query.get('page')}&size=12`, {
            cache: 'no-store'
        })
        const recruit = await res.json()
        const content = recruit
        return NextResponse.json(content)
    } catch(e){
        return NextResponse.json({error: e.message, status: 500})
    }
}