import { NextRequest, NextResponse } from "next/server"
import prisma from "../../lib/prisma"
import bcrypt from 'bcrypt'
import { signInJwtAcessToken } from "../../lib/jwt"

interface user {
    name: string,
    email: string,
    password: string
}

export async function POST(req: NextRequest){
    const body: user = await req.json()
    
    console.log(`body: ${body}`)

    const user = await prisma.user.findFirst({
        where: {
            name: body.name
        }
    })

    if(user && (await bcrypt.compare(body.password, user.password))){
        const { password, ...witoutPass} = user
        const accesstoken = signInJwtAcessToken(witoutPass)

        const result = {...witoutPass, ...accesstoken}
        console.log(`result: ${result}`)
        return NextResponse.json(result)
    } else {
        return NextResponse.json(null)
    }
}