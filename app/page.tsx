"use client";

import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { NewsGrid } from "./components/NewsGrid";
import { Analytics } from "@vercel/analytics/next";
import { NewsArticle, ApiArticle, transformApiArticle } from "@/types";

async function fetchNews(): Promise<NewsArticle[]> {
  const res = await fetch("https://trend-story-api.oopus.info/latest", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch news");
  const data = await res.json();
  return (data.records as ApiArticle[]).map(transformApiArticle);
}

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch news on mount
  useEffect(() => {
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

  // Note: Scroll position saving is handled in NewsCard onClick
  // We don't save on unmount because by that time the scroll position
  // has already been reset to 0, which would overwrite the correct value

  // Restore scroll position after articles are loaded
  useEffect(() => {
    if (!loading && articles.length > 0 && typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const savedPosition = sessionStorage.getItem('scroll_position_' + currentPath);
      
      if (savedPosition) {
        const scrollY = parseInt(savedPosition, 10);
        
        // Use requestAnimationFrame to ensure DOM is fully rendered
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollY);
        });
        
        // Clean up the saved position
        sessionStorage.removeItem('scroll_position_' + currentPath);
      }
    }
  }, [loading, articles]);

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
        <p>Copyright (c) {new Date().getFullYear()} <a href="https://github.com/sudoghut" target="_blank" rel="noopener noreferrer">oopus</a></p>
      </footer>
    </div>
  );
}
