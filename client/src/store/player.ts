
import { create } from 'zustand';

interface PlayerState {
  currentTrackId: string;
  isPlaying: boolean;
  setTrack: (id: string) => void;
  setIsPlaying: (playing: boolean) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentTrackId: '0LgauOCJwpPugwBRZhumCj', // ALV Las Fresas como track inicial
  isPlaying: false,
  setTrack: (id) => set({ currentTrackId: id }),
  setIsPlaying: (playing) => set({ isPlaying: playing })
}));
