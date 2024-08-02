import { useEffect, useState } from "react";
import SearchBar from "../components/forum/searchBar"
import ShowExtendedArticles from "../components/forum/showExtended"
import { ArticleExtendedPreview } from "../types"

const example : ArticleExtendedPreview[] = [
    {
        title: "How to made your react app easy and well stated",
        date: "07/13/2024",
        image: "https://e1.pxfuel.com/desktop-wallpaper/556/915/desktop-wallpaper-how-to-install-reactjs-frontend.jpg",
        url: "/articles/how-to-made-your-react-app-easy-and-well-stated",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus in expedita aspernatur ipsam! Nisi voluptatibus ducimus voluptatem vel dignissimos."
    },
    {
        title: "Use probabilities and linear programming to calculate your resources",
        date: "06/11/2024",
        image: "https://files.realpython.com/media/Linear-Programming-in-Python_Watermarked.88e2dbe17fbf.jpg",
        url: "/articles/how-to-made-your-react-app-easy-and-well-stated",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus in expedita aspernatur ipsam! Nisi voluptatibus ducimus voluptatem vel dignissimos."
    },
    {
        title: "Dev blog 1: I started a new project",
        date: "07/13/2024",
        image: "https://dcgamedevblog.wordpress.com/wp-content/uploads/2014/09/game-bg-1.png",
        url: "/articles/how-to-made-your-react-app-easy-and-well-stated",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus in expedita aspernatur ipsam! Nisi voluptatibus ducimus voluptatem vel dignissimos."
    },
    {
        title: "How to made your react app easy and well stated",
        date: "07/13/2024",
        image: "https://e1.pxfuel.com/desktop-wallpaper/556/915/desktop-wallpaper-how-to-install-reactjs-frontend.jpg",
        url: "/articles/how-to-made-your-react-app-easy-and-well-stated",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus in expedita aspernatur ipsam! Nisi voluptatibus ducimus voluptatem vel dignissimos."
    },
    {
        title: "Use probabilities and linear programming to calculate your resources",
        date: "06/11/2024",
        image: "https://files.realpython.com/media/Linear-Programming-in-Python_Watermarked.88e2dbe17fbf.jpg",
        url: "/articles/how-to-made-your-react-app-easy-and-well-stated",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus in expedita aspernatur ipsam! Nisi voluptatibus ducimus voluptatem vel dignissimos."
    }
]

export default function SearchResults(){
    
    const [query, setQuery] = useState(new URLSearchParams(location.search).get("q"));

    useEffect(() => {
        const onQueryChange = () => {
            setQuery(new URLSearchParams(location.search).get("q"));
        }

        addEventListener("pushstate", onQueryChange);

        return () => {
            removeEventListener("pushstate", onQueryChange);
        } 
    }, [])
    
    return(
        <main className="max-w-screen-mobileS tablet:max-w-screen-tablet laptopL:max-w-screen-laptopL m-auto w-full px-8">
            <SearchBar autoFocus={true} value={query as string}/>
            <h1 className="mt-8 text-3xl">Search results: <span className="text-base text-primary-light">{query}</span></h1>
            <ShowExtendedArticles articles={example}/>
        </main>
    )
}