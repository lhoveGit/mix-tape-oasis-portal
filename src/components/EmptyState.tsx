
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Music, RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: 'search' | 'music' | 'refresh';
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState = ({ 
  title = "No results found",
  description = "Try adjusting your search or filters",
  icon = 'search',
  actionLabel = "Clear filters",
  onAction
}: EmptyStateProps) => {
  const IconComponent = {
    search: Search,
    music: Music,
    refresh: RefreshCw
  }[icon];

  return (
    <div className="text-center py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-white/10">
            <IconComponent className="w-8 h-8 text-muted-foreground" />
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>
        
        {onAction && (
          <Button 
            onClick={onAction}
            variant="outline"
            className="border-purple-500/30 hover:bg-purple-500/10 hover:border-purple-400"
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
