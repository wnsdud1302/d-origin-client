import Image from 'next/image';


export default function page() {
    return (
        <div className="flex justify-center items-center mx-auto h-[100dvh] bg-white">
            <Image src="/contact.jpeg" alt="contact" width={1500} height={300}/>
        </div>
    )
}