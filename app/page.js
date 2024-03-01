import Image from "next/image";
import Link from "next/link";
import './homePage.css'
import ImageSlideshow from './components/imageSlideShow'

const list =[
  'about',
  'news',
  'project',
  'recruit',
  'contact'
]

export default function Home(){

  const listItems = list.map((element, index) => {
    return(
        
    <Link className={`navItem`} key={index} href={`/main/${element}`} scroll={false}>
        <div className={`${element} box `}/>
        <p className="text-center text-[20px] pt-[-10px]">{element}</p>
    </Link>
    )
})
return(
    <div className="flex w-[100vw] m-auto h-[100vh] items-center justify-center">
        {listItems}
    </div>
)

}
