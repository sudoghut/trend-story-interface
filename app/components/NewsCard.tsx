'use client';

import { ImageWithFallback } from './common/ImageWithFallback';
import { Card, CardContent, Badge } from './ui';
import { User } from 'lucide-react';
import Link from 'next/link';
import { NewsArticle } from '@/types';
import { ERROR_IMG_SRC } from './common/imagePlaceholders';

interface NewsCardProps {
  article: NewsArticle;
  date?: string;
  showMissingImagePlaceholder?: boolean;
}

export function NewsCard({
  article,
  date,
  showMissingImagePlaceholder,
}: NewsCardProps) {
  const imageSrc = article.imageUrl || ERROR_IMG_SRC;
  const imageAlt = article.imageUrl ? article.title : '';

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
      // Mark that we're navigating from within the site
      sessionStorage.setItem('navigated_from_site', 'true');
    }
  };

  return (
    <Link href={href} onClick={handleClick}>
      <Card
        className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
      >
      {showMissingImagePlaceholder ? (
        <div className="relative aspect-video overflow-hidden">
          <ImageWithFallback
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <Badge
            variant="secondary"
            className="absolute top-3 left-3 bg-background/90 text-foreground"
          >
            {article.category}
          </Badge>
        </div>
      ) : (
        <div className="px-4 pt-4">
          <Badge variant="secondary" className="bg-background/90 text-foreground">
            {article.category}
          </Badge>
        </div>
      )}
      
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
