'use client'

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";


interface Recruit{
    title: string;
    content: string;
}

export default function Page(){

    const [recruit, setRecruit] = useState<Recruit>({
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()
        for(const key in recruit){
            formData.append(key, recruit[key])
        }
        if(image){
            formData.append('image', image)
        }
        setRecruit({title: '', content: ''})
        setImageUrl('')
        setImage(undefined)

        setSendding(true)
        try{
            const res = await fetch('/api/recruit/create', {
                method: 'POST',
                body: formData
            })
            console.log(await res.json())
        } catch(e){
            console.log(e)
        }
    }

    if (sendding){
        redirect('/main/recruit')
    }

    return(
        <div>
            <form className="grid grid-cols-1 gap-10 text-xl mt-10 mx-auto w-[80vw]"
                   onSubmit={handleSubmit}
                   encType="multipart/form-data">
                    <div>
                        <p>제목</p>
                        <input className="input w-full h-10 border border-black" type="text" 
                               value={recruit.title} 
                               onChange={e => setRecruit({...recruit, title: e.target.value})}/>
                    </div>
                    <div>
                        <p>내용</p>
                        <textarea className="text-area w-full h-40 border border-black" 
                                  value={recruit.content} 
                                  onChange={e => setRecruit({...recruit, content: e.target.value})}/>
                    </div>
                    <button type="submit" className="text-xl">등록</button>
            </form>
        </div>
    )
}