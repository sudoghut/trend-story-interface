import { Search, Menu, Github } from 'lucide-react';
import { Button } from './ui/button';


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
            <div className="flex items-end">
              <h1 className="text-2xl font-bold text-primary">Trending Stories</h1>
              <span className="ml-2 text-sm text-muted-foreground">Explore the stories behind daily <a href="https://trends.google.com/trends/trendingsearches/daily" target='_blank'>U.S. Google Trends</a></span>
            </div>
          </div>

          {/* GitHub Badge */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              asChild
            >
              <a
                href="https://github.com/sudoghut/trends-story"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>
          </div>
          {/* Navigation */}
          {/* <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-foreground hover:text-primary transition-colors">Home</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">World</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Politics</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Technology</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Business</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Sports</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Science</a>
          </nav> */}

          {/* Search */}
          {/* <div className="flex items-center space-x-4">
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
          </div> */}
          </div>
        </div>
    </header>
  );
}
