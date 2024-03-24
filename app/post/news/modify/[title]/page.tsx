'use client'
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";
import useSWR from "swr";

interface News{
    title: string,
    content: string
}

const fetcher = async (url: any) => fetch(url).then(res => res.json())

export default function Page({params}){

    const {data: session, status } = useSession()

    if(status === 'unauthenticated' || session?.error){
        redirect('/api/auth/signin')
    }

    const title = params.title

    const {data, error} = useSWR(`/api/news/modify?title=${title}`, fetcher)

    const [news, setNews] = useState<News>({
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
        for(const key in news){
            formData.append(key, news[key])
        }
        if(image){
            formData.append('image', image)
        }
        setSendding(true)

        try{
            const response = await fetch(`/api/news/modify?title=${title}`, {
                method: 'PUT',
                body: formData
            })
            console.log(await response.json())
        } catch(e){
            console.log(e)
        }
    }

    if(sendding){
        redirect('post/news/modify')
    }

    if(!pendding && data){
        setNews(data)
        setpendding(true)
    }

    return (
        <div className='flex items-center justify-center mx-auto'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>제목</label>
                    <input type='text' value={news.title} onChange={e => setNews({...news, title: e.target.value})}/>
                </div>
                <div>
                    <label>내용</label>
                    <textarea value={news.content} onChange={e => setNews({...news, content: e.target.value})}/>
                </div>
                <div>
                    <input type='file' onChange={e => {
                        const file = e.target.files[0]
                        setImage(file)
                        makeImageURL(file)
                    }}/>
                    {imageurl && <img src={imageurl ? imageurl : `/iamges/news/${news.title}.jpeg`}/>}
                </div>
                <button type='submit'>수정</button>
            </form>
        </div>
    )
}