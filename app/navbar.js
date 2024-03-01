import Link from "next/link"
import "./navbar.css"

const list =[
    'about',
    'news',
    'project',
    'recruit',
    'contact'
]



export default async function NavBar() {
    
    const listItems = list.map((element, index) => {
        return(
            
        <Link className={`navItem`} key={index} href={`/main/${element}`} scroll={false}>
            <div className={`${element} box`}/>
            <p className=" text-center text-[20px] pt-[-10px]">{element}</p>
        </Link>
        )
    })
    return(
        <div className=" flex mx-auto">
            {listItems}
        </div>
    )
}