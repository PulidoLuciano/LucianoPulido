import { useEffect, useState } from "react";
import SearchBar from "../components/forum/searchBar"
import ShowExtendedArticles from "../components/forum/showExtended"
import { ArticleExtendedPreview } from "../types"
import { useFetch } from "../hooks/useFetch";

export default function SearchResults(){
    
    const [query, setQuery] = useState(new URLSearchParams(location.search).get("q"));
    const [ articles, setArticles ] = useState<Array<ArticleExtendedPreview>>([]);
    const { fetcher } = useFetch();

    useEffect(() => {
        const onQueryChange = () => {
            setQuery(new URLSearchParams(location.search).get("q"));
        }

        addEventListener("pushstate", onQueryChange);

        return () => {
            removeEventListener("pushstate", onQueryChange);
        } 
    }, []);

    useEffect(() => {
        async function fetchArticles(){
            const response = await fetcher(`/article/search?query=${query}`, "GET");
            setArticles(response);
        }

        fetchArticles();
    }, [query]);

    return(
        <main className="max-w-screen-mobileS tablet:max-w-screen-tablet laptopL:max-w-screen-laptopL m-auto w-full px-8">
            <SearchBar autoFocus={true} value={query as string}/>
            <h1 className="mt-8 text-3xl max-w-screen-laptop mx-auto">Search results: <span className="text-base text-primary-light">{query}</span></h1>
            <ShowExtendedArticles articles={articles}/>
        </main>
    )
}