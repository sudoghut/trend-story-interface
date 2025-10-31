// API response types
export interface ApiArticle {
  id: number;
  news: string;
  date: string;
  keywords: string;
  image: { file_name: string; url: string };
  tag: string[];
  serpapi_data_date: string;
}

// Transformed article type for UI
export interface NewsArticle {
  id: number;
  title: string;
  imageUrl: string;
  category: string;
  author: string;
  publishedAt: string;
  fullContent: string;
}

// Transform API article to NewsArticle
export function transformApiArticle(item: ApiArticle): NewsArticle {
  return {
    id: item.id,
    title: item.keywords,
    fullContent: item.news,
    imageUrl: item.image?.url || "",
    category: item.tag?.[0] || "",
    author: "Trending-stories Project",
    publishedAt: item.date || "",
  };
}