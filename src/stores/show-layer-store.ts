import { create } from "zustand";

interface LayerState {
  showLayer: boolean;
  toggleLayer: () => void;
  setShowLayer: (value: boolean) => void;
}

export const useLayerStore = create<LayerState>((set) => ({
  showLayer: true,
  toggleLayer: () => set((state) => ({ showLayer: !state.showLayer })),
  setShowLayer: (value) => set({ showLayer: value }),
}));
