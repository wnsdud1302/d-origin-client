import { NextRequest, NextResponse } from "next/server";
import { verifyJwtAccessToken } from "../api/lib/jwt";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page(){

    const session = await getServerSession()

    if(!session || session.error){
        return redirect('/api/auth/signin')
    }

    return(
        <div className="flex m-auto w-[70dvw] h-[100vh] items-center justify-center text-center text-[30px]">
            <div className="w-[30dvh]">
                <Link href='/post/project'>프로젝트</Link>
                
            </div>
            <div className="w-[30dvh]">
                <Link href='/post/news'>뉴스</Link>
            </div>
            
            <div className="w-[30vh]">
                <Link href='/post/recruit'>구인</Link>
            </div>
            
            <div className="w-[30dvh]">
                <Link href={`/api/auth/signout`}>Sign Out</Link>
            </div>
        </div>
    )
}



            