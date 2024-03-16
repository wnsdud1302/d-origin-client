import Image from 'next/image';
import Script from 'next/script';
import Map from './map';


export default function page() {
    return (
        <div className="flex justify-center items-center mx-auto h-[100dvh]">
            <div>
                <Map />
                <div className='mt-[20px] flex'>
                    <div className='mb-[30px]'>
                        <h1 className='font-bold text-[20px] mb-[10px]'>주소</h1>
                        <p>서울특별시</p>
                        <p>도봉구 도봉로 168길 23 k-STAR 빌딩 4층</p>
                    </div>
                    <div className='ml-6'>
                        <h1 className='font-bold text-[20px] mb-[10px]'>건축설계 사업문의</h1>
                        <a href='mailto:cdk@d-origin.kr'>📧 cdk@d-origin.kr</a>
                        <p>☏ 02-955-5105</p>
                        <p>🖨︎ 02-955-5106</p>
                    </div>
                </div>
            </div>
        </div>
    )
}