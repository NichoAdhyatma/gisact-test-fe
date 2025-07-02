"use client";

import { useState } from "react";
import { useMap, Popup } from "react-leaflet";
import { LatLngBoundsExpression, LatLng } from "leaflet";
import {
  BuildingFeature,
  BuildingFeatureCollection,
  BuildingProperties,
} from "@/types/geojson";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import PopUpCardInfo from "./pop-up-information";
import { MapPin, Search } from "lucide-react";

interface SearchBarProps {
  geojsonData: BuildingFeatureCollection;
  onSelectFeature?: (feature: BuildingFeature) => void;
}

export default function SearchBar({
  geojsonData,
  onSelectFeature,
}: SearchBarProps) {
  const map = useMap();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<BuildingFeature[]>([]);
  const [popupData, setPopupData] = useState<{
    latlng: LatLng;
    content: BuildingProperties;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);

    if (!val) {
      setSuggestions([]);
      return;
    }

    const matched = geojsonData.features.filter((feature) => {
      const name = feature.properties.RTNew?.toLowerCase() ?? "";
      return name.includes(val.toLowerCase());
    });

    setSuggestions(matched.slice(0, 5));
  };

  const handleSelect = (feature: BuildingFeature) => {
    const coords: [number, number][] = [];

    if (feature.geometry.type === "MultiPolygon") {
      feature.geometry.coordinates.forEach((poly) => {
        poly[0].forEach(([lng, lat]) => coords.push([lat, lng]));
      });
    }

    if (coords.length === 0) {
      alert("Polygon tidak memiliki koordinat!");
      return;
    }

    const lats = coords.map(([lat]) => lat);
    const lngs = coords.map(([, lng]) => lng);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    const latBuffer = minLat === maxLat ? 0.0001 : 0;
    const lngBuffer = minLng === maxLng ? 0.0001 : 0;

    const bounds: LatLngBoundsExpression = [
      [minLat - latBuffer, minLng - lngBuffer],
      [maxLat + latBuffer, maxLng + lngBuffer],
    ];

    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;

    map.fitBounds(bounds, {
      padding: [50, 50],
      maxZoom: 18,
    });

    setTimeout(() => {
      map.setView([centerLat, centerLng], Math.min(map.getZoom(), 19), {
        animate: true,
      });
    }, 300);

    const { RTNew } = feature.properties;

    setPopupData({
      latlng: new LatLng(centerLat, centerLng),
      content: feature.properties,
    });

    onSelectFeature?.(feature);
    setSuggestions([]);
    setQuery(RTNew);
  };

  return (
    <>
      <Card className="absolute top-4 right-4 z-[1000] bg-white shadow-lg border-0 py-0">
        <CardContent className="p-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Cari nama bangunan..."
              value={query}
              onChange={handleChange}
              className="pl-10 pr-4 py-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
            />
          </div>

          {suggestions.length > 0 && (
            <div className="mt-3">
              <ul className="bg-white border border-gray-100 rounded-lg shadow-sm  overflow-y-scroll">
                {suggestions.map((feature, i) => {
                  const name = feature.properties.RTNew;
                  const id = feature.id ?? `feature-${i}`;

                  return (
                    <li
                      key={feature.id ?? `feature-${i}`}
                      onClick={() => handleSelect(feature)}
                      className="group flex items-center gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer text-gray-700 border-b border-gray-50 last:border-b-0 transition-colors duration-150"
                    >
                      <div className="flex-shrink-0">
                        <MapPin className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                          {name}
                        </div>
                        <div className="text-xs text-gray-500 font-mono mt-0.5">
                          ID: {id}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Results count */}
              <div className="mt-2 text-xs text-gray-500 px-1">
                {suggestions.length} hasil ditemukan
              </div>
            </div>
          )}

          {/* No results state */}
          {query && suggestions.length === 0 && (
            <div className="mt-3 text-center py-6 text-gray-500">
              <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">Tidak ada hasil ditemukan</p>
              <p className="text-xs text-gray-400 mt-1">Coba kata kunci lain</p>
            </div>
          )}
        </CardContent>
      </Card>

      {popupData && (
        <Popup
          position={popupData.latlng}
          autoClose={true}
          eventHandlers={{
            popupopen: () => map.setView(popupData.latlng, 18),
          }}
        >
          <PopUpCardInfo data={popupData.content} />
        </Popup>
      )}
    </>
  );
}
