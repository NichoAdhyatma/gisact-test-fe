import { FeatureCollection, Feature, MultiPolygon } from "geojson";

export interface BuildingProperties {
  Id: number;
  Shape_Leng: number;
  Shape_Area: number;
  Estimasi: number;
  RTNew: string;
  "Sampah Plastik (kg)": number;
  "Sampah Organik (kg)": number;
  "sampah Anorganik (kg)": number;
}

export type BuildingFeature = Feature<MultiPolygon, BuildingProperties>;

export type BuildingFeatureCollection = FeatureCollection<
  MultiPolygon,
  BuildingProperties
>;
