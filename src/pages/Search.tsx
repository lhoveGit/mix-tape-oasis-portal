
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '../components/AppSidebar';
import AnnouncementBar from '../components/AnnouncementBar';
import Header from '../components/Header';
import MixtapeCard from '../components/MixtapeCard';
import GenreFilter from '../components/GenreFilter';
import { mixtapes } from '../data/mockData';
import { Mixtape } from '../types/mixtape';
import { toast } from '@/hooks/use-toast';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const filteredMixtapes = mixtapes.filter((mixtape) => {
    const matchesSearch = 
      mixtape.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mixtape.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mixtape.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mixtape.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesGenre = !selectedGenre || mixtape.genre === selectedGenre;
    
    return matchesSearch && matchesGenre;
  });

  const handlePlay = (mixtape: Mixtape) => {
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
  };

  const handleLike = (mixtapeId: string) => {
    toast({
      title: "Added to likes",
      description: "Mixtape added to your liked collection",
    });
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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AnnouncementBar />
        <AppSidebar />
        
        <main className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 p-4 border-b border-white/10">
            <SidebarTrigger />
            <span className="text-lg font-semibold">Search</span>
          </div>
          <Header onSearch={setSearchQuery} />
          
          <div className="flex-1 container mx-auto px-4 py-8">
            <GenreFilter
              selectedGenre={selectedGenre}
              onGenreSelect={setSelectedGenre}
            />

            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Search Results</h1>
              <p className="text-muted-foreground">
                {filteredMixtapes.length} mixtapes found
                {searchQuery && ` for "${searchQuery}"`}
                {selectedGenre && ` in ${selectedGenre}`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMixtapes.map((mixtape) => (
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

            {filteredMixtapes.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground mb-4">No mixtapes found</p>
                <p className="text-muted-foreground">Try adjusting your search or genre filter</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Search;
