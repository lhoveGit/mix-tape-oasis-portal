
import React from 'react';
import { Music, Search, Heart, Download, User, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { genres } from '../data/mockData';

const navigationItems = [
  {
    title: 'Home',
    url: '/',
    icon: Music,
  },
  {
    title: 'Search',
    url: '/search',
    icon: Search,
  },
  {
    title: 'Liked',
    url: '/liked',
    icon: Heart,
  },
  {
    title: 'Downloads',
    url: '/downloads',
    icon: Download,
  },
  {
    title: 'About',
    url: '/about',
    icon: User,
  },
  {
    title: 'Contact',
    url: '/contact',
    icon: Phone,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-white/10">
      <SidebarHeader className="p-6">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Music className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            MixTape Portal
          </h1>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Genres</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {genres.map((genre) => (
                <SidebarMenuItem key={genre.id}>
                  <SidebarMenuButton asChild>
                    <Link to={`/search?genre=${genre.name}`} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${genre.color}`}></div>
                      <span>{genre.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="text-xs text-muted-foreground text-center">
          © 2024 MixTape Portal
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
