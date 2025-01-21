import { Article } from "../../types";
import BodyParser from "./bodyParser";

export default function ArticleBody({article} : {article : Article}){
    return(
        <>
            <section className="py-4 laptop:max-w-screen-tablet m-auto w-full px-2">
                <h1 className="text-5xl text-pretty font-semibold pb-1">{article.title}</h1>
                <p className="text-xl font-light pb-2">{article.description}</p>
                <p className="text-right text-gray-500">{new Date(article.date).toLocaleDateString()}</p>
                <img src={article.imageUrl} alt="" />
            </section>
            <section className="pb-4">
                <BodyParser body={article.body}/>
            </section>
        </>
    )
}