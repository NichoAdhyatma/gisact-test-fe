"use client";
import { useMap } from "react-leaflet";

export default function ZoomControl() {
  const map = useMap();

  return (
    <div className="absolute top-1/2 right-4 -translate-y-1/2 z-[1000] flex flex-col gap-2">
      <button
        onClick={() => map.zoomIn()}
        className="bg-white shadow rounded p-2 hover:bg-gray-100"
        title="Zoom In"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M21 21l-4.35-4.35M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
          <path d="M10 6v8M6 10h8" />
        </svg>
      </button>
      <button
        onClick={() => map.zoomOut()}
        className="bg-white shadow rounded p-2 hover:bg-gray-100"
        title="Zoom Out"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M21 21l-4.35-4.35M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
          <path d="M6 10h8" />
        </svg>
      </button>
    </div>
  );
}
