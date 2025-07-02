import { create } from "zustand";

interface BasemapState {
  current: string;
  setCurrent: (basemap: string) => void;
}

export const useBasemapStore = create<BasemapState>((set) => ({
  current: "light",
  setCurrent: (basemap) => set({ current: basemap }),
}));
