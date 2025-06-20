
import React from 'react';
import { Heart, Share, Download, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mixtape } from '../types/mixtape';

interface MixtapeCardProps {
  mixtape: Mixtape;
  onPlay: (mixtape: Mixtape) => void;
  onDownload: (mixtape: Mixtape) => void;
  onLike: (mixtapeId: string) => void;
  onShare: (mixtape: Mixtape) => void;
}

const MixtapeCard = ({ mixtape, onPlay, onDownload, onLike, onShare }: MixtapeCardProps) => {
  const handleDownload = () => {
    // Open monetag link first, then trigger download after delay
    window.open('https://otieu.com/4/7303820', '_blank');
    setTimeout(() => {
      onDownload(mixtape);
    }, 2000);
  };

  const handleShare = () => {
    const shareUrl = window.location.origin + `/mixtape/${mixtape.id}`;
    const shareText = `Check out ${mixtape.title} by ${mixtape.artist} on MixTape Portal`;
    
    if (navigator.share) {
      navigator.share({
        title: mixtape.title,
        text: shareText,
        url: shareUrl,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${shareText} - ${shareUrl}`).then(() => {
        // You can add a toast notification here if needed
        console.log('Link copied to clipboard');
      }).catch(console.error);
    }
  };

  return (
    <div className="mixtape-card group w-full max-w-sm mx-auto">
      {mixtape.featured && (
        <Badge className="absolute top-3 left-3 z-10 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold">
          Featured
        </Badge>
      )}
      
      <Link to={`/mixtape/${mixtape.id}`}>
        <div className="relative aspect-square overflow-hidden rounded-t-xl">
          <img
            src={mixtape.coverArt}
            alt={mixtape.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              onClick={(e) => {
                e.preventDefault();
                onPlay(mixtape);
              }}
              size="lg"
              className="rounded-full bg-white/20 backdrop-blur-lg border border-white/30 hover:bg-white/30"
            >
              <Play className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </Link>

      <div className="p-4 space-y-3">
        <Link to={`/mixtape/${mixtape.id}`} className="block hover:opacity-80 transition-opacity">
          <div>
            <h3 className="font-semibold text-lg truncate">{mixtape.title}</h3>
            <p className="text-muted-foreground text-sm">{mixtape.artist}</p>
          </div>
        </Link>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{mixtape.duration}</span>
          <Badge variant="outline" className="border-purple-500/30 text-purple-400 text-xs">
            {mixtape.genre}
          </Badge>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{mixtape.playCount.toLocaleString()} plays</span>
          <span>{mixtape.likes} likes</span>
        </div>

        <div className="grid grid-cols-3 gap-1">
          <Button
            onClick={() => onLike(mixtape.id)}
            variant="ghost"
            size="sm"
            className="hover:bg-red-500/10 hover:text-red-400 text-xs"
          >
            <Heart className="w-3 h-3 mr-1" />
            Like
          </Button>
          
          <Button
            onClick={handleShare}
            variant="ghost"
            size="sm"
            className="hover:bg-blue-500/10 hover:text-blue-400 text-xs"
          >
            <Share className="w-3 h-3 mr-1" />
            Share
          </Button>
          
          <Button
            onClick={handleDownload}
            variant="ghost"
            size="sm"
            className="hover:bg-green-500/10 hover:text-green-400 text-xs"
          >
            <Download className="w-3 h-3 mr-1" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MixtapeCard;
