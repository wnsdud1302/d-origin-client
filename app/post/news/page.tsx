import Link from "next/link";

export default function Page(){
    return(
        <div className="grid grid-cols-1 text-center gap-8 mt-[100px]">
            <Link href={'news/create'}>뉴스 만들기</Link>
            <Link href={'news/modify'}>뉴스 수정하기</Link>
        </div>
    )
}