"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BottomNav } from "@/components/BottomNav";
import { deals, categoryColors } from "@/data/mock";
import { MapPin, Zap, X, ChevronRight } from "lucide-react";

function FloatingDeal({
  deal,
  index,
  onTap,
}: {
  deal: (typeof deals)[0];
  index: number;
  onTap: () => void;
}) {
  const positions = [
    { x: "10%", y: "15%", rotate: -5 },
    { x: "55%", y: "8%", rotate: 3 },
    { x: "5%", y: "45%", rotate: -3 },
    { x: "60%", y: "40%", rotate: 5 },
    { x: "25%", y: "65%", rotate: -2 },
    { x: "65%", y: "68%", rotate: 4 },
  ];
  const pos = positions[index % positions.length];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, z: -100 }}
      animate={{
        opacity: 1,
        scale: 1,
        z: 0,
        y: [0, -8, 0],
      }}
      transition={{
        opacity: { delay: index * 0.2, duration: 0.5 },
        scale: { delay: index * 0.2, type: "spring", stiffness: 200 },
        y: { duration: 3, repeat: Infinity, delay: index * 0.5 },
      }}
      style={{
        position: "absolute",
        left: pos.x,
        top: pos.y,
        rotate: pos.rotate,
        perspective: 800,
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onTap}
      className="cursor-pointer"
    >
      <div
        className="glass rounded-2xl p-3 w-40 shadow-lg"
        style={{
          borderColor: categoryColors[deal.category] + "40",
          boxShadow: `0 8px 32px ${categoryColors[deal.category]}20`,
        }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xl">{deal.image}</span>
          <span
            className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
            style={{
              backgroundColor: categoryColors[deal.category] + "20",
              color: categoryColors[deal.category],
            }}
          >
            {deal.discount}
          </span>
        </div>
        <p className="text-xs font-semibold truncate">{deal.businessName}</p>
        <p className="text-[10px] text-gray-400 truncate">{deal.description}</p>
        <div className="flex items-center gap-1 mt-1.5 text-[10px] text-accent">
          <Zap size={10} />
          <span>+{deal.points} pts</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ARPage() {
  const [selectedDeal, setSelectedDeal] = useState<(typeof deals)[0] | null>(null);
  const [visibleDeals, setVisibleDeals] = useState(deals.slice(0, 6));
  const [scanLine, setScanLine] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanLine((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="flex-1 relative overflow-hidden">
        {/* Simulated camera background */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-light to-dark">
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          {/* Scan line */}
          <motion.div
            className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"
            style={{ top: `${scanLine}%` }}
          />
          {/* Corner brackets */}
          <div className="absolute top-8 left-4 w-12 h-12 border-l-2 border-t-2 border-accent/50 rounded-tl-lg" />
          <div className="absolute top-8 right-4 w-12 h-12 border-r-2 border-t-2 border-accent/50 rounded-tr-lg" />
          <div className="absolute bottom-20 left-4 w-12 h-12 border-l-2 border-b-2 border-accent/50 rounded-bl-lg" />
          <div className="absolute bottom-20 right-4 w-12 h-12 border-r-2 border-b-2 border-accent/50 rounded-br-lg" />
        </div>

        {/* Header */}
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
          <div className="glass rounded-2xl px-4 py-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-xs font-medium">AR Discovery Mode</span>
          </div>
          <div className="glass rounded-2xl px-3 py-2 flex items-center gap-1.5">
            <MapPin size={14} className="text-accent" />
            <span className="text-xs">{visibleDeals.length} found</span>
          </div>
        </div>

        {/* Floating deal cards */}
        {visibleDeals.map((deal, i) => (
          <FloatingDeal
            key={deal.id}
            deal={deal}
            index={i}
            onTap={() => setSelectedDeal(deal)}
          />
        ))}

        {/* Radar pulse effect at center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-accent/30"
              animate={{
                scale: [1, 8 + i * 3],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Selected deal detail */}
        <AnimatePresence>
          {selectedDeal && (
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute bottom-16 left-4 right-4 z-20 glass rounded-2xl p-4"
            >
              <button
                onClick={() => setSelectedDeal(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-dark-lighter"
              >
                <X size={14} />
              </button>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
                  style={{
                    backgroundColor: categoryColors[selectedDeal.category] + "20",
                  }}
                >
                  {selectedDeal.image}
                </div>
                <div>
                  <h3 className="font-bold">{selectedDeal.businessName}</h3>
                  <p className="text-xs text-gray-400">{selectedDeal.address}</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-3">{selectedDeal.description}</p>
              <div className="flex gap-2">
                <button className="flex-1 bg-accent text-dark font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-1">
                  <Zap size={14} />
                  Claim · +{selectedDeal.points} pts
                </button>
                <button className="px-4 glass rounded-xl flex items-center">
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <BottomNav />
    </div>
  );
}
