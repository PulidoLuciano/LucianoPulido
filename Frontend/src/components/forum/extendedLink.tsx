import { Link } from "luciano-react-router";
import { ArticleExtendedPreview } from "../../types";

export default function ExtendedArticleLink({article} : {article : ArticleExtendedPreview}){
    return(
        <Link href={`/articles/${article.url}`} className="tablet:grid grid-cols-[auto_auto] gap-4 p-4 bg-white rounded-3xl shadow">
            <img src={article.imageUrl} alt={`${article.title}'s image`} className="max-h-60 aspect-video"/>
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl text-pretty">{article.title}</h2>
                <p className="hidden tablet:block">{article.description}</p>
                <p className="text-gray-500">{new Date(article.date).toLocaleDateString()}</p>
            </div>
        </Link>
    )
}