import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";

interface IPosts {
  id: number;
  title: string;
  body: string;
}

function Homepage() {
  const [articles, setArticles] = useState<IPosts[]>([]);

  useEffect(() => {
    fetchArticles();
  });

  async function fetchArticles(): Promise<void> {
    try {
      const cacheName = "my-api-cache";
      const cache = await caches.open(cacheName);
      const cacheResponse = await cache.match(
        "https://jsonplaceholder.typicode.com/posts"
      );

      if (cacheResponse) {
        const cachedData = (await cacheResponse.json()) as IPosts[];
        setArticles(cachedData);
      } else {
        const networkResponse = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = await networkResponse.json();
        cache.put(
          "https://jsonplaceholder.typicode.com/posts",
          new Response(JSON.stringify(data))
        );
        fetchArticles();
      }
    } catch (error) {
      alert(error);
    }
  }
  if (!articles) {
    return <div>Error: Articles not found</div>;
  }

  return (
    <div>
      <h1>Welcome to my blog</h1>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}

export default Homepage;
