import { useEffect, useState } from "react";
import ArticlesCarrousel from "../components/forum/carrousel";
import SearchBar from "../components/forum/searchBar";
import { useFetch } from "../hooks/useFetch";
import { ArticleShortPreview, Category } from "../types";

interface CategoryCarrousel {
  category: Category;
  articles: Array<ArticleShortPreview>;
}

export default function Forum() {
  const CARROUSEL_URLS = [
    "recent",
    "popular",
    "mathematics",
    "software-development",
    "dev-blogs",
    "personal",
  ];
  const { fetcher } = useFetch();
  const [headerCarrousels, setHeaderCarrousels] = useState<
    Array<CategoryCarrousel>
  >([]);
  const [otherCarrousels, setOtherCarrousels] = useState<
    Array<CategoryCarrousel>
  >([]);

  useEffect(() => {
    async function setArticlesByCategory() {
      let urls = [...CARROUSEL_URLS];
      let auxiliar: Array<CategoryCarrousel> = [];

      async function fetchCategoryAndInsert(array: Array<CategoryCarrousel>) {
        const next = urls.shift();
        const response = await fetcher(`/category/${next}/preview`, "GET");
        array.push(response);
      }

      for (let i = 0; i < 2; i++) {
        await fetchCategoryAndInsert(auxiliar);
      }
      setHeaderCarrousels(auxiliar);
      auxiliar = [];
      while (urls.length > 0) {
        await fetchCategoryAndInsert(auxiliar);
      }
      setOtherCarrousels(auxiliar);
    }

    setArticlesByCategory();
  }, []);

  return (
    <main className="max-w-screen-mobileS tablet:max-w-screen-tablet laptopL:max-w-screen-laptopL m-auto w-full px-8">
      <SearchBar />
      <section className="w-full py-6 laptopL:grid laptopL:grid-cols-2 laptopL:gap-8">
        {headerCarrousels.map((data) => (
          <ArticlesCarrousel
            key={data.category.url}
            title={data.category.name}
            categoryRef={data.category.url}
            articles={data.articles}
          />
        ))}
      </section>
      <section>
        {otherCarrousels.map((data) => (
          <ArticlesCarrousel
            key={data.category.url}
            title={data.category.name}
            categoryRef={data.category.url}
            articles={data.articles}
          />
        ))}
      </section>
    </main>
  );
}
