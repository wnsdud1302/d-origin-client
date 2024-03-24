import Link from 'next/link'

export default function page(){
    return(
        <div className='grid grid-cols-1 text-center gap-8 mt-[100px] text-xl'>
            <Link href={'project/create'}>프로젝트 등록</Link>
            <Link href={'project/modify'}>프로젝트 수정</Link>
        </div>
    )
}