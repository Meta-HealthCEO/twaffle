"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BottomNav } from "@/components/BottomNav";
import { deals, categoryColors } from "@/data/mock";
import type { Deal, Category } from "@/data/mock";
import Image from "next/image";
import {
  MapPin,
  Zap,
  X,
  ChevronRight,
  Crosshair,
  Radar,
  Navigation,
  Eye,
} from "lucide-react";

/* ---------- AR deal card positions and distances ---------- */
const cardConfigs = [
  {
    x: "8%",
    y: "12%",
    rotateX: 8,
    rotateY: -12,
    translateZ: 30,
    distance: "120m",
  },
  {
    x: "52%",
    y: "6%",
    rotateX: -5,
    rotateY: 10,
    translateZ: 20,
    distance: "85m",
  },
  {
    x: "4%",
    y: "42%",
    rotateX: 4,
    rotateY: -8,
    translateZ: 40,
    distance: "350m",
  },
  {
    x: "54%",
    y: "36%",
    rotateX: -6,
    rotateY: 14,
    translateZ: 15,
    distance: "210m",
  },
  {
    x: "22%",
    y: "64%",
    rotateX: 3,
    rotateY: -5,
    translateZ: 25,
    distance: "480m",
  },
];

/* ---------- Floating deal card component ---------- */
function FloatingDealCard({
  deal,
  index,
  onTap,
}: {
  deal: Deal;
  index: number;
  onTap: () => void;
}) {
  const cfg = cardConfigs[index % cardConfigs.length];
  const color = categoryColors[deal.category as Category] ?? "#8B5CF6";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, filter: "blur(12px)" }}
      animate={{
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        y: [0, -6, 0],
      }}
      transition={{
        opacity: { delay: 0.8 + index * 0.35, duration: 0.6 },
        scale: {
          delay: 0.8 + index * 0.35,
          type: "spring",
          stiffness: 180,
          damping: 14,
        },
        filter: { delay: 0.8 + index * 0.35, duration: 0.5 },
        y: {
          duration: 3 + index * 0.4,
          repeat: Infinity,
          delay: index * 0.6,
          ease: "easeInOut",
        },
      }}
      style={{
        position: "absolute",
        left: cfg.x,
        top: cfg.y,
        perspective: "800px",
        zIndex: 10 + index,
      }}
      whileTap={{ scale: 0.93 }}
      onClick={onTap}
      className="cursor-pointer"
    >
      <div
        style={{
          transform: `rotateX(${cfg.rotateX}deg) rotateY(${cfg.rotateY}deg) translateZ(${cfg.translateZ}px)`,
          borderColor: color + "40",
          boxShadow: `0 8px 32px ${color}30, inset 0 1px 0 rgba(255,255,255,0.08)`,
        }}
        className="rounded-2xl p-2.5 w-[140px] backdrop-blur-xl bg-white/[0.07] border border-white/[0.12]"
      >
        {/* Thumbnail + distance badge */}
        <div className="relative w-full h-16 rounded-lg overflow-hidden mb-2">
          <Image
            src={deal.image}
            alt={deal.businessName}
            fill
            className="object-cover"
            sizes="140px"
          />
          {/* Distance indicator */}
          <div className="absolute top-1 right-1 bg-black/70 backdrop-blur-sm rounded-md px-1.5 py-0.5 flex items-center gap-0.5">
            <Navigation size={8} className="text-accent" />
            <span className="text-[9px] font-bold text-accent">
              {cfg.distance}
            </span>
          </div>
        </div>
        {/* Info */}
        <div className="flex items-center gap-1.5 mb-1">
          <span
            className="text-[9px] font-bold px-1.5 py-0.5 rounded-md shrink-0"
            style={{
              backgroundColor: color + "25",
              color: color,
            }}
          >
            {deal.discount}
          </span>
        </div>
        <p className="text-[11px] font-semibold truncate leading-tight">
          {deal.businessName}
        </p>
        <div className="flex items-center gap-1 mt-1 text-[9px] text-accent">
          <Zap size={9} />
          <span>+{deal.points} pts</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- Radar widget component ---------- */
