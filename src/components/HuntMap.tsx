"use client";

import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Waypoint {
  lat: number;
  lng: number;
  label: string;
  completed: boolean;
}

function createWaypointIcon(completed: boolean) {
  const color = completed ? "#10B981" : "#7C3AED";
  const glowColor = completed
    ? "rgba(16, 185, 129, 0.5)"
    : "rgba(124, 58, 237, 0.4)";
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <circle cx="12" cy="12" r="10" fill="${color}" opacity="0.2"/>
      <circle cx="12" cy="12" r="6" fill="${color}" stroke="#0F172A" stroke-width="2"/>
      ${completed ? '<path d="M8.5 12.5l2 2 5-5" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' : ""}
    </svg>
  `;
  return L.divIcon({
    html: `<div style="filter: drop-shadow(0 0 4px ${glowColor})">${svg}</div>`,
    className: "",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

export function HuntMap({ waypoints }: { waypoints: Waypoint[] }) {
  if (!waypoints || waypoints.length === 0) return null;

  // Calculate center from all waypoints
  const avgLat =
    waypoints.reduce((sum, w) => sum + w.lat, 0) / waypoints.length;
  const avgLng =
    waypoints.reduce((sum, w) => sum + w.lng, 0) / waypoints.length;

  // Calculate bounds padding for zoom
  const lats = waypoints.map((w) => w.lat);
  const lngs = waypoints.map((w) => w.lng);
  const bounds = L.latLngBounds(
    [Math.min(...lats) - 0.01, Math.min(...lngs) - 0.01],
    [Math.max(...lats) + 0.01, Math.max(...lngs) + 0.01]
  );

  const polylinePositions: [number, number][] = waypoints.map((w) => [
    w.lat,
    w.lng,
  ]);

  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10" style={{ height: 200 }}>
      <MapContainer
        center={[avgLat, avgLng]}
        bounds={bounds}
        zoom={11}
        className="w-full h-full"
        zoomControl={false}
        scrollWheelZoom={false}
        dragging={false}
        doubleClickZoom={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution=""
        />

        {/* Dashed polyline connecting waypoints */}
        <Polyline
          positions={polylinePositions}
          pathOptions={{
            color: "#7C3AED",
            weight: 2,
            opacity: 0.6,
            dashArray: "8, 8",
          }}
        />

        {/* Waypoint markers */}
        {waypoints.map((wp, i) => (
          <Marker
            key={i}
            position={[wp.lat, wp.lng]}
            icon={createWaypointIcon(wp.completed)}
          />
        ))}
      </MapContainer>
    </div>
  );
}
