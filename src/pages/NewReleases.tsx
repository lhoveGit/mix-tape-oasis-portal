
import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '../components/AppSidebar';
import AnnouncementBar from '../components/AnnouncementBar';
import Header from '../components/Header';
import MixtapeCard from '../components/MixtapeCard';
import { mixtapes } from '../data/mockData';
import { Mixtape } from '../types/mixtape';
import { toast } from '@/hooks/use-toast';

const NewReleases = () => {
  const newReleases = mixtapes
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
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
            <span className="text-lg font-semibold">New Releases</span>
          </div>
          <Header onSearch={() => {}} />
          
          <div className="flex-1 container mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                ✨ Fresh Drops
              </h1>
              <p className="text-muted-foreground text-lg">
                The latest mixtapes just dropped
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {newReleases.map((mixtape) => (
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
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default NewReleases;
