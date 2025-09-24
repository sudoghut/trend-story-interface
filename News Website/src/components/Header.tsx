import { Search, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function Header() {
  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">NewsDaily</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-foreground hover:text-primary transition-colors">Home</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">World</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Politics</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Technology</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Business</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Sports</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Science</a>
          </nav>

          {/* Search */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search news..." 
                className="pl-10 w-64"
              />
            </div>
            <Button variant="ghost" size="icon" className="sm:hidden">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}