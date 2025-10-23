import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { User, X } from 'lucide-react';
import { Button } from './ui/button';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface NewsArticle {
  id: number;
  title: string;
  imageUrl: string;
  category: string;
  author: string;
  publishedAt: string;
  fullContent: string;
}

interface ArticleModalProps {
  article: NewsArticle | null;
  isOpen: boolean;
  onClose: () => void;
  onRelatedArticlesClick: (category: string) => void;
}

export function ArticleModal({ article, isOpen, onClose, onRelatedArticlesClick }: ArticleModalProps) {
  if (!article) return null;

  // // Generate full article content based on the summary
  // const fullContent = article.fullContent || `
  //   ${article.summary}
    
  //   This breaking news story continues to develop as more information becomes available. Our newsroom is working around the clock to bring you the most accurate and up-to-date reporting on this important story.
    
  //   The implications of these developments are far-reaching and will likely have significant impact on the broader situation. Experts in the field have been weighing in with their analysis and perspectives on what this means for the future.
    
  //   We will continue to monitor this story closely and provide updates as they become available. Stay tuned to NewsDaily for the latest developments and comprehensive coverage of this and other breaking news stories.
    
  //   For more stories like this, explore our ${article.category.toLowerCase()} section where you'll find in-depth reporting and analysis on the issues that matter most.
  // `;

  const fullContent = article.fullContent  || "";
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
            {fullContent}
          </ReactMarkdown>
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
              style={{ display: "none" }} // Hidden for future use
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
