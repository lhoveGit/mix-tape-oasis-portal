
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { toast } from '@/hooks/use-toast';

// Query keys
export const QUERY_KEYS = {
  MIXTAPES: 'mixtapes',
  MIXTAPE: 'mixtape',
  GENRES: 'genres',
  TRENDING: 'trending',
  NEW_RELEASES: 'new-releases',
  FEATURED: 'featured',
} as const;

// Mixtape hooks
export const useAllMixtapes = (params?: {
  genre?: string;
  search?: string;
  featured?: boolean;
  limit?: number;
  page?: number;
}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.MIXTAPES, params],
    queryFn: () => apiService.getAllMixtapes(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useMixtapeById = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.MIXTAPE, id],
    queryFn: () => apiService.getMixtapeById(id),
    enabled: !!id,
  });
};

export const useTrendingMixtapes = (limit = 12) => {
  return useQuery({
    queryKey: [QUERY_KEYS.TRENDING, limit],
    queryFn: () => apiService.getTrendingMixtapes(limit),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useNewReleases = (limit = 12) => {
  return useQuery({
    queryKey: [QUERY_KEYS.NEW_RELEASES, limit],
    queryFn: () => apiService.getNewReleases(limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useFeaturedMixtapes = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.FEATURED],
    queryFn: () => apiService.getFeaturedMixtapes(),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

// Genre hooks
export const useGenres = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GENRES],
    queryFn: () => apiService.getAllGenres(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Mutation hooks
export const useIncrementPlayCount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiService.incrementPlayCount(id),
    onSuccess: (data, id) => {
      // Update the specific mixtape in cache
      queryClient.setQueryData([QUERY_KEYS.MIXTAPE, id], (oldData: any) => ({
        ...oldData,
        playCount: data.playCount,
      }));
      
      // Invalidate mixtapes list to refresh play counts
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MIXTAPES] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update play count",
        variant: "destructive",
      });
    },
  });
};

export const useLikeMixtape = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiService.likeMixtape(id),
    onSuccess: (data, id) => {
      // Update the specific mixtape in cache
      queryClient.setQueryData([QUERY_KEYS.MIXTAPE, id], (oldData: any) => ({
        ...oldData,
        likes: data.likes,
      }));
      
      // Invalidate mixtapes list to refresh like counts
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MIXTAPES] });
      
      toast({
        title: "Liked!",
        description: "Mixtape added to your favorites",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to like mixtape",
        variant: "destructive",
      });
    },
  });
};
