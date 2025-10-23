"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { User, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const articleId = params.id as string;
  
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchNews()
      .then((articles) => {
        const found = articles.find((a) => a.id.toString() === articleId);
        if (found) {
          setArticle(found);
        } else {
          setError("Article not found");
        }
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message || "Unknown error");
        setLoading(false);
      });
  }, [articleId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="text-center py-8">Loading...</div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="text-red-600 text-center py-8">Error: {error || "Article not found"}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {/* Article Image */}
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
          
          {/* Article Title */}
          <h1 className="text-3xl font-bold mb-4 leading-tight">
            {article.title}
          </h1>
          
          {/* Article Metadata */}
          <div className="flex items-center space-x-4 text-sm text-muted-foreground border-b pb-4 mb-6">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>By {article.author}</span>
            </div>
            <span>{article.publishedAt}</span>
          </div>

          {/* Article Content */}
          <div className="space-y-4 text-foreground leading-relaxed">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-3xl font-bold mt-8 mb-4 text-foreground" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-2xl font-bold mt-6 mb-3 text-foreground" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-xl font-semibold mt-5 mb-2 text-foreground" {...props} />
                ),
                h4: ({ node, ...props }) => (
                  <h4 className="text-lg font-semibold mt-4 mb-2 text-foreground" {...props} />
                ),
                h5: ({ node, ...props }) => (
                  <h5 className="text-base font-semibold mt-3 mb-2 text-foreground" {...props} />
                ),
                h6: ({ node, ...props }) => (
                  <h6 className="text-sm font-semibold mt-3 mb-2 text-foreground" {...props} />
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
                  <ul className="list-disc list-inside space-y-2 mb-4 ml-4" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal list-inside space-y-2 mb-4 ml-4" {...props} />
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
                code: ({ node, inline, ...props }: any) =>
                  inline ? (
                    <code
                      className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground border border-border"
                      {...props}
                    />
                  ) : (
                    <code
                      className="block bg-muted p-4 rounded-lg text-sm font-mono overflow-x-auto my-4 border border-border"
                      {...props}
                    />
                  ),
                pre: ({ node, ...props }) => (
                  <pre className="overflow-x-auto" {...props} />
                ),
                table: ({ node, ...props }) => (
                  <div className="overflow-x-auto my-4">
                    <table className="min-w-full divide-y divide-border border border-border rounded-lg" {...props} />
                  </div>
                ),
                thead: ({ node, ...props }) => (
                  <thead className="bg-muted" {...props} />
                ),
                tbody: ({ node, ...props }) => (
                  <tbody className="divide-y divide-border bg-background" {...props} />
                ),
                tr: ({ node, ...props }) => (
                  <tr className="hover:bg-muted/50 transition-colors" {...props} />
                ),
                th: ({ node, ...props }) => (
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground" {...props} />
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
          
          {/* Article Footer */}
          <div className="border-t pt-6 mt-8">
            <div className="text-sm text-muted-foreground">
              Published on {article.publishedAt} in {article.category}
            </div>
          </div>
        </div>
      </main>
      <footer className="text-black text-center py-4 mt-8">
        <p>Copyright (c) {new Date().getFullYear()} <a href="https://github.com/sudoghut" target="_blank">oopus</a></p>
      </footer>
    </div>
  );
}