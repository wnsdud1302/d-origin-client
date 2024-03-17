import { NextRequest, NextResponse } from "next/server";
import { backendServer } from "../../../config";


export async function GET(req: NextRequest){

    const query = req.nextUrl.searchParams
    const res = await fetch(`${backendServer}/project/list`, {
        cache: 'no-store'
    })
    const data = await res.json()
    return NextResponse.json(data)

}
