
export interface Mixtape {
  id: string;
  title: string;
  artist: string;
  genre: string;
  coverArt: string;
  downloadLink: string;
  monetagLink: string;
  description: string;
  duration: string;
  releaseDate: string;
  tags: string[];
  playCount: number;
  likes: number;
  featured: boolean;
}

export interface Genre {
  id: string;
  name: string;
  description: string;
  color: string;
}
