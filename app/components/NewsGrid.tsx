import { NewsCard } from './NewsCard';

interface NewsArticle {
  id: number;
  title: string;
  imageUrl: string;
  category: string;
  author: string;
  publishedAt: string;
  fullContent: string;
}

interface NewsGridProps {
  articles: NewsArticle[];
  onArticleClick: (article: NewsArticle) => void;
}

export function NewsGrid({ articles, onArticleClick }: NewsGridProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        {/* <h2 className="mb-2">Latest News</h2> */}
        <p className="text-muted-foreground">Explore the stories behind daily <a href="https://trends.google.com/trends/trendingsearches/daily">U.S. Google Trends</a></p>
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
