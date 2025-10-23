import { NewsCard } from './NewsCard';
import { NewsArticle } from '@/types';

interface NewsGridProps {
  articles: NewsArticle[];
  date?: string;
}

export function NewsGrid({ articles, date }: NewsGridProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {articles.map((article) => (
          <NewsCard
            key={article.id}
            article={article}
            date={date}
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
