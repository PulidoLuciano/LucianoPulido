import { Link } from "luciano-react-router";
import ArticleLink from "./articleLink";
import moreIcon from "../../assets/moreRight.svg"
import { useRef, useState } from "react";
import { ArticleShortPreview } from "../../types";

interface CarrouselProps{
    title : string
    articles : Array<ArticleShortPreview>
    categoryRef : string
}

export default function ArticlesCarrousel({title, articles, categoryRef} : CarrouselProps){
    
    const contentDiv = useRef(null);
    const position = useRef(0);
    const [rightVisible, setRightVisible] = useState(true);
    const [leftVisible, setLeftVisible] = useState(false);

    function scrollToNext(){
        if(!contentDiv.current) return;
        if(!leftVisible) setLeftVisible(true);
        position.current += Math.floor((contentDiv.current as HTMLDivElement).clientWidth / 256);
        scrollTo(position.current);
        if(position.current >= articles.length - Math.floor((contentDiv.current as HTMLDivElement).clientWidth / 256)){
            setRightVisible(false);
            return;
        }
    }

    function scrollBehind(){
        if(!contentDiv.current) return;
        if(!rightVisible) setRightVisible(true);
        position.current -= Math.floor((contentDiv.current as HTMLDivElement).clientWidth / 256);
        scrollTo(position.current);
        if(position.current <= 0){
            setLeftVisible(false);
            return;
        }
    }

    function scrollTo(position : number){
        if(!contentDiv.current) return;
        (contentDiv.current as HTMLDivElement).scroll({left: position * 256, behavior: "smooth"});
    }
    
    return(
        <article className="w-full mb-8 group">
            <div className="grid grid-cols-[auto_1fr] items-center mb-4">
                <h2 className="text-3xl text-primary-dark mr-3">{title} articles</h2>
                <div className="hidden laptop:block h-1 w-full bg-primary-light relative -bottom-1"/>
            </div>
            {
                (articles.length > 0) ?
                <div className="relative">
                    {
                        (leftVisible) ? <button className="hidden absolute w-12 h-12 text-2xl justify-center items-center font-bold bg-secondary-light rounded-full -left-6 tablet:flex laptop:group-hover:flex top-1/3 shadow-md shadow-black laptop:hidden" onClick={scrollBehind}>{"<"}</button> : null
                    }
                    <div className="flex flex-col overflow-x-hidden items-center tablet:flex-row tablet:items-start gap-4 py-4" ref={contentDiv}>
                        {
                            articles.map(article => {
                                return <ArticleLink key={article.url} article={article}/>
                            })
                        }
                        <Link href={`/categories/${categoryRef}`} className="min-w-60 flex items-center justify-center flex-col my-auto">
                            <img src={moreIcon} alt="Right arrow in a circle" className="aspect-square h-12"/>
                            <p className="text-lg font-semibold text-pretty">View more</p>
                        </Link>
                    </div>
                    {
                        (rightVisible) ? 
                        <button className="hidden absolute w-12 h-12 text-2xl justify-center items-center font-bold bg-secondary-light rounded-full -right-6 laptop:group-hover:flex top-1/3 shadow-md shadow-black tablet:flex laptop:hidden" onClick={scrollToNext}>{">"}</button> : null
                    }
                </div>
                :
                <p className="text-gray-500">There are going to be articles in this category soon!</p>
            }
        </article>
    )
}