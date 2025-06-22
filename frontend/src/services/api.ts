
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Mixtape endpoints
  async getAllMixtapes(params?: {
    genre?: string;
    search?: string;
    featured?: boolean;
    limit?: number;
    page?: number;
  }) {
    const searchParams = new URLSearchParams();
    
    if (params?.genre && params.genre !== 'null') {
      searchParams.append('genre', params.genre);
    }
    if (params?.search) {
      searchParams.append('search', params.search);
    }
    if (params?.featured) {
      searchParams.append('featured', 'true');
    }
    if (params?.limit) {
      searchParams.append('limit', params.limit.toString());
    }
    if (params?.page) {
      searchParams.append('page', params.page.toString());
    }

    const queryString = searchParams.toString();
    return this.request(`/mixtapes${queryString ? `?${queryString}` : ''}`);
  }

  async getMixtapeById(id: string) {
    return this.request(`/mixtapes/${id}`);
  }

  async getTrendingMixtapes(limit = 12) {
    return this.request(`/mixtapes/trending?limit=${limit}`);
  }

  async getNewReleases(limit = 12) {
    return this.request(`/mixtapes/new-releases?limit=${limit}`);
  }

  async getFeaturedMixtapes() {
    return this.request(`/mixtapes/featured`);
  }

  async incrementPlayCount(id: string) {
    return this.request(`/mixtapes/${id}/play`, { method: 'POST' });
  }

  async likeMixtape(id: string) {
    return this.request(`/mixtapes/${id}/like`, { method: 'POST' });
  }

  // Genre endpoints
  async getAllGenres() {
    return this.request(`/genres`);
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export const apiService = new ApiService();
