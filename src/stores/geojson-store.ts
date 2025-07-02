import { create } from "zustand";
import { BuildingFeatureCollection } from "@/types/geojson";

interface GeoJSONState {
  data: BuildingFeatureCollection | null;
  setData: (data: BuildingFeatureCollection) => void;
}

export const useGeoJSONStore = create<GeoJSONState>((set) => ({
  data: null,
  setData: (data) => set({ data }),
}));
