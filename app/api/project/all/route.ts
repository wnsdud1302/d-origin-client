import { NextRequest, NextResponse } from "next/server";
import { backendServer } from "../../../config";


export async function GET(req: NextRequest) {

    try {
        const res = await fetch(`${backendServer}/project/list`, {
            cache: "no-store",
        })
        console.log(res.status)
        const data = await res.json()
        return NextResponse.json(data)
    } catch (e) {
        return NextResponse.json({ error: e.message, status: 500 })
    }

}