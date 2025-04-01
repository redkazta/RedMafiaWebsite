import { create } from 'zustand';

interface PlayerState {
  currentTrackId: string;
  isPlaying: boolean;
  setTrack: (id: string) => void;
  setIsPlaying: (playing: boolean) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentTrackId: '3ojUCBn2gpPULJ9U6FjQIB', // Default track changed to the playlist ID
  isPlaying: false,
  setTrack: (id) => set({ currentTrackId: id }),
  setIsPlaying: (playing) => set({ isPlaying: playing })
}));