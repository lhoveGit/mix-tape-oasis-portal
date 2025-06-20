
import React from 'react';
import { Search, Music } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <Music className="w-6 h-6 text-purple-400" />
              <span className="text-xl font-bold">MixTape Portal</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search mixtapes, artists, genres..."
                className="pl-10 bg-white/5 border-white/10 focus:border-purple-500"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>

          <nav className="flex items-center space-x-6">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/trending" className="nav-link">Trending</Link>
            <Link to="/new" className="nav-link">New Releases</Link>
            <Link to="/about" className="nav-link">About</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
