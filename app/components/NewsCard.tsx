import { Card, CardContent, Badge } from './ui';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { User } from 'lucide-react';

interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime?: string;
}

interface NewsCardProps {
  article: NewsArticle;
  onClick: (article: NewsArticle) => void;
}

export function NewsCard({ article, onClick }: NewsCardProps) {
  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
      onClick={() => onClick(article)}
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
            {article.summary}
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
  );
}
