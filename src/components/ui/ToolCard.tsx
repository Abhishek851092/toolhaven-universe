
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { ToolType } from '@/data/tools';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/hooks/use-wishlist';

interface ToolCardProps {
  tool: ToolType;
  className?: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, className }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(tool.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(tool.id, tool.name);
  };

  return (
    <Link 
      to={tool.path}
      className={cn(
        "tool-card group animate-scale-in relative h-full", 
        className
      )}
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-5">
          <div className={cn(
            "w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center",
            "bg-primary/10 text-primary dark:bg-primary/20 group-hover:bg-primary/20",
            "transition-all duration-300"
          )}>
            <tool.icon className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <div className="flex items-center space-x-2">
            {tool.new && (
              <Badge className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 hover:bg-green-200 transition-colors">
                New
              </Badge>
            )}
            {tool.featured && (
              <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 hover:bg-amber-200 transition-colors">
                Featured
              </Badge>
            )}
            <span className={cn(
              "category-chip",
              tool.category.color
            )}>
              {tool.category.name}
            </span>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
          {tool.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 flex-grow">
          {tool.description}
        </p>
        
        <div className="inline-flex items-center justify-between w-full mt-auto">
          <div className="inline-flex items-center gap-1 text-sm font-medium text-primary">
            <span>Open Tool</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="transition-transform duration-300 transform group-hover:translate-x-1"
            >
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </div>
          
          <button 
            onClick={handleWishlistClick}
            className="rounded-full p-2 hover:bg-secondary transition-colors"
          >
            <Heart 
              className={cn(
                "w-5 h-5 transition-colors",
                inWishlist ? "fill-red-500 text-red-500" : "text-muted-foreground"
              )} 
            />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ToolCard;
