import { create } from "zustand";

interface LegendItem {
  name: string;
  color: string;
}

interface LegendState {
  items: LegendItem[];
  setItems: (items: LegendItem[]) => void;
}

export const useLegendStore = create<LegendState>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
}));
