'use client'
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { FormEvent, useState } from 'react';
import useSWR from 'swr';


interface Project{
    name: string,
    description: string,
    area: number,
    scale: string,
}

const fetcher = async (url: any) => fetch(url).then(res => res.json())

export default function Page(){
    const {data: session, status } = useSession()


    if(status === 'unauthenticated' || session?.error){
        redirect('/api/auth/signin')
    }

    const [checkedList, setcheckedList] = useState<string[]>([])

    const {data: all, error: allError} = useSWR(`/api/project/list`, fetcher)


    const checkHandler = (e: FormEvent<HTMLInputElement>) => {
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
                e.preventDefault()
                const res = await fetch('/api/project/modify', {
                    method: 'DELETE',
                    body: JSON.stringify(checkedList)
                })
                console.log(await res.json())
                redirect('/project/modify')

            }}>
                <ol>
                    {all && all.map((project: Project, index) => {
                        return (
                            <div key={index} className='text-xl'>
                            <input className='mr-5 w-5 h-5' type='checkbox' value={project.name} checked={checkedList.includes(project.name)} onChange={checkHandler}/>
                            <Link href={`modify/${project.name}`}>{project.name}</Link>
                            </div>
                        )
                    })}
                </ol>
                <button className='text-xl' type='submit'>삭제</button>
            </form>
        </div>
    )
}