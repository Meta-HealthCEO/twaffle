"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BottomNav } from "@/components/BottomNav";
import { treasureHunts } from "@/data/mock";
import type { TreasureHunt } from "@/data/mock";
import {
  ArrowLeft,
  Gift,
  Briefcase,
  CheckCircle2,
  Circle,
  Clock,
  Trophy,
  MapPin,
} from "lucide-react";

/* ───────────────────── Countdown helper ───────────────────── */

function getTimeRemaining(deadline: string) {
  const diff = new Date(deadline).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, expired: true };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  return { days, hours, minutes, expired: false };
}

/* ───────────────────── Countdown Component ───────────────────── */

function Countdown({ deadline }: { deadline: string }) {
  const [time, setTime] = useState<{
    days: number;
    hours: number;
    minutes: number;
    expired: boolean;
  } | null>(null);

  useEffect(() => {
    setTime(getTimeRemaining(deadline));
    const interval = setInterval(() => {
      setTime(getTimeRemaining(deadline));
    }, 60_000);
    return () => clearInterval(interval);
  }, [deadline]);

  if (!time) return null;

  if (time.expired) {
    return (
      <div className="flex items-center gap-1.5 text-red-400 text-xs font-medium">
        <Clock size={14} />
        <span>Expired</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 text-yellow-400 text-xs font-medium">
      <Clock size={14} />
      <span>
        {time.days}d {time.hours}h {time.minutes}m remaining
      </span>
    </div>
  );
}

/* ───────────────────── Reward Icon ───────────────────── */

function RewardIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "🎫":
      return <Gift size={16} className="text-pink-400" />;
    case "🪙":
      return <span className="text-sm">🪙</span>;
    case "📦":
      return <Briefcase size={16} className="text-blue-400" />;
    default:
      return <span className="text-sm">{icon}</span>;
  }
}

/* ───────────────────── Mini Map ───────────────────── */

function MiniMap({
  locations,
}: {
  locations: TreasureHunt["waypoints"];
}) {
  // Normalize lat/lng into positions within the box
  const lats = locations.map((l) => l.lat);
  const lngs = locations.map((l) => l.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const latRange = maxLat - minLat || 0.01;
  const lngRange = maxLng - minLng || 0.01;

  return (
    <div className="relative w-full h-24 rounded-xl bg-[#0B1120] border border-white/5 overflow-hidden">
      {/* Grid lines for visual effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white/30" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/30" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-white/30" />
        <div className="absolute top-1/3 left-0 right-0 h-px bg-white/30" />
        <div className="absolute top-2/3 left-0 right-0 h-px bg-white/30" />
      </div>

      {/* Location dots */}
      {locations.map((loc, i) => {
        const x = ((loc.lng - minLng) / lngRange) * 80 + 10; // 10%-90% range
        const y = ((maxLat - loc.lat) / latRange) * 70 + 15; // 15%-85% range (inverted)
        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {loc.completed ? (
              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
            ) : (
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-gray-500" />
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-gray-400 animate-ping opacity-40" />
              </div>
            )}
          </div>
        );
      })}

      {/* Label */}
      <div className="absolute bottom-1.5 right-2 flex items-center gap-1 text-[10px] text-gray-500">
        <MapPin size={10} />
        <span>{locations.length} locations</span>
      </div>
    </div>
  );
}

/* ───────────────────── Hunt Card ───────────────────── */

