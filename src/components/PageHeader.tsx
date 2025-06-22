
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface PageHeaderProps {
  title: string;
  description: string;
  emoji?: string;
  badge?: string;
  gradient?: string;
}

const PageHeader = ({ 
  title, 
  description, 
  emoji,
  badge,
  gradient = "from-purple-400 to-blue-400"
}: PageHeaderProps) => {
  return (
    <div className="mb-8 text-center lg:text-left">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
        <h1 className={`text-3xl lg:text-5xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-2 lg:mb-0`}>
          {emoji && <span className="mr-2">{emoji}</span>}
          {title}
        </h1>
        {badge && (
          <Badge 
            variant="outline" 
            className="w-fit mx-auto lg:mx-0 bg-white/5 border-purple-500/30 text-purple-400"
          >
            {badge}
          </Badge>
        )}
      </div>
      <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl">
        {description}
      </p>
    </div>
  );
};

export default PageHeader;
