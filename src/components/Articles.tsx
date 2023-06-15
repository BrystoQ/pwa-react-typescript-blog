import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface IArticle {
  title: string;
  body: string;
}

const Article: React.FC = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<IArticle | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  });

  async function fetchData() {
    try {
      const cacheName = "my-api-cache";
      const cache = await caches.open(cacheName);
      const cacheResponse = await cache.match(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      if (cacheResponse) {
        const cachedData = (await cacheResponse.json()) as IArticle;
        setArticle(cachedData);
      } else {
        const networkResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        const data = await networkResponse.json();
        cache.put(
          `https://jsonplaceholder.typicode.com/posts/${id}`,
          new Response(JSON.stringify(data))
        );
        fetchData();
      }
    } catch (error) {
      alert("l'article n'est pas en cache");
      navigate(-1);
    }
  }

  if (!article) {
    return <div>Error: Article not found</div>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.body}</p>
    </div>
  );
};

export default Article;