function RadarWidget() {
  return (
    <div className="absolute bottom-4 right-3 z-20 w-[90px] h-[90px]">
      <div className="relative w-full h-full rounded-full border border-accent/30 bg-black/50 backdrop-blur-lg overflow-hidden">
        {/* Grid rings */}
        <div className="absolute inset-[15%] rounded-full border border-accent/15" />
        <div className="absolute inset-[30%] rounded-full border border-accent/10" />
        {/* Cross lines */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-accent/15" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-accent/15" />
        {/* Cardinal labels */}
        <span className="absolute top-[3px] left-1/2 -translate-x-1/2 text-[7px] font-bold text-accent/70">
          N
        </span>
        <span className="absolute bottom-[3px] left-1/2 -translate-x-1/2 text-[7px] font-bold text-accent/70">
          S
        </span>
        <span className="absolute left-[5px] top-1/2 -translate-y-1/2 text-[7px] font-bold text-accent/70">
          W
        </span>
        <span className="absolute right-[5px] top-1/2 -translate-y-1/2 text-[7px] font-bold text-accent/70">
          E
        </span>
        {/* Rotating sweep line */}
        <motion.div
          className="absolute top-1/2 left-1/2 origin-bottom-left"
          style={{ width: "45px", height: "2px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full bg-gradient-to-r from-accent/80 to-transparent rounded-full" />
        </motion.div>
        {/* Sweep glow trail */}
        <motion.div
          className="absolute top-1/2 left-1/2 origin-bottom-left"
          style={{ width: "45px", height: "12px", marginTop: "-6px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full bg-gradient-to-r from-accent/20 to-transparent rounded-full blur-sm" />
        </motion.div>
        {/* Dots representing deals */}
        <div className="absolute w-[5px] h-[5px] rounded-full bg-accent shadow-[0_0_6px_rgba(16,185,129,0.8)] top-[22%] left-[38%]" />
        <div className="absolute w-[4px] h-[4px] rounded-full bg-accent/80 shadow-[0_0_4px_rgba(16,185,129,0.6)] top-[42%] right-[22%]" />
        <div className="absolute w-[5px] h-[5px] rounded-full bg-accent shadow-[0_0_6px_rgba(16,185,129,0.8)] bottom-[28%] left-[28%]" />
        <div className="absolute w-[3px] h-[3px] rounded-full bg-accent/70 shadow-[0_0_4px_rgba(16,185,129,0.5)] top-[30%] right-[32%]" />
        <div className="absolute w-[4px] h-[4px] rounded-full bg-yellow-400 shadow-[0_0_5px_rgba(250,204,21,0.7)] bottom-[35%] right-[26%]" />
        <div className="absolute w-[3px] h-[3px] rounded-full bg-accent/60 shadow-[0_0_4px_rgba(16,185,129,0.5)] top-[55%] left-[20%]" />
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
      </div>
      {/* Label below */}
      <div className="text-center mt-1">
        <p className="text-[8px] text-accent font-semibold tracking-wide">
          6 deals nearby
        </p>
      </div>
    </div>
  );
}

/* ---------- Main AR page ---------- */
export default function ARPage() {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const arDeals = deals.slice(0, 5);
  const [scanPosition, setScanPosition] = useState(0);
  const [hudReady, setHudReady] = useState(false);

  /* Scan line sweep */
  useEffect(() => {
    const interval = setInterval(() => {
      setScanPosition((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 25);
    return () => clearInterval(interval);
  }, []);

  /* Delay HUD appearance for dramatic effect */
  useEffect(() => {
    const timer = setTimeout(() => setHudReady(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-dark pb-24">
      {/* ========== PHONE MOCKUP ========== */}
      <div className="flex justify-center pt-6 px-4">
        <div
          className="relative rounded-[2.5rem] border-[3px] border-gray-700 bg-black shadow-2xl overflow-hidden"
          style={{
            width: "min(85vw, 400px)",
            aspectRatio: "9 / 17.5",
          }}
        >
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-40 w-[120px] h-[28px] bg-black rounded-b-2xl flex items-center justify-center gap-2">
            <div className="w-[10px] h-[10px] rounded-full bg-gray-800 border border-gray-700" />
            <div className="w-[40px] h-[5px] rounded-full bg-gray-800" />
          </div>

          {/* Camera background image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=1200&fit=crop"
              alt="City street camera view"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 85vw, 400px"
              priority
            />
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* ---- AR HUD Overlay ---- */}
          {hudReady && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 z-10 pointer-events-none"
            >
              {/* Corner targeting brackets */}
              <div className="absolute top-10 left-4 w-10 h-10 border-l-2 border-t-2 border-accent rounded-tl-md" />
              <div className="absolute top-10 right-4 w-10 h-10 border-r-2 border-t-2 border-accent rounded-tr-md" />
              <div className="absolute bottom-4 left-4 w-10 h-10 border-l-2 border-b-2 border-accent rounded-bl-md" />
              <div className="absolute bottom-4 right-4 w-10 h-10 border-r-2 border-b-2 border-accent rounded-br-md" />

              {/* Crosshair center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {/* Horizontal line */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-px bg-accent/50" />
                {/* Vertical line */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-8 bg-accent/50" />
                {/* Center dot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent/70" />
              </div>

              {/* Scan line sweeping top to bottom */}
              <div
                className="absolute left-0 right-0 h-[2px]"
                style={{
                  top: `${scanPosition}%`,
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(16,185,129,0) 10%, rgba(16,185,129,0.6) 50%, rgba(16,185,129,0) 90%, transparent 100%)",
                  boxShadow: "0 0 12px 2px rgba(16,185,129,0.3)",
                }}
              />
              {/* Scan line trail / glow area */}
              <div
                className="absolute left-0 right-0"
                style={{
                  top: `${Math.max(0, scanPosition - 5)}%`,
                  height: "5%",
                  background:
                    "linear-gradient(to bottom, transparent, rgba(16,185,129,0.06))",
                }}
              />
            </motion.div>
          )}

          {/* ---- AR ACTIVE status ---- */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute top-11 left-4 z-30 flex items-center gap-2 bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5 border border-accent/30"
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-accent"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-[10px] font-bold text-accent tracking-widest">
              AR ACTIVE
            </span>
          </motion.div>

          {/* Deal count badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute top-11 right-4 z-30 flex items-center gap-1.5 bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/10"
          >
            <Eye size={11} className="text-white/70" />
            <span className="text-[10px] font-medium text-white/90">
              {arDeals.length} found
            </span>
          </motion.div>

          {/* ---- Floating deal cards ---- */}
          <div className="absolute inset-0 z-20">
            {arDeals.map((deal, i) => (
              <FloatingDealCard
                key={deal.id}
                deal={deal}
                index={i}
                onTap={() => setSelectedDeal(deal)}
              />
            ))}
          </div>

          {/* ---- Radar/Compass Widget ---- */}
          <div className="z-30">
            <RadarWidget />
          </div>

          {/* ---- Selected deal detail overlay ---- */}
          <AnimatePresence>
            {selectedDeal && (
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute bottom-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-t border-white/10 rounded-t-3xl p-4"
              >
                <button
                  onClick={() => setSelectedDeal(null)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <X size={14} />
                </button>
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={selectedDeal.image}
                      alt={selectedDeal.businessName}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm truncate">
                      {selectedDeal.businessName}
                    </h3>
                    <p className="text-[11px] text-gray-400 flex items-center gap-1">
                      <MapPin size={10} />
                      {selectedDeal.address}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-300 mb-3 leading-relaxed">
                  {selectedDeal.description}
                </p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-accent text-dark font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-1.5 hover:bg-accent-light transition-colors">
                    <Zap size={14} />
                    Claim &middot; +{selectedDeal.points} pts
                  </button>
                  <button className="px-4 bg-white/10 rounded-xl flex items-center hover:bg-white/20 transition-colors">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Phone shadow accent */}
      <div
        className="mx-auto mt-2 rounded-full blur-2xl opacity-30"
        style={{
          width: "min(60vw, 280px)",
          height: "8px",
          background:
            "linear-gradient(90deg, transparent, #8B5CF6, #10B981, #8B5CF6, transparent)",
        }}
      />

      {/* ========== HOW AR WORKS SECTION ========== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="px-6 mt-10 mb-8 max-w-lg mx-auto"
      >
        <h2 className="text-center text-lg font-bold text-white mb-1">
          How AR Discovery Works
        </h2>
        <p className="text-center text-xs text-gray-400 mb-8">
          Find deals in the real world around you
        </p>

        <div className="space-y-6">
          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex items-start gap-4"
          >
            <div className="shrink-0 w-11 h-11 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center">
              <Crosshair size={20} className="text-accent" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-bold text-accent bg-accent/15 rounded-full px-2 py-0.5">
                  01
                </span>
                <h3 className="text-sm font-bold text-white">Open Camera</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Point your phone at any street and our AR engine scans for
                nearby businesses and deals in real-time.
              </p>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="flex items-start gap-4"
          >
            <div className="shrink-0 w-11 h-11 rounded-xl bg-primary-light/15 border border-primary-light/25 flex items-center justify-center">
              <Radar size={20} className="text-primary-light" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-bold text-primary-light bg-primary-light/15 rounded-full px-2 py-0.5">
                  02
                </span>
                <h3 className="text-sm font-bold text-white">Discover Deals</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                AR pins appear on nearby businesses showing live discounts,
                distance, and rewards you can earn.
              </p>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex items-start gap-4"
          >
            <div className="shrink-0 w-11 h-11 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center">
              <Zap size={20} className="text-yellow-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-bold text-yellow-400 bg-yellow-500/15 rounded-full px-2 py-0.5">
                  03
                </span>
                <h3 className="text-sm font-bold text-white">
                  Claim &amp; Save
                </h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Tap any deal to claim instant vouchers. Walk to the store,
                show your code, and save money on the spot.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ========== BOTTOM NAV ========== */}
      <BottomNav />
    </div>
  );
}
