import { Header } from "../../components/Header";
import { NewsGrid } from "../../components/NewsGrid";
import { ApiArticle, transformApiArticle } from "@/types";
import type { Metadata } from "next";
import Link from "next/link";

function formatDateDisplay(yyyymmdd: string): string {
  const year = yyyymmdd.substring(0, 4);
  const month = yyyymmdd.substring(4, 6);
  const day = yyyymmdd.substring(6, 8);
  const date = new Date(`${year}-${month}-${day}`);
  if (isNaN(date.getTime())) return yyyymmdd;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

async function fetchNewsByDate(yyyymmdd: string) {
  try {
    const res = await fetch(
      `https://trend-story-api.oopus.info/date/${yyyymmdd}`,
      { next: { revalidate: 86400 } }
    );
    if (res.status === 404) return null;
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.records || !Array.isArray(data.records)) return [];
    return (data.records as ApiArticle[]).map(transformApiArticle);
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ yyyymmdd: string }>;
}): Promise<Metadata> {
  const { yyyymmdd } = await params;
  const formattedDate = formatDateDisplay(yyyymmdd);
  return {
    title: `Google Trends for ${formattedDate} | Trending Stories`,
    description: `Top trending news stories from U.S. Google Trends on ${formattedDate}. Discover what America was searching for on this day.`,
  };
}

export default async function DateNewsPage({
  params,
}: {
  params: Promise<{ yyyymmdd: string }>;
}) {
  const { yyyymmdd } = await params;
  const formattedDate = formatDateDisplay(yyyymmdd);
  const articles = await fetchNewsByDate(yyyymmdd);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center mb-2">
            Trends for {formattedDate}
          </h1>
        </div>

        {articles === null || articles.length === 0 ? (
          <div className="container mx-auto px-4 py-12 text-center">
            <p className="text-muted-foreground mb-4">
              No trend data available for {formattedDate}.
            </p>
            <Link href="/" className="text-primary underline">
              Back to Home
            </Link>
          </div>
        ) : (
          <NewsGrid articles={articles} date={yyyymmdd} />
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
