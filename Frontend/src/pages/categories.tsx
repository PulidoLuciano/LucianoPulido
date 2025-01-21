import { useEffect, useState } from "react";
import SearchBar from "../components/forum/searchBar"
import ShowExtendedArticles from "../components/forum/showExtended"
import { useFetch } from "../hooks/useFetch"
import { ArticleExtendedPreview } from "../types"

export default function Category({routeParams} : {routeParams : {categoryName : string}}){
    
    const limit = 10;
    const { fetcher } = useFetch();
    const [ articles, setArticles ] = useState<Array<ArticleExtendedPreview>>([]);
    const [ showMore, setShowMore ] = useState(true);
    const [ offset, setOffset ] = useState(0);

    useEffect(() => {
        async function fetchArticles(){
            const response = await fetcher(`/category/${routeParams.categoryName}/page?limit=${limit}&offset=${0}`, "GET");
            if(response.length < limit) setShowMore(false);
            setArticles(response);
            setOffset(offset + limit);
        }

        fetchArticles();
    }, []);

    async function fetchMoreArticles() {
        const moreArticles = await fetcher(`/category/${routeParams.categoryName}/page?limit=${limit}&offset=${offset}`, "GET");
        if(moreArticles.length < limit) setShowMore(false);
        setOffset(offset + limit);
        setArticles([...articles, ...moreArticles]);
    }
    
    return(
        <main className="max-w-screen-mobileS tablet:max-w-screen-tablet laptopL:max-w-screen-laptopL m-auto w-full px-8">
            <SearchBar/>
            <h1 className="mt-8 text-3xl max-w-screen-laptop mx-auto">Articles of category: <span className="text-primary-light font-semibold">{routeParams.categoryName}</span></h1>
            <ShowExtendedArticles articles={articles}/>
            {
            (showMore) ?
            <button className="text-secondary-dark underline w-full" onClick={fetchMoreArticles}>
                Show more
            </button>
            :
            null
        }
        </main>
    )
}