import { useEffect, useState } from "react";
import ArticlesCarrousel from "../components/forum/carrousel";
import SearchBar from "../components/forum/searchBar";
import { useFetch } from "../hooks/useFetch";
import { Category, CategoryCarrousel } from "../types";
import { Link } from "luciano-react-router";

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
  const [categories, setCategories] = useState<Array<Category>>([]);

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

    async function fetchCategories() {
      const response = await fetcher("/category", "GET");
      setCategories(response);
    }

    setArticlesByCategory();
    fetchCategories();
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
      <section className="py-6">
        <div className="grid grid-cols-[auto_1fr] items-center mb-4">
          <h2 className="text-3xl text-primary-dark mr-3">
            Find your favorite category
          </h2>
          <div className="hidden laptop:block h-1 w-full bg-primary-light relative -bottom-1" />
        </div>
        {categories.length ? (
          <div className="grid grid-cols-3 gap-6">
            {categories.map((category) => (
                <Link
                  href={`/categories/${category.url}`}
                  className="text-2xl text-center underline text-primary-dark hover:text-primary-light"
                >
                  {category.name}
                </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">There are not any category yet</p>
        )}
      </section>
    </main>
  );
}
