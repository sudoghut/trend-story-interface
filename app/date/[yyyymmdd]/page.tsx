"use client";

import * as React from "react";
import { useState } from "react";
import { Header } from "../../components/Header";
import { NewsGrid } from "../../components/NewsGrid";
import { ArticleModal } from "../../components/ArticleModal";
import { RelatedArticlesPage } from "../../components/RelatedArticlesPage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Link from "next/link";

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

// Validate date format (yyyymmdd - 8 digits)
function isValidDateFormat(dateStr: string): boolean {
  return /^\d{8}$/.test(dateStr);
}

// Format yyyymmdd to readable date (e.g., "September 18, 2025")
function formatDateDisplay(yyyymmdd: string): string {
  const year = yyyymmdd.substring(0, 4);
  const month = yyyymmdd.substring(4, 6);
  const day = yyyymmdd.substring(6, 8);
  
  const date = new Date(`${year}-${month}-${day}`);
  
  if (isNaN(date.getTime())) {
    return yyyymmdd;
  }
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Apologization component for when no data is found
function NoDataApology({ formattedDate, dateParam }: { formattedDate: string; dateParam: string }) {
  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 text-muted-foreground"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>
          </div>
          <CardTitle className="text-2xl">No Data Available</CardTitle>
          <CardDescription className="text-base mt-2">
            We apologize, but we don&apos;t have any trend data for <strong>{formattedDate}</strong> ({dateParam})
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            This could be because:
          </p>
          <ul className="text-sm text-muted-foreground space-y-2 text-left max-w-md mx-auto">
            <li className="flex items-start gap-2">
              <span className="mt-0.5">•</span>
              <span>The date is outside our data collection period</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5">•</span>
              <span>Data for this date hasn&apos;t been processed yet</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5">•</span>
              <span>No significant trends were detected on this date</span>
            </li>
          </ul>
          <div className="pt-4 flex gap-3 justify-center flex-wrap">
            <Link href="/">
              <Button variant="default">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                Back to Home
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

async function fetchNewsByDate(yyyymmdd: string): Promise<NewsArticle[]> {
  console.log('[DEBUG] Fetching news for date:', yyyymmdd);
  const res = await fetch(`/api/date/${yyyymmdd}`, {
    cache: "no-store"
  });
  
  console.log('[DEBUG] Response status:', res.status);
  console.log('[DEBUG] Response ok:', res.ok);
  
  if (!res.ok) {
    // Handle 404 error specifically
    if (res.status === 404) {
      console.log('[DEBUG] Got 404 status, attempting to parse JSON...');
      const errorData = await res.json().catch((e) => {
        console.log('[DEBUG] JSON parse error:', e);
        return {};
      });
      console.log('[DEBUG] Parsed error data:', errorData);
      if (errorData.code === 404 && errorData.error === "No data found for the requested date") {
        console.log('[DEBUG] Throwing NO_DATA_FOUND error');
        throw new Error("NO_DATA_FOUND");
      }
    }
    console.log('[DEBUG] Throwing generic fetch error');
    throw new Error("Failed to fetch news for the specified date");
  }
  
  const data = await res.json();
  
  // API returns { date: "...", records: [...] }
  if (!data.records || !Array.isArray(data.records)) {
    return [];
  }
  
  return (data.records as ApiArticle[]).map((item) => ({
    id: item.id,
    title: item.keywords,
    fullContent: item.news,
    imageUrl: item.image?.url || "",
    category: item.tag?.[0] || "",
    author: "Trending-story Project",
    publishedAt: item.date || "",
  }));
}

export default function DateNewsPage({ params }: { params: Promise<{ yyyymmdd: string }> }) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isNoDataFound, setIsNoDataFound] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<"home" | "related">("home");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Unwrap the params Promise using React.use()
  const { yyyymmdd: dateParam } = React.use(params);
  const formattedDate = formatDateDisplay(dateParam);

  // Fetch news on mount
  React.useEffect(() => {
    // Validate date format
    if (!isValidDateFormat(dateParam)) {
      setError("Invalid date format. Please use yyyymmdd format (e.g., 20250918)");
      setLoading(false);
      return;
    }

    setLoading(true);
    setIsNoDataFound(false);
    fetchNewsByDate(dateParam)
      .then((data) => {
        console.log('[DEBUG] Successfully fetched data:', data);
        setArticles(data);
        setLoading(false);
        
        // If no records found, set a specific message
        if (data.length === 0) {
          setError(`No trend data available for ${formattedDate}`);
        }
      })
      .catch((e) => {
        console.log('[DEBUG] Caught error in useEffect:', e);
        console.log('[DEBUG] Error message:', e.message);
        console.log('[DEBUG] Error type:', typeof e.message);
        if (e.message === "NO_DATA_FOUND") {
          console.log('[DEBUG] Setting isNoDataFound to true');
          setIsNoDataFound(true);
        } else {
          console.log('[DEBUG] Setting error message:', e.message);
          setError(e.message || "Unknown error");
        }
        setLoading(false);
      });
  }, [dateParam, formattedDate]);

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
        {/* Date Display Header */}
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center mb-2">
            Trends for {formattedDate}
          </h1>
          <p className="text-center text-muted-foreground">
            Date: {dateParam}
          </p>
        </div>

        {isNoDataFound ? (
          <NoDataApology formattedDate={formattedDate} dateParam={dateParam} />
        ) : error ? (
          <div className="text-red-600 text-center py-8">
            {error}
          </div>
        ) : loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : articles.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No records available for this date
          </div>
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
      {/* Footer */}
      <footer className="text-black text-center py-4 mt-8">
        <p>Copyright (c) {new Date().getFullYear()} <a href="https://github.com/sudoghut" target="_blank">oopus</a></p>
      </footer>
    </div>
  );
}