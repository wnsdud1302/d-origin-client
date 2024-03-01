import {} from 'next/navigation'
import { backendServer } from '../../config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {

    const query = req.nextUrl.searchParams
    const res = await fetch(`${backendServer}/news?page=${query.get('page')}&size=12`, {
        cache: 'no-store'
    })
    const news = await res.json()

    return NextResponse.json(news)
}