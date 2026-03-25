"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { deals, categories, categoryColors, type Deal, type Category } from "@/data/mock";
import { DealCard } from "./DealCard";
import { motion, AnimatePresence } from "framer-motion";
import { X, Filter, Zap } from "lucide-react";

function createPinIcon(category: Category) {
  const color = categoryColors[category];
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 52" width="40" height="52">
      <defs>
        <filter id="shadow" x="-20%" y="-10%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="${color}" flood-opacity="0.5"/>
        </filter>
      </defs>
      <path d="M20 0C11.163 0 4 7.163 4 16c0 12 16 32 16 32s16-20 16-32C36 7.163 28.837 0 20 0z" fill="${color}" filter="url(#shadow)"/>
      <circle cx="20" cy="16" r="8" fill="#0F172A"/>
      <circle cx="20" cy="16" r="5" fill="${color}" opacity="0.6"/>
    </svg>
  `;
  return L.divIcon({
    html: `<div class="pin-pulse" style="position:relative">${svg}<div style="position:absolute;top:50%;left:50%;width:40px;height:40px;border-radius:50%;background:${color};opacity:0.3;transform:translate(-50%,-70%);animation:pulse-ring 2s ease-out infinite"></div></div>`,
    className: "",
    iconSize: [40, 52],
    iconAnchor: [20, 52],
    popupAnchor: [0, -52],
  });
}

function FlyToLocation({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 14, { duration: 1.5 });
  }, [lat, lng, map]);
  return null;
}

export function MapViewComponent() {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [activeFilters, setActiveFilters] = useState<Category[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [claimed, setClaimed] = useState<Set<string>>(new Set());
  const [flyTo, setFlyTo] = useState<{ lat: number; lng: number } | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  const filteredDeals = activeFilters.length > 0
    ? deals.filter((d) => activeFilters.includes(d.category))
    : deals;

  const toggleFilter = (cat: Category) => {
    setActiveFilters((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleClaim = useCallback((dealId: string) => {
    setClaimed((prev) => new Set(prev).add(dealId));
    setSelectedDeal(null);
  }, []);

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={[-26.1076, 28.0567]}
        zoom={11}
        className="w-full h-full"
        zoomControl={false}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution=""
        />
        {flyTo && <FlyToLocation lat={flyTo.lat} lng={flyTo.lng} />}
        {filteredDeals.map((deal) => (
          <Marker
            key={deal.id}
            position={[deal.lat, deal.lng]}
            icon={createPinIcon(deal.category)}
            eventHandlers={{
              click: () => {
                setSelectedDeal(deal);
                setFlyTo({ lat: deal.lat, lng: deal.lng });
              },
            }}
          />
        ))}
      </MapContainer>

      {/* Top bar */}
      <div className="absolute top-4 left-4 right-4 z-[1000] flex items-center gap-2">
        <div className="flex-1 glass rounded-2xl px-4 py-3 flex items-center gap-2">
          <Zap size={18} className="text-accent" />
          <span className="text-sm font-medium">{filteredDeals.length} deals nearby</span>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`glass rounded-2xl p-3 transition-colors ${
            showFilters ? "bg-primary/30" : ""
          }`}
        >
          <Filter size={20} className={activeFilters.length > 0 ? "text-accent" : ""} />
        </button>
      </div>

      {/* Filter chips */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-[72px] left-4 right-4 z-[1000] flex gap-2 flex-wrap"
          >
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => toggleFilter(cat.name)}
                className={`glass rounded-xl px-3 py-2 text-sm font-medium flex items-center gap-1.5 transition-colors ${
                  activeFilters.includes(cat.name)
                    ? "bg-primary/30 border-primary/50"
                    : ""
                }`}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom sheet */}
      <AnimatePresence>
        {selectedDeal && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute bottom-16 left-0 right-0 z-[1000] p-4"
          >
            <button
              onClick={() => setSelectedDeal(null)}
              className="absolute top-2 right-6 z-10 p-2 glass rounded-full"
            >
              <X size={16} />
            </button>
            <DealCard
              deal={selectedDeal}
              onClaim={() => handleClaim(selectedDeal.id)}
            />
            {claimed.has(selectedDeal.id) && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-dark/80 rounded-2xl"
              >
                <div className="text-center">
                  <span className="text-5xl">🎉</span>
                  <p className="text-accent font-bold text-lg mt-2">Deal Claimed!</p>
                  <p className="text-gray-400 text-sm">+{selectedDeal.points} points</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
