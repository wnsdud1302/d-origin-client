import { readdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const files = await readdir("public/images");
    return NextResponse.json(files);
}