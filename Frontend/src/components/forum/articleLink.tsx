import { Link } from "luciano-react-router";
import { ArticlePreview } from "./carrousel";

export default function ArticleLink({article} : {article : ArticlePreview}){
    return(
        <Link href={article.url} className="inline-block max-w-60">
            <img src={article.image} alt="" className="max-w-full min-w-60 aspect-video"/>
            <p className="text-lg font-semibold text-pretty">{article.title}</p>
            <p>{article.date}</p>
        </Link>
    )
}