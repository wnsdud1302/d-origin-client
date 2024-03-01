import { NextRequest, NextResponse } from "next/server";
import { backendServer } from "../../../config";

interface params {
    id: number;
}

export async function GET(req: NextRequest, {params}: {params: params}){

    const res = await fetch(`${backendServer}/news/id/${params.id}`)

    const news = await res.json()
        

    return NextResponse.json(news)
}