import { NextRequest, NextResponse } from "next/server";
import { backendServer } from "../../../config";

export async function GET(req: NextRequest){
        const res = await fetch(`${backendServer}/recruit/list`, {
            cache: "no-store"
        })
        const data = await res.json()
        return NextResponse.json(data)

}