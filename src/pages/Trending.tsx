
import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '../components/AppSidebar';
import AnnouncementBar from '../components/AnnouncementBar';
import Header from '../components/Header';
import MixtapeCard from '../components/MixtapeCard';
import { mixtapes } from '../data/mockData';
import { Mixtape } from '../types/mixtape';
import { toast } from '@/hooks/use-toast';

const Trending = () => {
  const trendingMixtapes = mixtapes
    .sort((a, b) => b.playCount - a.playCount)
    .slice(0, 12);

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
            <span className="text-lg font-semibold">Trending</span>
          </div>
          <Header onSearch={() => {}} />
          
          <div className="flex-1 container mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                🔥 Trending Mixtapes
              </h1>
              <p className="text-muted-foreground text-lg">
                The hottest mixtapes everyone's talking about
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {trendingMixtapes.map((mixtape, index) => (
                <div key={mixtape.id} className="relative">
                  <div className="absolute -top-2 -left-2 z-10 w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                    #{index + 1}
                  </div>
                  <MixtapeCard
                    mixtape={mixtape}
                    onPlay={handlePlay}
                    onDownload={handleDownload}
                    onLike={handleLike}
                    onShare={handleShare}
                  />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Trending;
