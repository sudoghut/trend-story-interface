import { Header } from "../../components/Header";
import { Badge } from "../../components/ui/badge";
import { ImageWithFallback } from "../../components/common/ImageWithFallback";
import { User } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ApiArticle, transformApiArticle } from "@/types";
import type { Metadata } from "next";

// Fetch article using date param (same approach as old code) with fallback to direct endpoint
async function fetchArticle(id: string, date?: string) {
  try {
    if (date) {
      // Primary path: fetch all articles for the date and find by id
      const res = await fetch(
        `https://trend-story-api.oopus.info/date/${date}`,
        { next: { revalidate: 86400 } }
      );
      if (!res.ok) return null;
      const data = await res.json();
      if (!data.records || !Array.isArray(data.records)) return null;
      const match = (data.records as ApiArticle[]).find(
        (item) => item.id.toString() === id
      );
      return match ? transformApiArticle(match) : null;
    }
    // Fallback: try direct article endpoint
    const res = await fetch(
      `https://trend-story-api.oopus.info/article/${id}`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return transformApiArticle(data as ApiArticle);
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ date?: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { date } = await searchParams;
  const article = await fetchArticle(id, date);
  if (!article) {
    return { title: "Article Not Found | Trending Stories" };
  }
  const description = article.fullContent
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]+`/g, "")
    .replace(/#{1,6}\s[^\n]*/g, "")
    .replace(/\*{1,2}([^*]+)\*{1,2}/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\n+/g, " ")
    .trim()
    .slice(0, 160);
  return {
    title: `${article.title} | Trending Stories`,
    description,
    openGraph: {
      title: article.title,
      description,
      type: "article",
      images: article.imageUrl ? [{ url: article.imageUrl }] : [],
    },
  };
}

export default async function ArticlePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ date?: string }>;
}) {
  const { id } = await params;
  const { date } = await searchParams;
  const article = await fetchArticle(id, date);

  const backHref = date && /^\d{8}$/.test(date) ? `/date/${date}` : "/";

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="text-red-600 text-center py-8">Article not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href={backHref}
            className="inline-flex items-center mb-6 text-sm text-muted-foreground hover:text-foreground gap-1"
          >
            ← Back
          </Link>

          {article.imageUrl ? (
            <div className="relative aspect-video overflow-hidden rounded-lg mb-6">
              <ImageWithFallback
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <Badge
                variant="secondary"
                className="absolute top-4 left-4 bg-background/90 text-foreground"
              >
                {article.category}
              </Badge>
            </div>
          ) : (
            <div className="mb-4">
              <Badge
                variant="secondary"
                className="bg-background/90 text-foreground"
              >
                {article.category}
              </Badge>
            </div>
          )}

          <h1 className="text-3xl font-bold mb-4 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center space-x-4 text-sm text-muted-foreground border-b pb-4 mb-6">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>By {article.author}</span>
            </div>
            <span>{article.publishedAt}</span>
          </div>

          <div className="space-y-4 text-foreground leading-relaxed">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    className="text-3xl font-bold mt-8 mb-4 text-foreground"
                    {...props}
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    className="text-2xl font-bold mt-6 mb-3 text-foreground"
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    className="text-xl font-semibold mt-5 mb-2 text-foreground"
                    {...props}
                  />
                ),
                h4: ({ node, ...props }) => (
                  <h4
                    className="text-lg font-semibold mt-4 mb-2 text-foreground"
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p className="text-base mb-4" {...props} />
                ),
                a: ({ node, ...props }) => (
                  <a
                    className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul
                    className="list-disc list-inside space-y-2 mb-4 ml-4"
                    {...props}
                  />
                ),
                ol: ({ node, ...props }) => (
                  <ol
                    className="list-decimal list-inside space-y-2 mb-4 ml-4"
                    {...props}
                  />
                ),
                li: ({ node, ...props }) => (
                  <li className="text-base" {...props} />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="border-l-4 border-primary/30 pl-4 py-2 my-4 italic text-muted-foreground bg-muted/30 rounded-r"
                    {...props}
                  />
                ),
                code: ({ node, className, children, ...props }) => {
                  const isBlock = className;
                  if (isBlock) {
                    return (
                      <code
                        className={`${className} block bg-muted p-4 rounded-lg text-sm font-mono overflow-x-auto my-4 border border-border`}
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code
                      className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground border border-border"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                pre: ({ node, ...props }) => (
                  <pre className="overflow-x-auto" {...props} />
                ),
                table: ({ node, ...props }) => (
                  <div className="overflow-x-auto my-4">
                    <table
                      className="min-w-full divide-y divide-border border border-border rounded-lg"
                      {...props}
                    />
                  </div>
                ),
                thead: ({ node, ...props }) => (
                  <thead className="bg-muted" {...props} />
                ),
                tbody: ({ node, ...props }) => (
                  <tbody
                    className="divide-y divide-border bg-background"
                    {...props}
                  />
                ),
                tr: ({ node, ...props }) => (
                  <tr
                    className="hover:bg-muted/50 transition-colors"
                    {...props}
                  />
                ),
                th: ({ node, ...props }) => (
                  <th
                    className="px-4 py-3 text-left text-sm font-semibold text-foreground"
                    {...props}
                  />
                ),
                td: ({ node, ...props }) => (
                  <td className="px-4 py-3 text-sm text-foreground" {...props} />
                ),
                hr: ({ node, ...props }) => (
                  <hr className="my-8 border-border" {...props} />
                ),
                strong: ({ node, ...props }) => (
                  <strong className="font-bold text-foreground" {...props} />
                ),
                em: ({ node, ...props }) => (
                  <em className="italic" {...props} />
                ),
              }}
            >
              {article.fullContent}
            </ReactMarkdown>
          </div>

          <div className="border-t pt-6 mt-8">
            <div className="text-sm text-muted-foreground">
              Published on {article.publishedAt} in {article.category}
            </div>
          </div>
        </div>
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
