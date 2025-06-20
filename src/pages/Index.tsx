
import React, { useState, useMemo } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { toast } from '@/hooks/use-toast';
import { AppSidebar } from '../components/AppSidebar';
import AnnouncementBar from '../components/AnnouncementBar';
import Header from '../components/Header';
import MixtapeCard from '../components/MixtapeCard';
import MusicPlayer from '../components/MusicPlayer';
import GenreFilter from '../components/GenreFilter';
import { mixtapes } from '../data/mockData';
import { Mixtape } from '../types/mixtape';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [currentMixtape, setCurrentMixtape] = useState<Mixtape | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedMixtapes, setLikedMixtapes] = useState<Set<string>>(new Set());

  const filteredMixtapes = useMemo(() => {
    return mixtapes.filter((mixtape) => {
      const matchesSearch = 
        mixtape.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mixtape.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mixtape.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mixtape.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesGenre = !selectedGenre || mixtape.genre === selectedGenre;
      
      return matchesSearch && matchesGenre;
    });
  }, [searchQuery, selectedGenre]);

  const featuredMixtapes = filteredMixtapes.filter(m => m.featured);
  const regularMixtapes = filteredMixtapes.filter(m => !m.featured);

  const handlePlay = (mixtape: Mixtape) => {
    setCurrentMixtape(mixtape);
    setIsPlaying(true);
    toast({
      title: "Now Playing",
      description: `${mixtape.title} by ${mixtape.artist}`,
    });
  };

  const handleDownload = (mixtape: Mixtape) => {
    toast({
      title: "Redirecting to download...",
      description: "You'll be redirected to our partner site for download.",
    });
    
    console.log(`Redirecting to: ${mixtape.monetagLink}`);
    setTimeout(() => {
      console.log(`Starting download: ${mixtape.downloadLink}`);
      toast({
        title: "Download Started",
        description: `${mixtape.title} is now downloading`,
      });
    }, 3000);
  };

  const handleLike = (mixtapeId: string) => {
    const newLikedMixtapes = new Set(likedMixtapes);
    if (newLikedMixtapes.has(mixtapeId)) {
      newLikedMixtapes.delete(mixtapeId);
      toast({
        title: "Removed from likes",
        description: "Mixtape removed from your liked collection",
      });
    } else {
      newLikedMixtapes.add(mixtapeId);
      toast({
        title: "Added to likes",
        description: "Mixtape added to your liked collection",
      });
    }
    setLikedMixtapes(newLikedMixtapes);
  };

  const handleShare = (mixtape: Mixtape) => {
    if (navigator.share) {
      navigator.share({
        title: mixtape.title,
        text: `Check out ${mixtape.title} by ${mixtape.artist}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Mixtape link copied to clipboard",
      });
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    if (currentMixtape) {
      const currentIndex = mixtapes.findIndex(m => m.id === currentMixtape.id);
      const previousIndex = currentIndex > 0 ? currentIndex - 1 : mixtapes.length - 1;
      setCurrentMixtape(mixtapes[previousIndex]);
    }
  };

  const handleNext = () => {
    if (currentMixtape) {
      const currentIndex = mixtapes.findIndex(m => m.id === currentMixtape.id);
      const nextIndex = currentIndex < mixtapes.length - 1 ? currentIndex + 1 : 0;
      setCurrentMixtape(mixtapes[nextIndex]);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AnnouncementBar />
        <AppSidebar />
        
        <main className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 p-4 border-b border-white/10 md:hidden">
            <SidebarTrigger />
            <span className="text-lg font-semibold">MixTape Portal</span>
          </div>
          <Header onSearch={setSearchQuery} />
          
          <div className="flex-1 container mx-auto px-4 py-8 pb-32">
            <div className="mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                Discover Amazing Mixtapes
              </h1>
              <p className="text-muted-foreground text-lg">
                The best collection of mixtapes from top artists around the world
              </p>
            </div>

            <GenreFilter
              selectedGenre={selectedGenre}
              onGenreSelect={setSelectedGenre}
            />

            {featuredMixtapes.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-yellow-400">Featured Mixtapes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {featuredMixtapes.map((mixtape) => (
                    <MixtapeCard
                      key={mixtape.id}
                      mixtape={mixtape}
                      onPlay={handlePlay}
                      onDownload={handleDownload}
                      onLike={handleLike}
                      onShare={handleShare}
                    />
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 className="text-2xl font-bold mb-6">All Mixtapes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {regularMixtapes.map((mixtape) => (
                  <MixtapeCard
                    key={mixtape.id}
                    mixtape={mixtape}
                    onPlay={handlePlay}
                    onDownload={handleDownload}
                    onLike={handleLike}
                    onShare={handleShare}
                  />
                ))}
              </div>
            </section>

            {filteredMixtapes.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground mb-4">No mixtapes found</p>
                <p className="text-muted-foreground">Try adjusting your search or genre filter</p>
              </div>
            )}
          </div>
        </main>

        <MusicPlayer
          currentMixtape={currentMixtape}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onLike={handleLike}
          onShare={handleShare}
        />
      </div>
    </SidebarProvider>
  );
};

export default Index;
