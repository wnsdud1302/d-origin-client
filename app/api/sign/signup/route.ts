import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../lib/prisma'
import bcrypt from 'bcrypt'


interface RequsetBody {
    name: string
    email: string
    password: string
}

// export async function POST(req: NextRequest){
//     const body: RequsetBody = await req.json()

//     const user = await prisma.user.create({
//         data:{
//             name: body.name,
//             email: body.email,
//             password: await bcrypt.hash(body.password, 12),
//         },
//     })

//     const { password, ...result} = user
//     return NextResponse.json(result)
// }

export async function POST(req: NextRequest){

    const body = await req.json()

    try{
    const res = await fetch(`/api/sign/login`, {
        method: 'POST',
        body: body,
        headers: { "Content-Type": "application/json" }
    })
    const user = await res.json()

    return NextResponse.json({user})
    } catch (error){
        return NextResponse.error()
    }

}