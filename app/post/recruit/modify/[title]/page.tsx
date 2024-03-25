'use client'

import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {FormEvent, useState } from "react";
import useSWR from "swr";

interface Recruit{
    title: string;
    content: string;
}

const fetcher = async (url: any) => fetch(url).then(res => res.json())

export default function Page({params}){

    const {data: session, status } = useSession()

    if(status === 'unauthenticated' || session?.error){
        redirect('/api/auth/signin')
    }

    const title = decodeURIComponent(params.title)
    const {data, error} = useSWR(`/api/recruit/modify?title=${title}`, fetcher)
    const [recruit, setRecruit] = useState<Recruit>({
        title: '',
        content: ''
    })

    const [image, setImage] = useState<File>()
    const [pendding, setpendding] = useState<boolean>(false)
    const [imageurl, setImageUrl] = useState<string>('')
    const [sendding, setSendding] = useState<boolean>(false)

    const makeImageURL = (file: File) => {
        const image = window.URL.createObjectURL(file)
        setImageUrl(image)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()
        for(const key in recruit){
            formData.append(key, recruit[key])
        }
        if(image){
            formData.append('image', image)
        }
        setSendding(true)

        try{
            const response = await fetch(`/api/recruit/modify?title=${title}`, {
                method: 'PUT',
                body: formData
            })
            console.log(await response.json())
        } catch(e){
            console.log(e)
        }
    }

    if (sendding){
        redirect('/main/recruit')
    }

    if(!pendding && data){
        setRecruit(data)
        setpendding(true)
    }

    return(
        <div>
            <form className="grid grid-cols-1 gap-10 text-xl mt-10 mx-auto w-[80vw]" 
                  onSubmit={handleSubmit}
                  encType="multipart/form-data">
                <div>
                    <label>제목</label>
                    <input className="input" type="text" value={recruit.title} onChange={e => setRecruit({...recruit, title: e.currentTarget.value})}/>
                </div>
                <div>
                    <label>내용</label>
                    <textarea className="text-area" value={recruit.content} onChange={e => setRecruit({...recruit, content: e.currentTarget.value})}/>
                </div>
                <button type="submit">수정</button>            
            </form>
        </div>
    )
}