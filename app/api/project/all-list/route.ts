import { NextRequest, NextResponse } from "next/server";
import { backendServer } from "../../../config";


export async function GET(req: NextRequest){

    try{ 
        const res = await fetch(`http://172.15.0.3:8080/project/all`, {
            cache: "no-store",
        })
        const data = await res.json()
        return NextResponse.json(data)
    } catch(error){
        return NextResponse.json({error: error.message, status: 500})
    }
}