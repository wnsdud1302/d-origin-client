import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../lib/prisma'
import bcrypt from 'bcrypt'
import { getServerSession } from 'next-auth';


interface RequsetBody {
    name: string
    email: string
    password: string
}

export async function POST(req: NextRequest){

    const server = getServerSession()

    const body: RequsetBody = await req.json()

    const user = await prisma.user.create({
        data:{
            name: body.name,
            email: body.email,
            password: await bcrypt.hash(body.password, 12),
        },
    })

    const { password, ...result} = user

    // const result = {status: '200', message: '현재 이기능은 작동하지 않습니다.'}
    return NextResponse.json(result)
}

