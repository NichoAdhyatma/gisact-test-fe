"use client";
import { useLegendStore } from "@/stores/legend-store";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Map } from "lucide-react";

export default function Legend() {
  const items = useLegendStore((state) => state.items);

  if (items.length === 0) return null;

  return (
    <Card className="absolute bottom-4 right-4 z-[1000] bg-white/95 backdrop-blur-sm shadow-xl border-0 w-64">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <Map className="h-5 w-5 text-blue-600" />
          Legenda
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {items.map((item: { name: string; color: string }, index: number) => (
            <div
              key={item.name}
              className="group flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              {/* Color indicator with improved styling */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-5 h-5 rounded-full border-2 border-white shadow-sm ring-1 ring-gray-200 group-hover:scale-110 transition-transform duration-200"
                  style={{ backgroundColor: item.color }}
                />
                {/* Optional: Add a subtle glow effect */}
                <div
                  className="absolute inset-0 w-5 h-5 rounded-full opacity-20 blur-sm"
                  style={{ backgroundColor: item.color }}
                />
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                  {item.name}
                </span>
              </div>

              {/* Optional: Add a subtle badge for count or additional info */}
              <Badge
                variant="secondary"
                className="text-xs opacity-60 group-hover:opacity-100 transition-opacity"
              >
                #{index + 1}
              </Badge>
            </div>
          ))}
        </div>

        {/* Footer with item count */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            {items.length} kategori ditampilkan
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
