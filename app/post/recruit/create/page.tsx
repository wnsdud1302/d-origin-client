'use client'

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";


interface Recruit{
    title: string;
    recruitType: string;
    recruitStatus: string;
    recruitendDate: string;
}

export default function Page(){

    const {data: session, status } = useSession()

    if(status === 'unauthenticated' || session?.error){
        redirect('/api/auth/signin')
    }

    const [recruit, setRecruit] = useState<Recruit>({
        title: '',
        recruitType: '',
        recruitStatus: '',
        recruitendDate: ''
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
        setRecruit({title: '', recruitType: '', recruitStatus: '', recruitendDate: ''})
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
        redirect('main/recruit')
    }

    return(
        <div>
            <form className="grid grid-cols-1 gap-10 text-xl mt-10 mx-auto w-[80vw]"
                   onSubmit={handleSubmit}
                   encType="multipart/form-data">
                    <div>
                        <p>제목</p>
                        <input className="w-full h-10 border border-black" type="text" 
                               value={recruit.title} 
                               onChange={e => setRecruit({...recruit, title: e.target.value})}/>
                    </div>
                    <div>
                        <p>모집 유형</p>
                        <input className="w-full h-10 border border-black" type="text" 
                               value={recruit.recruitType} 
                               onChange={e => setRecruit({...recruit, recruitType: e.target.value})}/>
                    </div>
                    <div>
                        <p>모집 상태</p>
                        <input className="w-full h-10 border border-black" type="text" 
                               value={recruit.recruitStatus} 
                               onChange={e => setRecruit({...recruit, recruitStatus: e.target.value})}/>
                    </div>
                    <div>
                        <p>모집 마감일</p>
                        <input className="w-full h-10 border border-black" type="text" 
                               value={recruit.recruitendDate} 
                               onChange={e => setRecruit({...recruit, recruitendDate: e.target.value})}/>
                    </div>
                    <div>
                        <p>이미지</p>
                        <input type="file" 
                            accept="image/jpeg"
                            onChange={e => {
                            const file = e.target.files[0]
                            if(file){
                                setImage(file)
                                makeImageUrl(file)
                            }
                        }}/>
                        {imageurl && <img src={imageurl} width='500px'/>}
                    </div>
                    <button type="submit" className="text-xl">등록</button>
            </form>
        </div>
    )
}