"use client";

import { Moon, SunMedium } from "lucide-react";
import { useState } from "react";
import { useBasemapStore } from "@/stores/basemap-store";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface Basemap {
  name: string;
  key: string;
  thumb: React.ReactNode;
}

export default function BasemapSwitcher() {
  const [open, setOpen] = useState(false);
  const current = useBasemapStore((state) => state.current);
  const setCurrent = useBasemapStore((state) => state.setCurrent);

  const basemaps: Basemap[] = [
    { name: "Light", key: "light", thumb: <SunMedium size={30} /> },
    { name: "Dark", key: "dark", thumb: <Moon size={30} /> },
  ];

  const currentBasemap = basemaps.find((b) => b.key === current);

  return (
    <div className="absolute bottom-4 left-4 z-[1000]">
      <div
        className="group bg-white/95 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl cursor-pointer w-16 h-16 overflow-hidden flex items-center justify-center border border-gray-100 transition-all duration-300 hover:scale-105 active:scale-95"
        onClick={() => setOpen(!open)}
      >
        <div className="text-gray-700 group-hover:text-blue-600 transition-colors duration-200">
          {currentBasemap?.thumb || ""}
        </div>

        <div className="absolute bottom-1 right-1 w-2 h-2 bg-blue-500 rounded-full opacity-60"></div>
      </div>

      {open && (
        <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0 mt-3 animate-in slide-in-from-bottom-2 duration-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Map Theme
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="flex gap-3">
              {basemaps.map((b) => (
                <Button
                  key={b.key}
                  variant={current === b.key ? "default" : "secondary"}
                  size="lg"
                  className={`
                    flex-col gap-2 h-auto py-4 px-6 rounded-xl transition-all duration-200
                    ${
                      current === b.key
                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900 border border-gray-200"
                    }
                    hover:scale-105 active:scale-95
                  `}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrent(b.key);
                    setOpen(false);
                  }}
                >
                  <div
                    className={`transition-colors duration-200 ${
                      current === b.key ? "text-white" : "text-gray-600"
                    }`}
                  >
                    {b.thumb}
                  </div>
                  <p
                    className={`text-xs font-medium transition-colors duration-200 ${
                      current === b.key ? "text-white" : "text-gray-600"
                    }`}
                  >
                    {b.name}
                  </p>

                  {current === b.key && (
                    <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full"></div>
                  )}
                </Button>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                Pilih tema peta sesuai preferensi
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
