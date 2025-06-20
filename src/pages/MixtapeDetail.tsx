
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { toast } from '@/hooks/use-toast';
import { AppSidebar } from '../components/AppSidebar';
import AnnouncementBar from '../components/AnnouncementBar';
import Header from '../components/Header';
import MusicPlayer from '../components/MusicPlayer';
import { mixtapes } from '../data/mockData';
import { Mixtape } from '../types/mixtape';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Share, Download, Play, ArrowLeft } from 'lucide-react';

const MixtapeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const mixtape = mixtapes.find(m => m.id === id);

  if (!mixtape) {
    return <Navigate to="/404" replace />;
  }

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
    
    console.log(`Redirecting to: ${mixtape.monetagLink}`);
    setTimeout(() => {
      console.log(`Starting download: ${mixtape.downloadLink}`);
      toast({
        title: "Download Started",
        description: `${mixtape.title} is now downloading`,
      });
    }, 3000);
  };

  const handleLike = () => {
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
          <Header onSearch={() => {}} />
          
          <div className="flex-1 container mx-auto px-4 py-8 pb-32">
            <Button 
              variant="ghost" 
              className="mb-6 hover:bg-white/5"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Browse
            </Button>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  <img
                    src={mixtape.coverArt}
                    alt={mixtape.title}
                    className="w-full h-full object-cover"
                  />
                  {mixtape.featured && (
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black">
                      Featured
                    </Badge>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => handlePlay(mixtape)}
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Play Now
                  </Button>
                  
                  <Button
                    onClick={() => handleDownload(mixtape)}
                    size="lg"
                    variant="outline"
                    className="flex-1 border-green-500 text-green-400 hover:bg-green-500/10"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleLike}
                    variant="ghost"
                    size="sm"
                    className="flex-1 hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Like ({mixtape.likes})
                  </Button>
                  
                  <Button
                    onClick={() => handleShare(mixtape)}
                    variant="ghost"
                    size="sm"
                    className="flex-1 hover:bg-blue-500/10 hover:text-blue-400"
                  >
                    <Share className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{mixtape.title}</h1>
                  <p className="text-xl text-muted-foreground mb-4">{mixtape.artist}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                      {mixtape.genre}
                    </Badge>
                    {mixtape.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-white/5">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <p className="font-medium">{mixtape.duration}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Release Date:</span>
                      <p className="font-medium">{mixtape.releaseDate}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Plays:</span>
                      <p className="font-medium">{mixtape.playCount.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Likes:</span>
                      <p className="font-medium">{mixtape.likes}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {mixtape.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <MusicPlayer
          currentMixtape={mixtape}
          isPlaying={false}
          onPlayPause={() => {}}
          onPrevious={() => {}}
          onNext={() => {}}
          onLike={handleLike}
          onShare={() => handleShare(mixtape)}
        />
      </div>
    </SidebarProvider>
  );
};

export default MixtapeDetail;
