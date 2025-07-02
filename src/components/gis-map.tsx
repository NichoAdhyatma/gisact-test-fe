"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import SearchBar from "./search-bar";
import FitBounds from "./fit-bounds";
import LayerControlBox from "./layer-control-box";
import BasemapSwitcher from "./base-map-switcher";
import Legend from "./legend";
import ZoomControl from "./zoom-control";
import { useGeoJSONStore } from "@/stores/geojson-store";
import { useBasemapStore } from "@/stores/basemap-store";
import { generateLegendFromRT } from "@/utils/color-generator";
import { useLegendStore } from "@/stores/legend-store";
import { useEffect } from "react";
import { useLayerStore } from "@/stores/show-layer-store";
import BangunanLayer from "./building-layer";

export default function GISMap() {
  const { data: geojsonData } = useGeoJSONStore();

  const { current: currentBasemap } = useBasemapStore();

  const { showLayer } = useLayerStore();

  useEffect(() => {
    if (!geojsonData) return;

    const names = geojsonData.features.map((f) => f.properties.RTNew as string);

    const legendItems = generateLegendFromRT(names);

    useLegendStore.getState().setItems(legendItems);
  }, [geojsonData]);

  if (!geojsonData) {
    return <p className="text-center mt-20">Loading GeoJSON data...</p>;
  }

  return (
    <MapContainer
      center={[-6.9792, 107.5896]}
      zoom={20}
      style={{ height: "100vh", width: "100%" }}
      minZoom={18}
      maxZoom={20}
      zoomControl={false}
    >
      <TileLayer
        url={
          currentBasemap === "dark"
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        }
        attribution="&copy; OpenStreetMap contributors & providers"
      />

      <BangunanLayer data={geojsonData} visible={showLayer} />

      <FitBounds geojsonData={geojsonData} />

      <SearchBar geojsonData={geojsonData} />

      <LayerControlBox />

      <BasemapSwitcher />

      <Legend />

      <ZoomControl />
    </MapContainer>
  );
}
