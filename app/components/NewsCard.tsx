import { Card, CardContent, Badge } from './ui';
import { ImageWithFallback } from './common/ImageWithFallback';
import { User } from 'lucide-react';
import Link from 'next/link';
import { NewsArticle } from '@/types';

interface NewsCardProps {
  article: NewsArticle;
  date?: string;
}

export function NewsCard({ article, date }: NewsCardProps) {
  // Extract yyyymmdd from article.publishedAt (format: 'YYYY-MM-DD HH:mm:ss')
  let yyyymmdd = '';
  if (article.publishedAt) {
    const match = article.publishedAt.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
      yyyymmdd = `${match[1]}${match[2]}${match[3]}`;
    }
  }
  const href = yyyymmdd
    ? `/article/${article.id}?date=${yyyymmdd}`
    : `/article/${article.id}`;

  const handleClick = () => {
    // Save current scroll position before navigating
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      sessionStorage.setItem('scroll_position_' + currentPath, window.scrollY.toString());
    }
  };

  return (
    <Link href={href} onClick={handleClick}>
      <Card
        className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
      >
      <div className="relative aspect-video overflow-hidden">
        <ImageWithFallback
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge
          variant="secondary"
          className="absolute top-3 left-3 bg-background/90 text-foreground"
        >
          {article.category}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <h3 className="line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          
          <p className="text-muted-foreground line-clamp-3">
            {article.fullContent}
          </p>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
            
            <span>{article.publishedAt}</span>
          </div>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
}
