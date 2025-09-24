import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { User, X } from 'lucide-react';
import { Button } from './ui/button';

interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  fullContent?: string;
}

interface ArticleModalProps {
  article: NewsArticle | null;
  isOpen: boolean;
  onClose: () => void;
  onRelatedArticlesClick: (category: string) => void;
}

export function ArticleModal({ article, isOpen, onClose, onRelatedArticlesClick }: ArticleModalProps) {
  if (!article) return null;

  // Generate full article content based on the summary
  const fullContent = article.fullContent || `
    ${article.summary}
    
    This breaking news story continues to develop as more information becomes available. Our newsroom is working around the clock to bring you the most accurate and up-to-date reporting on this important story.
    
    The implications of these developments are far-reaching and will likely have significant impact on the broader situation. Experts in the field have been weighing in with their analysis and perspectives on what this means for the future.
    
    We will continue to monitor this story closely and provide updates as they become available. Stay tuned to NewsDaily for the latest developments and comprehensive coverage of this and other breaking news stories.
    
    For more stories like this, explore our ${article.category.toLowerCase()} section where you'll find in-depth reporting and analysis on the issues that matter most.
  `;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          {/* Article Image */}
          <div className="relative aspect-video overflow-hidden rounded-lg">
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
          <DialogTitle className="text-left leading-tight">
            {article.title}
          </DialogTitle>
          
          {/* Article Metadata */}
          <div className="flex items-center space-x-4 text-sm text-muted-foreground border-b pb-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>By {article.author}</span>
            </div>
            
            <span>{article.publishedAt}</span>
          </div>
        </DialogHeader>
        
        {/* Article Content */}
        <div className="space-y-4 text-foreground leading-relaxed">
          {fullContent.split('\n').map((paragraph, index) => (
            paragraph.trim() && (
              <p key={index} className="text-base">
                {paragraph.trim()}
              </p>
            )
          ))}
        </div>
        
        {/* Article Footer */}
        <div className="border-t pt-6 mt-8">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Published on {article.publishedAt} in {article.category}
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onRelatedArticlesClick(article.category)}
            >
              Related Articles
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}