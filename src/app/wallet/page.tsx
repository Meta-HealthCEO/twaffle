"use client";

import { motion } from "framer-motion";
import { BottomNav } from "@/components/BottomNav";
import { DealCard } from "@/components/DealCard";
import { Logo } from "@/components/Logo";
import { deals, userProfile } from "@/data/mock";
import { Wallet, Flame, Star, TrendingUp } from "lucide-react";

export default function WalletPage() {
  const claimedDeals = deals.filter((d) => userProfile.vouchers.includes(d.id));

  return (
    <div className="min-h-screen bg-dark pb-20">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center gap-3 mb-6">
          <Logo size={32} />
          <h1 className="text-xl font-bold">My Wallet</h1>
        </div>

        {/* Points card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary to-primary-light rounded-3xl p-5 mb-4 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <p className="text-purple-200 text-sm mb-1">Total Points</p>
            <p className="text-4xl font-black mb-4">
              {userProfile.points.toLocaleString()}
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Flame size={16} className="text-orange-300" />
                <span className="text-sm font-medium">
                  {userProfile.streak} day streak
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star size={16} className="text-yellow-300" />
                <span className="text-sm font-medium">
                  Level {userProfile.level}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            {
              icon: Wallet,
              label: "Vouchers",
              value: claimedDeals.length,
              color: "text-accent",
            },
            {
              icon: TrendingUp,
              label: "Deals Found",
              value: userProfile.dealsFound,
              color: "text-primary-light",
            },
            {
              icon: Star,
              label: "Rank",
              value: `#${userProfile.rank}`,
              color: "text-yellow-400",
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="glass rounded-2xl p-3 text-center"
            >
              <stat.icon size={20} className={`${stat.color} mx-auto mb-1`} />
              <p className="text-lg font-bold">{stat.value}</p>
              <p className="text-[10px] text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Level progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl p-4 mb-6"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Level {userProfile.level}</span>
            <span className="text-xs text-gray-400">
              {userProfile.xp}/{userProfile.xpToNext} XP
            </span>
          </div>
          <div className="w-full h-2 bg-dark-lighter rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${(userProfile.xp / userProfile.xpToNext) * 100}%`,
              }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {userProfile.xpToNext - userProfile.xp} XP to Level{" "}
            {userProfile.level + 1}
          </p>
        </motion.div>

        {/* Claimed vouchers */}
        <h2 className="text-lg font-bold mb-3">My Vouchers</h2>
        <div className="space-y-3">
          {claimedDeals.map((deal, i) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <DealCard deal={deal} compact />
            </motion.div>
          ))}
        </div>

        {claimedDeals.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Wallet size={48} className="mx-auto mb-3 opacity-30" />
            <p>No vouchers yet</p>
            <p className="text-sm">Start exploring the map to claim deals!</p>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
