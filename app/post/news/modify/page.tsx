'use client'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { FormEvent, useState } from 'react';
import useSWR from 'swr';

interface News{
    id: number,
    title: string,
    content: string
}

const fetcher = async (url: any) => fetch(url, { cache: 'no-store'}).then(res => res.json())

export default function Page(){
    const {data: session, status } = useSession()

    if(status === 'unauthenticated' || session?.error){
        redirect('/api/auth/signin')
    }

    const [checkedList, setcheckedList] = useState<number[]>([])

    const {data: list, error: listError} = useSWR('/api/news/all', fetcher)

    const checkHandler = (e: FormEvent<HTMLInputElement>) => {
        const value = Number(e.currentTarget.value)
        if(checkedList.includes(value)){
            setcheckedList(checkedList.filter(item => item !== value))
        } else {
            setcheckedList([...checkedList, value])
        }
    }

    return (
        <div className='flex items-center justify-center mx-auto'>
            <form onSubmit={ async e => {
                e.preventDefault()
                const res = await fetch('/api/news/modify', {
                    method: 'DELETE',
                    body: JSON.stringify(checkedList)
                })
                console.log(await res.json())
            }}>
                <ol>
                    {list && list.map((news: News, index) => {
                        return (
                            <div key={index} className='text-xl'>
                                <input className='mr-5 w-5 h-5' type='checkbox' value={news.id} checked={checkedList.includes(news.id)} onChange={checkHandler}/>
                                {news.title}
                            </div>
                        )
                    })}
                </ol>
                <button className='text-xl' type='submit'>삭제</button>
            </form>
        </div>
    )
}