import { ArticleExtendedPreview } from "../../types";
import ExtendedArticleLink from "./extendedLink";

export default function ShowExtendedArticles({articles} : {articles : ArticleExtendedPreview[]}){
    return(
        <article className="flex flex-col gap-4 py-4 max-w-screen-laptop mx-auto">
            {
                articles.map(article => <ExtendedArticleLink article={article}/>)
            }
        </article>
    )
}