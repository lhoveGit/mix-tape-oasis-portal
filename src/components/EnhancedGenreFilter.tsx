
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { genres } from '../data/mockData';

interface EnhancedGenreFilterProps {
  selectedGenre: string | null;
  onGenreSelect: (genre: string | null) => void;
  className?: string;
}

const EnhancedGenreFilter = ({ selectedGenre, onGenreSelect, className = '' }: EnhancedGenreFilterProps) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Filter by Genre</h3>
        {selectedGenre && (
          <Badge variant="outline" className="text-xs">
            {selectedGenre} selected
          </Badge>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => onGenreSelect(null)}
          variant={selectedGenre === null ? "default" : "outline"}
          size="sm"
          className={`transition-all duration-300 hover:scale-105 ${
            selectedGenre === null 
              ? "bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/25" 
              : "border-white/20 hover:bg-white/5 hover:border-purple-400/50"
          }`}
        >
          All Genres
          {selectedGenre === null && <span className="ml-1 text-xs">✨</span>}
        </Button>
        
        {genres.map((genre) => (
          <Button
            key={genre.id}
            onClick={() => onGenreSelect(genre.name)}
            variant={selectedGenre === genre.name ? "default" : "outline"}
            size="sm"
            className={`transition-all duration-300 hover:scale-105 ${
              selectedGenre === genre.name
                ? `bg-gradient-to-r ${genre.color} shadow-lg`
                : "border-white/20 hover:bg-white/5 hover:border-opacity-50"
            }`}
          >
            {genre.name}
            {selectedGenre === genre.name && <span className="ml-1 text-xs">🎵</span>}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default EnhancedGenreFilter;
