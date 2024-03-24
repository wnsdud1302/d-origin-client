import Link from "next/link";

export default function Page(){
    return(
        <div className="grid grid-cols-1 text-center gap-8 mt-[100px] text-xl">
            <Link href='/post/recruit/create'>구인 등록</Link>
            <Link href='/post/recruit/modify'>구인 수정</Link>

        </div>
    )
}