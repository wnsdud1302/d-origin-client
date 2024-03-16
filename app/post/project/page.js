import Link from 'next/link'

export default function page(){
    return(
        <div className='grid grid-cols-1 text-center gap-8 mt-[100px]'>
            <Link href={'project/create'}>프로젝트 만들기</Link>
            <Link href={'project/modify'}>프로젝트 수정하기</Link>
            <Link href={'project/delete'}>프로젝트 삭제하기</Link>
        </div>
    )
}