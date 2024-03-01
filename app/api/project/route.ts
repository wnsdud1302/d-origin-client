import { NextRequest, NextResponse } from "next/server";
import { backendServer } from "../../config";


export async function GET(req: NextRequest){
    const query = req.nextUrl.searchParams
    const res = await fetch(`${backendServer}/project?page=${query.get('page')}&size=12`, {
        cache: 'no-store'
    })
    const project = await res.json()

    const content = project

    return NextResponse.json(content)
}
