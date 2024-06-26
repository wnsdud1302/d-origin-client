'use client'

import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";


interface Recruit{
    title: string;
    recruitType: string;
    recruitStatus: string;
    recruitendDate: string;
}

const fetcher = async (url: any) => fetch(url).then(res => res.json())

export default function Page(){

    const {data: session, status } = useSession()
    
    if(status === 'unauthenticated' || session?.error){
        redirect('/api/auth/signin')
    }
    
    const [checkedList, setcheckedList] = useState<string[]>([])

    const {data, error} = useSWR(`/api/recruit/list`, fetcher)

    const checkHandler = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        if(checkedList.includes(value)){
            setcheckedList(checkedList.filter(item => item !== value))
        } else {
            setcheckedList([...checkedList, value])
        }
    }

    return(
        <div className='flex items-center justify-center mx-auto'>
            <form onSubmit={ async e => {
                const res = await fetch('/api/recruit/modify', {
                    method: 'DELETE',
                    body: JSON.stringify(checkedList)
                })
                console.log(await res.json())
            }}>
                <ol>
                    {data && data.map((recruit: Recruit, index:any) => {
                        return (
                            <div key={index} className='text-xl'>
                            <input className='mr-5 w-5 h-5' type='checkbox' value={recruit.title} checked={checkedList.includes(recruit.title)} onChange={checkHandler}/>
                            <Link href={`modify/${recruit.title}`}>{recruit.title}</Link>
                            </div>
                        )
                    })}
                </ol>
                <button className="text-xl" type='submit'>삭제</button>
            </form>
        </div>
    )
}