
import React, { useState } from 'react';
import { play, skip-back, skip-forward, like, share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Mixtape } from '../types/mixtape';

interface MusicPlayerProps {
  currentMixtape: Mixtape | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onLike: (mixtapeId: string) => void;
  onShare: (mixtape: Mixtape) => void;
}

const MusicPlayer = ({
  currentMixtape,
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
  onLike,
  onShare,
}: MusicPlayerProps) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(75);

  if (!currentMixtape) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-t border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-4">
          {/* Current Track Info */}
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <img
              src={currentMixtape.coverArt}
              alt={currentMixtape.title}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="min-w-0">
              <h4 className="font-medium truncate">{currentMixtape.title}</h4>
              <p className="text-sm text-muted-foreground truncate">{currentMixtape.artist}</p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
            <div className="flex items-center space-x-4">
              <Button
                onClick={onPrevious}
                variant="ghost"
                size="sm"
                className="hover:bg-white/10"
              >
                <skip-back className="w-5 h-5" />
              </Button>
              
              <Button
                onClick={onPlayPause}
                size="lg"
                className="rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                <play className="w-6 h-6" />
              </Button>
              
              <Button
                onClick={onNext}
                variant="ghost"
                size="sm"
                className="hover:bg-white/10"
              >
                <skip-forward className="w-5 h-5" />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="w-full flex items-center space-x-2 text-xs text-muted-foreground">
              <span>0:00</span>
              <Slider
                value={[currentTime]}
                onValueChange={(value) => setCurrentTime(value[0])}
                max={100}
                step={1}
                className="flex-1"
              />
              <span>{currentMixtape.duration}</span>
            </div>
          </div>

          {/* Additional Controls */}
          <div className="flex items-center space-x-2 flex-1 justify-end">
            <Button
              onClick={() => onLike(currentMixtape.id)}
              variant="ghost"
              size="sm"
              className="hover:bg-red-500/10 hover:text-red-400"
            >
              <like className="w-4 h-4" />
            </Button>
            
            <Button
              onClick={() => onShare(currentMixtape)}
              variant="ghost"
              size="sm"
              className="hover:bg-blue-500/10 hover:text-blue-400"
            >
              <share className="w-4 h-4" />
            </Button>

            {/* Volume Control */}
            <div className="flex items-center space-x-2 w-24">
              <Slider
                value={[volume]}
                onValueChange={(value) => setVolume(value[0])}
                max={100}
                step={1}
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
