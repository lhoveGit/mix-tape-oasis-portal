
import React from 'react';
import { Button } from '@/components/ui/button';
import { genres } from '../data/mockData';

interface GenreFilterProps {
  selectedGenre: string | null;
  onGenreSelect: (genre: string | null) => void;
}

const GenreFilter = ({ selectedGenre, onGenreSelect }: GenreFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        onClick={() => onGenreSelect(null)}
        variant={selectedGenre === null ? "default" : "outline"}
        className={selectedGenre === null ? "bg-gradient-to-r from-purple-500 to-blue-500" : "border-white/20 hover:bg-white/5"}
      >
        All Genres
      </Button>
      
      {genres.map((genre) => (
        <Button
          key={genre.id}
          onClick={() => onGenreSelect(genre.name)}
          variant={selectedGenre === genre.name ? "default" : "outline"}
          className={
            selectedGenre === genre.name
              ? `bg-gradient-to-r ${genre.color}`
              : "border-white/20 hover:bg-white/5"
          }
        >
          {genre.name}
        </Button>
      ))}
    </div>
  );
};

export default GenreFilter;
