import { NewsCard } from './NewsCard';

interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
}

interface NewsGridProps {
  articles: NewsArticle[];
  onArticleClick: (article: NewsArticle) => void;
}

export function NewsGrid({ articles, onArticleClick }: NewsGridProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="mb-2">Latest News</h2>
        <p className="text-muted-foreground">Stay updated with the latest news from around the world</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {articles.map((article) => (
          <NewsCard 
            key={article.id} 
            article={article}
            onClick={onArticleClick}
          />
        ))}
      </div>
      
      {articles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No news articles available at the moment.</p>
        </div>
      )}
    </div>
  );
}