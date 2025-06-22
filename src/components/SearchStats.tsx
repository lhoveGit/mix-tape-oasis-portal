
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendingUp, Star } from 'lucide-react';

interface SearchStatsProps {
  totalResults: number;
  searchQuery?: string;
  selectedGenre?: string | null;
  averageRating?: number;
  trending?: boolean;
}

const SearchStats = ({ 
  totalResults, 
  searchQuery, 
  selectedGenre, 
  averageRating = 4.2,
  trending = false 
}: SearchStatsProps) => {
  return (
    <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-lg border border-white/10 rounded-xl p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            Search Results
            {trending && <TrendingUp className="w-4 h-4 text-orange-400" />}
          </h2>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-white">{totalResults.toLocaleString()}</span> mixtapes found
            {searchQuery && (
              <span> for "<span className="text-purple-400 font-medium">{searchQuery}</span>"</span>
            )}
            {selectedGenre && (
              <span> in <span className="text-blue-400 font-medium">{selectedGenre}</span></span>
            )}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-white/5 border-green-500/30 text-green-400">
            <Clock className="w-3 h-3 mr-1" />
            Live Results
          </Badge>
          
          <Badge variant="outline" className="bg-white/5 border-yellow-500/30 text-yellow-400">
            <Star className="w-3 h-3 mr-1" />
            {averageRating} avg rating
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default SearchStats;
