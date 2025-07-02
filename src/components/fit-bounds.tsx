import { FeatureCollection, Geometry } from "geojson";
import { useMap } from "react-leaflet";
import { useEffect } from "react";
import { LatLngBoundsExpression } from "leaflet";
import {  BuildingFeatureCollection } from "@/types/geojson";

export default function FitBounds({
  geojsonData,
}: {
  geojsonData: BuildingFeatureCollection;
}) {
  const map = useMap();

  useEffect(() => {
    if (geojsonData) {
      const bounds = geoJSONToBounds(geojsonData);
      map.fitBounds(bounds);
    }
  }, [geojsonData, map]);

  return null;
}

function geoJSONToBounds(
  geojson: FeatureCollection<Geometry>
): LatLngBoundsExpression {
  const coords: [number, number][] = [];
  geojson.features.forEach((feature) => {
    if (feature.geometry.type === "MultiPolygon") {
      feature.geometry.coordinates.forEach((poly) => {
        poly[0].forEach(([lng, lat]) => coords.push([lat, lng]));
      });
    }
  });

  if (coords.length === 0) {
    return [
      [-6.9, 107.6],
      [-6.9, 107.6],
    ];
  }

  const lats = coords.map((c) => c[0]);
  const lngs = coords.map((c) => c[1]);
  return [
    [Math.min(...lats), Math.min(...lngs)],
    [Math.max(...lats), Math.max(...lngs)],
  ] as LatLngBoundsExpression;
}
