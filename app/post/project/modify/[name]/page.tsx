'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { FormEvent, useState } from "react"
import useSWR from "swr"

interface Project{
    name: string,
    description: string,
    area: number,
    scale: string,
}

const fetcher = async (url: string) => fetch(url).then(res => res.json())

export default function Page({params}){

    const {data: session, status} = useSession()

    if(status === 'unauthenticated' || session?.error){
        redirect('/api/auth/signin')
    }

    const name = decodeURIComponent(params.name)

    const {data, error} = useSWR(`/api/project/modify?name=${name}`, fetcher)

    const [project, setProject] = useState<Project>({
        name: '',
        description: '',
        area: 0,
        scale: ''
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
        for(const key in project){
            formData.append(key, project[key])
        }
        if(image){
            formData.append('image', image)
        }
        setSendding(true)

        try{
            const response = await fetch(`/api/project/modify?name=${name}`, {
                method: 'PUT',
                body: formData
            })

            const res = await response.json()
            console.log('response from server', res.status)
        }catch(e){
            console.log(e)
        }
    }
    if(sendding){
        redirect('/post/project/modify')
    }

    if(!pendding && data){
        setProject(data)
        setpendding(true)
    }

    
    return(
        <div>
            <form className="grid grid-cols-1 gap-10 text-xl mt-[40px] mx-auto w-[80dvw]"
                onSubmit={handleSubmit}
                encType="multipart/form-data">
                <div>
                    <label>프로젝트 이름</label>
                    <input className="input" type="text" value={project.name} onChange={(e) => setProject({...project, name: e.target.value})}/>
                </div>
                <div>
                    <label>면적</label>
                    <input className="input" type="number" value={project.area} onChange={(e) => setProject({...project, area: parseFloat(e.target.value)})}/>
                </div>
                <div>
                    <label>규모</label>
                    <input className="input" type="text" value={project.scale} onChange={(e) => setProject({...project, scale: e.target.value})}/>
                </div>
                <div>
                    <p>설명</p>
                    <textarea className="text-area" value={project.description} onChange={(e) => setProject({...project, description: e.target.value})}/>
                </div>
                <div>
                    <label>이미지</label>
                    <input type="file" accept="image/jpeg" onChange={(e) => {
                        const file = e.target.files[0]
                        setImage(file)
                        makeImageURL(file)
                    }}/>
                    <img src={imageurl ? imageurl : `/images/${name}/1.jpeg`}/>
                </div>
                <button type="submit">수정</button>
            </form>
        </div>
        )
}