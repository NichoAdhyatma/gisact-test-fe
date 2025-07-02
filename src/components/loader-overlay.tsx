"use client";
import { useLoader } from "@/context/loader-context";
import { Loader2 } from "lucide-react";

const LoaderOverlay = () => {
  const { isLoading } = useLoader();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/30">
      <div className="rounded-xl bg-white p-5 shadow-lg">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    </div>
  );
};

export default LoaderOverlay;
