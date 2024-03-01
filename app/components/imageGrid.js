import useSWRInfinite from 'swr/infinite'

const getKey = (pageIndex, prevData) => {
    if(prevData && !prevData.length) return nil;
    return `api/project/page?page=${pageIndex}`
}

const fetcher = async (url) => fetch(url).then(res => res.json())


export default function InfiniteScroll() {
    const {data, error, size, setSize} = useSWRInfinite(getKey, fetcher)
    if(data){
        console.log(data)
        return(
            <div>data</div>
        )
    }
}