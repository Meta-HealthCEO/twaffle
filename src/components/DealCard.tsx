"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Users, Star } from "lucide-react";
import type { Deal } from "@/data/mock";
import { categoryColors } from "@/data/mock";

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

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-3 flex items-center gap-3"
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
          style={{ backgroundColor: categoryColors[deal.category] + "20" }}
        >
          {deal.image}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm truncate">{deal.businessName}</p>
          <p className="text-xs text-gray-400 truncate">{deal.description}</p>
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
      className="glass rounded-2xl overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
              style={{ backgroundColor: categoryColors[deal.category] + "20" }}
            >
              {deal.image}
            </div>
            <div>
              <h3 className="font-bold text-lg">{deal.businessName}</h3>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                <span>{deal.rating}</span>
                <span className="mx-1">·</span>
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
            onClick={onClaim}
            className="flex-1 bg-accent hover:bg-accent-light text-dark font-bold py-3 rounded-xl transition-colors text-sm"
          >
            Claim Deal · +{deal.points} pts
          </button>
          <button className="p-3 glass rounded-xl hover:bg-dark-lighter transition-colors">
            <MapPin size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
