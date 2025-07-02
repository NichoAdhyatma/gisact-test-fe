"use client";

import { useMap } from "react-leaflet";
import { BuildingFeature, BuildingFeatureCollection } from "@/types/geojson";
import PopUpCardInfo from "./pop-up-information";
import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import L from "leaflet";

interface BangunanLayerProps {
  data: BuildingFeatureCollection;
  visible?: boolean;
  onSelect?: (feature: BuildingFeature) => void;
}

export default function BangunanLayer({
  data,
  visible = true,
  onSelect,
}: BangunanLayerProps) {
  const map = useMap();
  const layerRef = useRef<L.GeoJSON | null>(null);

  useEffect(() => {
    const geoJsonLayer = L.geoJSON(data, {
      onEachFeature: (feature, layer) => {
        const container = document.createElement("div");
        container.className = "w-fit";

        const root = createRoot(container);
        root.render(<PopUpCardInfo data={feature.properties} />);
        layer.bindPopup(container);

        layer.on("click", () => {
          onSelect?.(feature as BuildingFeature);
        });
      },
    });

    layerRef.current = geoJsonLayer;

    if (visible) {
      geoJsonLayer.addTo(map);
    }

    return () => {
      geoJsonLayer.remove();
    };
  }, [data, map, onSelect, visible]);


  useEffect(() => {
    const layer = layerRef.current;

    if (!layer) return;

    if (visible) {
      layer.addTo(map);
    } else {
      layer.remove();
    }
  }, [visible, map]);

  return null;
}
  