"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Users, Star, BadgeCheck, Zap } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Deal } from "@/data/mock";
import { categoryColors } from "@/data/mock";

function FlashCountdown({ expiry }: { expiry: string }) {
  const [remaining, setRemaining] = useState<number>(() => {
    const diff = new Date(expiry).getTime() - Date.now();
    return Math.max(0, Math.floor(diff / 1000));
  });

  useEffect(() => {
    if (remaining <= 0) return;

    const interval = setInterval(() => {
      const diff = new Date(expiry).getTime() - Date.now();
      const secs = Math.max(0, Math.floor(diff / 1000));
      setRemaining(secs);
      if (secs <= 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiry, remaining]);

  if (remaining <= 0) {
    return (
      <span className="flex items-center gap-1 text-red-500 font-bold text-xs">
        <Zap size={12} />
        EXPIRED
      </span>
    );
  }

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const display = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <span className="flex items-center gap-1 text-red-400 font-semibold text-xs">
      <Zap size={12} className="text-red-400" />
      {display} left
    </span>
  );
}

export function DealCard({
  deal,
  onClaim,
  compact = false,
}: {
  deal: Deal;
  onClaim?: () => void;
  compact?: boolean;
}) {
  const progress = (deal.claimed / deal.maxClaims) * 100;
  const router = useRouter();

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-3 flex items-center gap-3 cursor-pointer relative"
        onClick={() => router.push(`/deal/${deal.id}`)}
      >
        {/* Flash badge - compact */}
        {deal.isFlash && (
          <div className="absolute top-0 left-0 z-10">
            <span className="flash-badge inline-flex items-center gap-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-tl-2xl rounded-br-lg">
              <Zap size={10} className="fill-white" />
              FLASH
            </span>
          </div>
        )}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
          style={{ backgroundColor: categoryColors[deal.category] + "20" }}
        >
          <Image
            src={deal.image}
            alt={deal.businessName}
            width={48}
            height={48}
            className="object-cover rounded-xl"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <p className="font-semibold text-sm truncate">{deal.businessName}</p>
            {deal.verified && (
              <BadgeCheck size={14} className="text-blue-400 shrink-0" />
            )}
          </div>
          <p className="text-xs text-gray-400 truncate">{deal.description}</p>
          {deal.isFlash && deal.flashExpiry && (
            <FlashCountdown expiry={deal.flashExpiry} />
          )}
        </div>
        <span
          className="text-xs font-bold px-2 py-1 rounded-lg shrink-0"
          style={{
            backgroundColor: categoryColors[deal.category] + "20",
            color: categoryColors[deal.category],
          }}
        >
          {deal.discount}
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className="glass rounded-2xl overflow-hidden cursor-pointer relative"
      onClick={() => router.push(`/deal/${deal.id}`)}
    >
      {/* Flash badge - full card */}
      {deal.isFlash && (
        <div className="absolute top-0 left-0 z-10">
          <span className="flash-badge inline-flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-tl-2xl rounded-br-xl">
            <Zap size={12} className="fill-white" />
            FLASH
          </span>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden shrink-0"
              style={{ backgroundColor: categoryColors[deal.category] + "20" }}
            >
              <Image
                src={deal.image}
                alt={deal.businessName}
                width={56}
                height={56}
                className="object-cover rounded-xl"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-lg">{deal.businessName}</h3>
                {deal.verified && (
                  <BadgeCheck size={16} className="text-blue-400 shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                <span>{deal.rating}</span>
                <span className="mx-1">&middot;</span>
                <span
                  style={{ color: categoryColors[deal.category] }}
                  className="font-medium"
                >
                  {deal.category}
                </span>
              </div>
            </div>
          </div>
          <span
            className="text-sm font-bold px-3 py-1.5 rounded-xl"
            style={{
              backgroundColor: categoryColors[deal.category] + "20",
              color: categoryColors[deal.category],
            }}
          >
            {deal.discount}
          </span>
        </div>

        <p className="text-sm text-gray-300 mb-3">{deal.description}</p>

        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {deal.address}
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
          <span className="flex items-center gap-1">
            <Clock size={12} />
            Expires {deal.expiry}
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} />
            {deal.claimed}/{deal.maxClaims} claimed
          </span>
          {deal.isFlash && deal.flashExpiry && (
            <FlashCountdown expiry={deal.flashExpiry} />
          )}
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-dark-lighter rounded-full mb-4 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ backgroundColor: categoryColors[deal.category] }}
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClaim?.();
            }}
            className="flex-1 bg-accent hover:bg-accent-light text-dark font-bold py-3 rounded-xl transition-colors text-sm"
          >
            Claim Deal &middot; +{deal.points} pts
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="p-3 glass rounded-xl hover:bg-dark-lighter transition-colors"
          >
            <MapPin size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
