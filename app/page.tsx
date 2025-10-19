"use client";

import * as React from "react";
import { useState } from "react";
import { Header } from "./components/Header";
import { NewsGrid } from "./components/NewsGrid";
import { ArticleModal } from "./components/ArticleModal";
import { RelatedArticlesPage } from "./components/RelatedArticlesPage";

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
    author: "Trending-story Project",
    publishedAt: item.date || data.latest_date || "",
  }));
}

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<"home" | "related">("home");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

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

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  const handleRelatedArticlesClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentView("related");
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    setSelectedCategory("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {error ? (
          <div className="text-red-600 text-center py-8">Error: {error}</div>
        ) : loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : currentView === "home" ? (
          <NewsGrid articles={articles} onArticleClick={handleArticleClick} />
        ) : (
          <RelatedArticlesPage
            category={selectedCategory}
            articles={articles}
            onBack={handleBackToHome}
            onArticleClick={handleArticleClick}
          />
        )}
      </main>
      <ArticleModal
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onRelatedArticlesClick={handleRelatedArticlesClick}
      />
      {/* Footer can be added here if needed */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-8">
        <p>Copyright (c) {new Date().getFullYear()} <a href="https://github.com/sudoghut">oopus</a></p>
      </footer>
    </div>
  );
}
