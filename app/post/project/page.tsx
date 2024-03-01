'use client'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { FormEvent, useState } from 'react';

interface Project{
    name: string,
    description: string,
    area: number,
    scale: string,
}

function PostProject(){

    const {data: session, status } = useSession()

    if(status === 'unauthenticated'){
        redirect('/api/auth/signin')
    }

    const [category, setCategory] = useState<string>('')
    const [project, setPorject] = useState<Project>({
        name: '',
        description: '',
        area: 0,
        scale: ''
    })
    const [image, setImage] = useState<FileList>()
    const [imageurls, setImageUrls] = useState<string[]>([])

    const [sendding, setSendding] = useState<boolean>(false)

    const makeImageUrls = (files: FileList) => {
        const length = files.length
        for(let i = 0; i< length; i++){
            let image = window.URL.createObjectURL(files[i])
            imageurls.push(image)
            setImageUrls([...imageurls])
        }
    }


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()
        for(const key in project){
            formData.append(key, project[key])
        }
        if(image){
            for(let i = 0; i< image.length; i++){
                formData.append('image', image[i])
            }
        }
        setPorject({name: '', description: '', area: 0, scale: ''})
        setCategory('')
        setImageUrls([])
        setImage(undefined)

        setSendding(true)
        try{
        const resText = await fetch(`/api/project/create?category=${category}`, {
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
            <h1 className=' ml-[50px] text-7xl'>{!sendding ? '프로젝트 생성' : '보내는중'}</h1>
            <form className="grid grid-cols-1 gap-10 text-xl mt-[40px] mx-auto w-[80dvw]" 
                   onSubmit={handleSubmit}
                   encType='multipart/form-data'
                   >
                <div>
                    <p>카테고리</p>
                    <input  className='input' value={category} onChange={(e) => {
                        setCategory(e.target.value)
                    }}/>
                </div>
                <div>
                    <p>이름 </p>
                    <input className='input' value={project.name} onChange={(e) => 
                        {
                            setPorject({...project, name: e.target.value})
                    }}></input>
                </div>                
                <div>
                    <p>연면적</p>
                    <input type='number' className='input' value={project.area} onChange={(e) => {
                        setPorject({...project, area: parseFloat(e.target.value)})    
                    }
                    }></input>
                </div>
                <div>
                    <p>규모</p>
                    <input className='input' value={project.scale} onChange={(e) => {
                        setPorject({...project, scale: e.target.value})
                    }}></input>
                </div>
                <div>
                    <p>설명</p>
                    <textarea className='text-area' value={project.description} onChange={(e) => {
                        setPorject({...project, description: e.target.value})
                    }}></textarea>
                </div>
                <div>
                    <input className='' type='file' 
                    multiple={true}
                    accept='image/jpg' 
                    onChange={e=>{
                        const file = e.target.files
                        makeImageUrls(file)
                        setImage(file)
                    }}/>
                    <div className='grid grid-cols-3'>
                        {imageurls && imageurls.map((url, index) => {
                            return <img key={index} src={url} width='500px'/>
                        })}
                    </div>
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}
export default PostProject;

