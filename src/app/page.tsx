"use client";

import { useGeoJSONStore } from "@/stores/geojson-store";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const GISMap = dynamic(() => import("@/components/gis-map"), {
  ssr: false,
});

export default function HomePage() {
  const { setData } = useGeoJSONStore();

  useEffect(() => {
    fetch("/data/data.geojson")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, [setData]);

  return (
    <main className="w-full h-screen">
      <GISMap />
    </main>
  );
}
