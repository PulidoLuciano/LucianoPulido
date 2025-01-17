import { Link } from "luciano-react-router";
import { ArticleShortPreview } from "../../types";

export default function ArticleLink({article} : {article : ArticleShortPreview}){
    return(
        <Link href={`/articles/${article.url}`} className="inline-block w-60 h-60">
            <img src={article.imageUrl} alt="" className="max-w-full min-w-60 aspect-video"/>
            <p className="text-lg font-semibold text-pretty">{article.title}</p>
            <p>{article.date}</p>
        </Link>
    )
}