function HuntCard({
  hunt,
  index,
  isCompleted,
}: {
  hunt: TreasureHunt;
  index: number;
  isCompleted?: boolean;
}) {
  const progress = Math.round(
    (hunt.completedSteps / hunt.totalSteps) * 100
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, type: "spring", stiffness: 260, damping: 24 }}
      className={`glass rounded-2xl p-4 ${
        isCompleted
          ? "border border-yellow-500/40 shadow-[0_0_20px_rgba(234,179,8,0.15)]"
          : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-white text-base truncate">
              {hunt.name}
            </h3>
            {isCompleted && (
              <Trophy size={16} className="text-yellow-400 shrink-0" />
            )}
          </div>
          <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">
            {hunt.description}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-gray-400">
            {hunt.completedSteps}/{hunt.totalSteps} steps
          </span>
          <span
            className={`text-xs font-bold ${
              progress === 100 ? "text-emerald-400" : "text-primary-light"
            }`}
          >
            {progress}%
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ delay: index * 0.12 + 0.3, duration: 0.8, ease: "easeOut" }}
            className={`h-full rounded-full ${
              progress === 100
                ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                : "bg-gradient-to-r from-primary to-accent"
            }`}
          />
        </div>
      </div>

      {/* Reward */}
      <div className="flex items-center gap-2 mb-3 bg-white/5 rounded-xl px-3 py-2">
        <RewardIcon icon={hunt.rewardIcon} />
        <span className="text-sm text-gray-200 font-medium">{hunt.reward}</span>
      </div>

      {/* Deadline countdown */}
      {hunt.expiresIn && !isCompleted && (
        <div className="mb-3">
          <Countdown deadline={hunt.expiresIn} />
        </div>
      )}

      {/* Location checklist */}
      <div className="space-y-1.5 mb-3">
        {hunt.waypoints.map((loc, i) => (
          <div key={i} className="flex items-center gap-2">
            {loc.completed ? (
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
            ) : (
              <Circle size={16} className="text-gray-500 shrink-0" />
            )}
            <span
              className={`text-xs ${
                loc.completed
                  ? "text-gray-300 line-through decoration-gray-600"
                  : "text-gray-400"
              }`}
            >
              {loc.label}
            </span>
          </div>
        ))}
      </div>

      {/* Mini map */}
      <MiniMap locations={hunt.waypoints} />

      {/* Claim Reward button for completed hunts */}
      {isCompleted && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-dark font-bold text-sm shadow-lg shadow-emerald-500/25"
        >
          Claim Reward
        </motion.button>
      )}
    </motion.div>
  );
}

/* ───────────────────── Page ───────────────────── */

export default function TreasureHuntPage() {
  const router = useRouter();

  const activeHunts = treasureHunts.filter((h) => h.completedSteps < h.totalSteps);
  const completedHunts = treasureHunts.filter((h) => h.completedSteps >= h.totalSteps);

  return (
    <div className="min-h-screen bg-dark pb-24">
      <div className="px-4 pt-6">
        {/* ── Header ── */}
        <div className="flex items-center gap-3 mb-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.back()}
            className="glass rounded-full p-2.5"
          >
            <ArrowLeft size={22} className="text-white" />
          </motion.button>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 }}
          >
            <h1 className="text-xl font-bold flex items-center gap-2">
              Treasure Hunts
              <span className="text-lg" role="img" aria-label="treasure map">
                🗺️
              </span>
            </h1>
            <p className="text-xs text-gray-400">
              Complete hunts to earn rewards
            </p>
          </motion.div>
        </div>

        {/* ── Active Hunts ── */}
        {activeHunts.length > 0 && (
          <section className="mb-8">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3"
            >
              Active Hunts ({activeHunts.length})
            </motion.h2>
            <div className="space-y-4">
              {activeHunts.map((hunt, i) => (
                <HuntCard key={hunt.id} hunt={hunt} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* ── Completed Hunts ── */}
        {completedHunts.length > 0 && (
          <section className="mb-6">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 + activeHunts.length * 0.12 }}
              className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3"
            >
              Completed ({completedHunts.length})
            </motion.h2>
            <div className="space-y-4">
              {completedHunts.map((hunt, i) => (
                <HuntCard
                  key={hunt.id}
                  hunt={hunt}
                  index={activeHunts.length + i}
                  isCompleted
                />
              ))}
            </div>
          </section>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
