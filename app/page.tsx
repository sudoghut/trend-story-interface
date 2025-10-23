"use client";

import * as React from "react";
import { useState } from "react";
import { Header } from "./components/Header";
import { NewsGrid } from "./components/NewsGrid";
import { Analytics } from "@vercel/analytics/next";

interface ApiArticle {
  id: number;
  news: string;
  date: string;
  keywords: string;
  image: { file_name: string; url: string };
  tag: string[];
}

interface NewsArticle {
  id: number;
  title: string;
  imageUrl: string;
  category: string;
  author: string;
  publishedAt: string;
  fullContent: string;
}

async function fetchNews(): Promise<NewsArticle[]> {
  const res = await fetch("https://trend-story-api.oopus.info/latest", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch news");
  const data = await res.json();
  return (data.records as ApiArticle[]).map((item) => ({
    id: item.id,
    title: item.keywords,
    fullContent: item.news,
    imageUrl: item.image?.url || "",
    category: item.tag?.[0] || "",
    author: "Trending-stories Project",
    publishedAt: item.date || "",
  }));
}

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch news on mount
  React.useEffect(() => {
    setLoading(true);
    fetchNews()
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message || "Unknown error");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Analytics />
        {error ? (
          <div className="text-red-600 text-center py-8">Error: {error}</div>
        ) : loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <NewsGrid articles={articles} />
        )}
      </main>
      <footer className="text-black text-center py-4 mt-8">
        <p>Copyright (c) {new Date().getFullYear()} <a href="https://github.com/sudoghut" target="_blank">oopus</a></p>
      </footer>
    </div>
  );
}
