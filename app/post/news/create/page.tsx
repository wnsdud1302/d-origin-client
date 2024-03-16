'use client'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { FormEvent, useState } from 'react';

interface News{
    title: string,
    content: string,
}

function PostNews(){
    
    const {data: session, status } = useSession()



    if(status === 'unauthenticated' || session?.error){
        redirect('/api/auth/signin')
    }

    const [news, setNews] = useState<News>({
        title: '',
        content: ''
    })
    const [image, setImage] = useState<File>()
    const [imageurl, setImageUrl] = useState<string>('')
    const [sendding, setSendding] = useState<boolean>(false)

    const makeImageUrl = (file: File) => {
        let image = window.URL.createObjectURL(file)
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
        setNews({title: '', content: ''})
        setImageUrl(' ')
        setSendding(true)
        try{
            const resText = await fetch(`/api/news/create`, {
                method: 'POST',
                body: formData
            })

            const res = await resText.json()
            console.log(`response from server ${res.status}`)
        }catch(e){
            console.log(e)
        }
    }

    return(
        <div>
            <div>
                <h1 className='ml-[50px] text-7xl'>{!sendding ? '뉴스생성': '보내는중'}</h1>
                <form className='grid grid-cols-1 gap-4 text-xl mt-[40px] mx-auto w-[80dvw]' onSubmit={handleSubmit}>
                    <div className=''>
                        <p>제목</p>
                        <input className='input' type="text" placeholder="title" onChange={(e) => setNews({...news, title: e.target.value})}/>
                    </div>
                    <div>
                        <p>내용</p>
                        <textarea className='text-area' placeholder="content" onChange={(e) => setNews({...news, content: e.target.value})}/>
                    </div>
                    <div>
                        <input type="file" accept='image/jpg' onChange={(e) => {
                            setImage(e.target.files[0])
                            makeImageUrl(e.target.files[0])
                        }}/>
                    </div>
                    <div>
                        <button type="submit">submit</button>
                    </div>
                </form>
            </div>
            <div>
                <img src={imageurl}/>
            </div>
        </div>
    )
}

export default PostNews