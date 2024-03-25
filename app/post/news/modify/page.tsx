'use client'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import React, { FormEvent, useState } from 'react';
import useSWR from 'swr';

interface News{
    title: string,
    content: string
}

const fetcher = async (url: any) => fetch(url).then(res => res.json())

export default function Page(){
    const {data: session, status } = useSession()

    if(status === 'unauthenticated' || session?.error){
        redirect('/api/auth/signin')
    }

    const [checkedList, setcheckedList] = useState<string[]>([])

    const {data: list, error: listError} = useSWR('/api/news/list', fetcher)

    const checkHandler = (e: FormEvent<HTMLInputElement>) => {
        const value = (e.currentTarget.value)
        if(checkedList.includes(value)){
            setcheckedList(checkedList.filter(item => item !== value))
        } else {
            setcheckedList([...checkedList, value])
        }
    }

    return (
        <div className='flex items-center justify-center mx-auto'>
            <form onSubmit={ async e => {
                const res = await fetch('/api/news/modify', {
                    method: 'DELETE',
                    body: JSON.stringify(checkedList)
                })
            }}>
                <ol>
                    {list && list.map((news: News, index: any) => {
                        return (
                            <div key={index} className='text-xl'>
                                <input className='mr-5 w-5 h-5' type='checkbox' value={news.title} checked={checkedList.includes(news.title)} onChange={checkHandler}/>
                                <Link href={`modify/${news.title}`}>{news.title}</Link>
                            </div>
                        )
                    })}
                </ol>
                <button className='text-xl' type='submit'>삭제</button>
            </form>
        </div>
    )
}