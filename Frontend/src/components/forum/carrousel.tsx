import { Link } from "luciano-react-router";
import ArticleLink from "./articleLink";
import moreIcon from "../../assets/moreRight.svg"

export interface ArticlePreview{
    title : string
    image : string
    date : string
    url : string
}

interface CarrouselProps{
    title : string
    articles : ArticlePreview[]
    categoryRef : string
}

export default function ArticlesCarrousel({title, articles, categoryRef} : CarrouselProps){
    return(
        <article className="w-full mb-8 group">
            <div className="grid grid-cols-[auto_1fr] items-center mb-4">
                <h2 className="text-3xl text-primary-dark mr-3">{title}</h2>
                <div className="hidden laptop:block h-1 w-full bg-primary-light relative -bottom-1"/>
            </div>
            <div className="relative">
                <button className="hidden absolute w-12 h-12 text-2xl justify-center items-center font-bold bg-secondary-light rounded-full -left-6 laptop:group-hover:flex top-1/3 shadow-md shadow-black">{"<"}</button>
                <div className="flex flex-col overflow-x-hidden items-center tablet:flex-row tablet:items-start gap-4 py-4">
                    {
                        articles.map(article => {
                            return <ArticleLink article={article}/>
                        })
                    }
                    <Link href={categoryRef} className="min-w-60 flex items-center justify-center flex-col my-auto">
                        <img src={moreIcon} alt="Right arrow in a circle" className="aspect-square h-12"/>
                        <p className="text-lg font-semibold text-pretty">View more</p>
                    </Link>
                </div>
                <button className="hidden absolute w-12 h-12 text-2xl justify-center items-center font-bold bg-secondary-light rounded-full -right-6 laptop:group-hover:flex top-1/3 shadow-md shadow-black">{">"}</button>
            </div>
        </article>
    )
}