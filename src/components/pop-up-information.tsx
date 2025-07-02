import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Recycle, Leaf, Trash2, Scale, MapPin, Ruler } from "lucide-react";
import { BuildingProperties } from "@/types/geojson";

interface WasteInfoCardProps {
  data: BuildingProperties;
}

export default function PopUpCardInfo({ data }: WasteInfoCardProps) {
  const wasteTypes = [
    {
      label: "Sampah Plastik",
      value: data["Sampah Plastik (kg)"],
      icon: Recycle,
      color: "bg-blue-100 text-blue-800 border-blue-200",
      iconColor: "text-blue-600",
    },
    {
      label: "Sampah Organik",
      value: data["Sampah Organik (kg)"],
      icon: Leaf,
      color: "bg-green-100 text-green-800 border-green-200",
      iconColor: "text-green-600",
    },
    {
      label: "Sampah Anorganik",
      value: data["sampah Anorganik (kg)"],
      icon: Trash2,
      color: "bg-gray-100 text-gray-800 border-gray-200",
      iconColor: "text-gray-600",
    },
  ];

  const totalRecorded =
    data["Sampah Plastik (kg)"] +
    data["Sampah Organik (kg)"] +
    data["sampah Anorganik (kg)"];

  const difference = data.Estimasi - totalRecorded;

  return (
    <Card className="w-full max-w-sm sm:max-w-md mx-auto shadow-md">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-base font-bold text-gray-900">
            {data.RTNew}
          </CardTitle>
          <Badge variant="outline" className="text-xs font-mono">
            ID: {data.Id}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 text-sm">
        {/* Info Bangunan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-md border border-purple-200">
            <MapPin className="h-4 w-4 text-purple-600" />
            <div>
              <div className="text-purple-900 font-medium text-xs">Area</div>
              <div className="text-purple-700 font-mono">
                {data.Shape_Area.toFixed(1)} m²
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-indigo-50 rounded-md border border-indigo-200">
            <Ruler className="h-4 w-4 text-indigo-600" />
            <div>
              <div className="text-indigo-900 font-medium text-xs">
                Keliling
              </div>
              <div className="text-indigo-700 font-mono">
                {data.Shape_Leng.toFixed(1)} m
              </div>
            </div>
          </div>
        </div>

        {/* Estimasi */}
        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-md border border-orange-200">
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-orange-600" />
            <span className="font-semibold text-orange-900 text-sm">
              Estimasi Total
            </span>
          </div>
          <span className="text-base font-bold text-orange-800">
            {data.Estimasi.toFixed(1)} kg
          </span>
        </div>

        <Separator />

        {/* Detail Sampah */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Detail Sampah
          </h4>

          {wasteTypes.map((waste, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-md border hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-full ${waste.color}`}>
                  <waste.icon className={`h-4 w-4 ${waste.iconColor}`} />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {waste.label}
                </span>
              </div>
              <Badge variant="secondary" className="font-mono text-xs">
                {waste.value.toFixed(1)} kg
              </Badge>
            </div>
          ))}
        </div>

        {/* Ringkasan */}
        <div className="pt-3 border-t text-sm space-y-1 text-gray-700">
          <div className="flex justify-between">
            <span>Total Tercatat:</span>
            <span className="font-semibold">{totalRecorded.toFixed(1)} kg</span>
          </div>
          <div className="flex justify-between">
            <span>Selisih Estimasi:</span>
            <span
              className={`font-semibold ${
                difference >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {difference >= 0 ? "+" : ""}
              {difference.toFixed(1)} kg
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
