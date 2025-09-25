import { ArrowLeft, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui';
import { NewsCard } from './NewsCard';

interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
  category: string;
  author: string;
  publishedAt: string;
}

interface RelatedArticlesPageProps {
  category: string;
  articles: NewsArticle[];
  onBack: () => void;
  onArticleClick: (article: NewsArticle) => void;
}

export function RelatedArticlesPage({ 
  category, 
  articles, 
  onBack, 
  onArticleClick 
}: RelatedArticlesPageProps) {
  // Filter articles by category and exclude current article if needed
  const relatedArticles = articles.filter(article => 
    article.category.toLowerCase() === category.toLowerCase()
  );

  const totalArticles = relatedArticles.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="border-b bg-background sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onBack}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
              
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl">Related Articles</h1>
                <Badge variant="secondary" className="px-3 py-1">
                  {category}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>{totalArticles} articles found</span>
              </div>
              
              <Select defaultValue="latest">
                <SelectTrigger className="w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Category Description */}
          <div className="mt-4 p-4 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground">
              Discover more stories from our <span className="text-foreground font-medium">{category}</span> section. 
              Stay informed with comprehensive coverage and in-depth analysis from our expert journalists.
            </p>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <main className="container mx-auto px-4 py-8">
        {relatedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {relatedArticles.map((article) => (
              <NewsCard 
                key={article.id} 
                article={article}
                onClick={onArticleClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                <Filter className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl">No related articles found</h3>
              <p className="text-muted-foreground">
                We couldn't find any articles in the <span className="font-medium">{category}</span> category at the moment. 
                Check back later for new content.
              </p>
              <Button variant="outline" onClick={onBack}>
                Browse All Articles
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Load More Section */}
      {relatedArticles.length > 0 && (
        <div className="container mx-auto px-4 pb-12">
          <div className="text-center">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
            <p className="text-sm text-muted-foreground mt-3">
              Showing {Math.min(relatedArticles.length, 20)} of {totalArticles} articles
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
