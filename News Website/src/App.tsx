import { useState } from 'react';
import { Header } from './components/Header';
import { NewsGrid } from './components/NewsGrid';
import { ArticleModal } from './components/ArticleModal';
import { RelatedArticlesPage } from './components/RelatedArticlesPage';
import { mockNewsData } from './data/mockNewsData';

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

export default function App() {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'related'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  const handleRelatedArticlesClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentView('related');
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedCategory('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background Content with Conditional Blur */}
      <div className={`transition-all duration-300 ${isModalOpen ? 'blur-sm' : ''}`}>
        {currentView === 'home' && <Header />}
        
        {currentView === 'home' ? (
          <main>
            <NewsGrid 
              articles={mockNewsData} 
              onArticleClick={handleArticleClick}
            />
          </main>
        ) : (
          <RelatedArticlesPage
            category={selectedCategory}
            articles={mockNewsData}
            onBack={handleBackToHome}
            onArticleClick={handleArticleClick}
          />
        )}
        
        {currentView === 'home' && (
          <footer className="border-t bg-muted/30 mt-16">
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="mb-4">NewsDaily</h3>
                  <p className="text-muted-foreground">Your trusted source for breaking news and in-depth reporting from around the world.</p>
                </div>
                
                <div>
                  <h4 className="mb-4">Categories</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><a href="#" className="hover:text-primary transition-colors">World</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">Politics</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">Technology</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">Business</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="mb-4">Company</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="mb-4">Connect</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><a href="#" className="hover:text-primary transition-colors">Newsletter</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">RSS Feed</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">Social Media</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">Mobile App</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
                <p>&copy; 2025 NewsDaily. All rights reserved.</p>
              </div>
            </div>
          </footer>
        )}
      </div>
      
      {/* Modal - Always on Top */}
      <ArticleModal 
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onRelatedArticlesClick={handleRelatedArticlesClick}
      />
    </div>
  );
}