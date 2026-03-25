"use client";

import { motion } from "framer-motion";
import { BottomNav } from "@/components/BottomNav";
import { Logo } from "@/components/Logo";
import { leaderboard, userProfile } from "@/data/mock";
import { Trophy, TrendingUp, Flame, Crown } from "lucide-react";

export default function LeaderboardPage() {
  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <div className="min-h-screen bg-dark pb-20">
      <div className="px-4 pt-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Logo size={32} />
          <h1 className="text-xl font-bold">Leaderboard</h1>
        </div>

        {/* Time filter */}
        <div className="flex gap-2 mb-6">
          {["This Week", "This Month", "All Time"].map((label, i) => (
            <button
              key={label}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                i === 0
                  ? "bg-primary text-white"
                  : "glass text-gray-400 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Top 3 podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-end justify-center gap-3 mb-8 px-2"
        >
          {/* 2nd place */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex-1 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center mx-auto mb-2 text-2xl">
              {top3[1].avatar}
            </div>
            <p className="text-sm font-bold truncate">{top3[1].name}</p>
            <p className="text-xs text-accent font-medium">
              {top3[1].points.toLocaleString()}
            </p>
            <div className="mt-2 bg-gray-400/20 rounded-t-xl h-20 flex items-center justify-center">
              <span className="text-2xl font-black text-gray-400">2</span>
            </div>
          </motion.div>

          {/* 1st place */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 text-center"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Crown size={24} className="text-yellow-400 mx-auto mb-1" />
            </motion.div>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center mx-auto mb-2 text-3xl ring-4 ring-yellow-400/30">
              {top3[0].avatar}
            </div>
            <p className="text-sm font-bold truncate">{top3[0].name}</p>
            <p className="text-xs text-accent font-medium">
              {top3[0].points.toLocaleString()}
            </p>
            <div className="mt-2 bg-yellow-400/20 rounded-t-xl h-28 flex items-center justify-center">
              <span className="text-3xl font-black text-yellow-400">1</span>
            </div>
          </motion.div>

          {/* 3rd place */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex-1 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center mx-auto mb-2 text-2xl">
              {top3[2].avatar}
            </div>
            <p className="text-sm font-bold truncate">{top3[2].name}</p>
            <p className="text-xs text-accent font-medium">
              {top3[2].points.toLocaleString()}
            </p>
            <div className="mt-2 bg-amber-600/20 rounded-t-xl h-14 flex items-center justify-center">
              <span className="text-2xl font-black text-amber-600">3</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Rest of leaderboard */}
        <div className="space-y-2">
          {rest.map((entry, i) => (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              className="glass rounded-2xl p-3 flex items-center gap-3"
            >
              <span className="text-sm font-bold text-gray-400 w-6 text-center">
                {entry.rank}
              </span>
              <div className="w-10 h-10 rounded-full bg-dark-lighter flex items-center justify-center text-lg">
                {entry.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{entry.name}</p>
                <p className="text-xs text-gray-400">
                  Level {entry.level} · {entry.dealsFound} deals
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-accent">
                  {entry.points.toLocaleString()}
                </p>
                <p className="text-[10px] text-gray-400">points</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Your position */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl p-3 flex items-center gap-3 border border-primary/30"
        >
          <span className="text-sm font-bold text-primary-light w-6 text-center">
            {userProfile.rank}
          </span>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-lg">
            ⭐
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">You ({userProfile.name})</p>
            <p className="text-xs text-gray-400">
              Level {userProfile.level} · {userProfile.dealsFound} deals
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-accent">
              {userProfile.points.toLocaleString()}
            </p>
            <div className="flex items-center gap-0.5 text-[10px] text-green-400">
              <TrendingUp size={10} />
              <span>+5</span>
            </div>
          </div>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
}
