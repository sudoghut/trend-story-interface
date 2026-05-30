import { Header } from "./components/Header";
import { NewsGrid } from "./components/NewsGrid";
import { Analytics } from "@vercel/analytics/next";
import { ApiArticle, transformApiArticle } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trending Stories | Daily U.S. Google Trends",
  description:
    "Explore the stories behind daily U.S. Google Trends. Discover what America is searching for, with in-depth articles on today's top trending topics.",
};

async function fetchLatestNews() {
  try {
    const res = await fetch("https://trend-story-api.oopus.info/latest", {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const records = data.records as ApiArticle[];
    if (!records || records.length === 0) return [];
    const maxDate = records.reduce((max, record) => {
      if (!record.serpapi_data_date) return max;
      if (!max) return record.serpapi_data_date;
      return record.serpapi_data_date > max ? record.serpapi_data_date : max;
    }, records[0]?.serpapi_data_date || "");
    return records
      .filter((r) => r.serpapi_data_date === maxDate)
      .map(transformApiArticle);
  } catch {
    return [];
  }
}

export default async function NewsPage() {
  const articles = await fetchLatestNews();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Analytics />
        {articles.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No articles available at the moment. Please check back later.
          </div>
        ) : (
          <NewsGrid articles={articles} />
        )}
      </main>
      <footer className="text-black text-center py-4 mt-8">
        <p>
          Copyright (c) {new Date().getFullYear()}{" "}
          <a
            href="https://github.com/sudoghut"
            target="_blank"
            rel="noopener noreferrer"
          >
            oopus
          </a>
        </p>
      </footer>
    </div>
  );
}
