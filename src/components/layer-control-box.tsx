"use client";

import { useLayerStore } from "@/stores/show-layer-store";
import { Switch } from "./ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Eye, EyeOff, Layers } from "lucide-react";
import { useCallback } from "react";
import { useLoader } from "@/context/loader-context";

export default function LayerControlBox() {
  const { showLayer, toggleLayer } = useLayerStore();

  const { setIsLoading } = useLoader();

  const setShowLayer = useCallback(() => {
    setIsLoading(true);

    setTimeout(() => {
      toggleLayer();
      
      setIsLoading(false);
    }, 500);
  }, [toggleLayer, setIsLoading]);

  return (
    <Card className="absolute top-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm shadow-xl border-0 w-64">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <Layers className="h-5 w-5 text-blue-600" />
          Select Layer
          <Badge variant="secondary" className="ml-auto text-xs">
            1 layer
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <label className="group flex items-center gap-3 cursor-pointer p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200">
            <div className="flex-shrink-0">
              {showLayer ? (
                <Eye className="h-4 w-4 text-blue-600 group-hover:text-blue-700 transition-colors" />
              ) : (
                <EyeOff className="h-4 w-4 text-gray-400 group-hover:text-gray-500 transition-colors" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                  Data Dummy
                </span>
                <div
                  className={`w-2 h-2 rounded-full transition-colors ${
                    showLayer ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {showLayer ? "Layer aktif dan terlihat" : "Layer disembunyikan"}
              </p>
            </div>

            <div className="flex-shrink-0">
              <Switch
                checked={showLayer}
                onCheckedChange={setShowLayer}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>
          </label>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Status Layer:</span>
              <Badge
                variant={showLayer ? "default" : "secondary"}
                className="text-xs"
              >
                {showLayer ? "Aktif" : "Nonaktif"}
              </Badge>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            Klik untuk mengaktifkan/menonaktifkan layer
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
