"use client";

import dynamic from "next/dynamic";
import { BottomNav } from "@/components/BottomNav";

const MapViewComponent = dynamic(
  () => import("@/components/MapView").then((mod) => mod.MapViewComponent),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading map...</p>
        </div>
      </div>
    ),
  }
);

export default function MapPage() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="flex-1 relative">
        <MapViewComponent />
      </div>
      <BottomNav />
    </div>
  );
}
