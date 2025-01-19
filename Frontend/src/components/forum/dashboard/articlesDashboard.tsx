import { Link } from "luciano-react-router";
import { useFetch } from "../../../hooks/useFetch";
import { useEffect, useState } from "react";
import { ArticleDashboard } from "../../../types";

export default function ArticlesDashboard() {
  const { fetcher } = useFetch();
  const [articlesCount, setArticlesCount] = useState<number>(0);
  const [viewsCount, setViewsCount] = useState<number>(0);
  const [articles, setArticles] = useState<Array<ArticleDashboard>>([]);
  const [offset, setOffset] = useState<number>(0);
  const [searchTimeout, setSearchTimeout] = useState<number | null>(null);
  const limit : number = 10;

  useEffect(() => {
    async function fetchData() {
      let data: { count: number } = await fetcher("/article/count", "GET");
      setArticlesCount(data.count);
      data = await fetcher("/article/count/views", "GET");
      setViewsCount(data.count);
      await fetchFirstArticles();
    }

    fetchData();
  }, []);

  async function fetchFirstArticles() {
    const articlesData = await fetcher(`/article/dashboard?limit=${limit}&offset=${0}`, "GET");
    setArticles(articlesData);
    setOffset(0 + limit);
  }
  
  async function fetchMoreArticles() {
    const moreArticles = await fetcher(`/article/dashboard?limit=${limit}&offset=${offset}`, "GET");
    setOffset(offset + limit);
    setArticles([...articles, ...moreArticles]);
  }

  async function deleteArticle(article: ArticleDashboard) {
    try {
      await fetcher(`/article/${article.url}`, "DELETE");
    } catch (error) {
        if((error as Error).message == "Failed to execute 'json' on 'Response': Unexpected end of JSON input"){
        setArticles(articles.filter(a => a.url !== article.url));
        setArticlesCount(articlesCount - 1);
      }else{
        console.error("Error deleting article:", error);
      }
    }
  }

  async function searchArticles(event : React.SyntheticEvent<HTMLInputElement>) {
    const searchQuery = (event.target as HTMLInputElement).value;

    if(searchTimeout) clearTimeout(searchTimeout);

    if(searchQuery === "") return fetchFirstArticles();

    const newTimeout = setTimeout(async () => {
      const data = await fetcher(`/article/dashboard/search?query=${searchQuery}`, "GET");
      setArticles(data);
    }, 500);

    setSearchTimeout(newTimeout);
  }

  return (
    <article>
      <section className="flex justify-between">
        <h2 className="text-2xl font-semibold">Articles</h2>
        <Link
          href="/admin/articles/add"
          className="bg-secondary-light font-semibold px-4 py-1 rounded-md"
        >
          ⊕ Add new article
        </Link>
      </section>
      <section className="flex justify-around py-4">
        <span>
          <p className="text-gray-500 italic">Quantity</p>
          <p className="text-2xl">{articlesCount}</p>
        </span>
        <span>
          <p className="text-gray-500 italic">Views</p>
          <p className="text-2xl">{viewsCount}</p>
        </span>
      </section>
      <section className="w-full py-1 flex">
        <span className="bg-white rounded-3xl rounded-r-none hover:cursor-pointer px-3 text-center flex items-center border-2 border-primary-light border-r-0">
          🔎
        </span>
        <input
          type="search"
          name="search"
          className="w-full rounded-3xl p-2 rounded-l-none border-2 border-primary-light border-l-0 focus:outline-none"
          placeholder="Search for an article"
          autoComplete="off"
          onChange={searchArticles}
        />
      </section>
      <section className="border-2 border-primary-light rounded-3xl h-96 overflow-auto px-4 py-4">
        {articles.length ? (
          articles.map((article, index) => (
            <article className="w-full justify-between mb-3" key={index}>
              <Link className="font-semibold" href={`/articles/${article.url}`}>
                {article.title}
              </Link>
              <div className="flex gap-2">
                <p>👁 {article.views}</p>
                <p>🗨 {article.comments}</p>
                <button className="px-1" onClick={() => deleteArticle(article)}>
                🗑️
                </button>
                <Link
                  href={`/admin/articles/edit/${article.url}`}
                  className="px-1"
                >
                  🖊️
                </Link>
              </div>
            </article>
          ))
        ) : (
          <p>There's no articles</p>
        )}
        {
            (articles.length < articlesCount) ?
            <button className="text-secondary-dark underline w-full" onClick={fetchMoreArticles}>
                Show more
            </button>
            :
            null
        }
      </section>
    </article>
  );
}
