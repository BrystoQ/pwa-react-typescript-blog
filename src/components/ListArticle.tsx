import React, { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";

interface Article {
  id: number;
  title: string;
  body: string;
}

const ListArticle: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchArticles();
  });

  const fetchArticles = async () => {
    try {
      const cacheName = "my-api-cache";
      const cacheResponse = await caches.match(
        "https://jsonplaceholder.typicode.com/posts"
      );

      if (cacheResponse) {
        const cachedData = await cacheResponse.json();
        setArticles(cachedData);
      } else {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = await response.json();
        setArticles(data);

        const cache = await caches.open(cacheName);
        cache.put(
          "https://jsonplaceholder.typicode.com/posts",
          response.clone()
        );
        fetchArticles();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ListArticle;
