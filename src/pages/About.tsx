
import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '../components/AppSidebar';
import AnnouncementBar from '../components/AnnouncementBar';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Music, Users, Download, Star } from 'lucide-react';

const About = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AnnouncementBar />
        <AppSidebar />
        
        <main className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 p-4 border-b border-white/10">
            <SidebarTrigger />
            <span className="text-lg font-semibold">About</span>
          </div>
          <Header onSearch={() => {}} />
          
          <div className="flex-1 container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                  MixTape Portal
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  The ultimate destination for discovering and downloading the best mixtapes
                </p>
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Start Exploring
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-lg border border-white/10">
                  <Music className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                  <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                  <p className="text-muted-foreground">High-quality mixtapes from top artists</p>
                </div>
                
                <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-lg border border-white/10">
                  <Users className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                  <h3 className="text-xl font-semibold mb-2">Community</h3>
                  <p className="text-muted-foreground">Join thousands of music lovers</p>
                </div>
                
                <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-lg border border-white/10">
                  <Download className="w-12 h-12 mx-auto mb-4 text-green-400" />
                  <h3 className="text-xl font-semibold mb-2">Easy Downloads</h3>
                  <p className="text-muted-foreground">Simple, fast download process</p>
                </div>
                
                <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-lg border border-white/10">
                  <Star className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                  <h3 className="text-xl font-semibold mb-2">Curated</h3>
                  <p className="text-muted-foreground">Hand-picked selections</p>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <h2 className="text-3xl font-bold mb-6">About MixTape Portal</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  MixTape Portal is your premier destination for discovering, streaming, and downloading 
                  the finest mixtapes from artists around the globe. We've curated an extensive collection 
                  spanning multiple genres to satisfy every musical taste.
                </p>
                
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground mb-6">
                  To provide music enthusiasts with easy access to high-quality mixtapes while supporting 
                  artists and creators. We believe in the power of music to connect people and create 
                  unforgettable experiences.
                </p>
                
                <h3 className="text-2xl font-bold mb-4">Features</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                  <li>Extensive collection of mixtapes across all genres</li>
                  <li>Advanced search and filtering capabilities</li>
                  <li>High-quality audio streaming and downloads</li>
                  <li>User-friendly interface with modern design</li>
                  <li>Regular updates with new releases and trending content</li>
                  <li>Community features for sharing and discovering music</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default About;
