"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BottomNav } from "@/components/BottomNav";
import { Logo } from "@/components/Logo";
import {
  userProfile,
  achievementBadges,
  dailyChallenges,
  territories,
} from "@/data/mock";
import type { AchievementBadge, DailyChallenge, Territory } from "@/data/mock";
import { useRouter } from "next/navigation";
import {
  User,
  Settings,
  Bell,
  Shield,
  HelpCircle,
  ChevronRight,
  Flame,
  Target,
  Award,
  MapPin,
  Crown,
  Coins,
  Compass,
  Trophy,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
  const [countdown, setCountdown] = useState("");

  // Countdown timer to midnight - initialized in useEffect to avoid hydration mismatch
  useEffect(() => {
    const calcTimeLeft = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
    };

    setCountdown(calcTimeLeft());

    const interval = setInterval(() => {
      setCountdown(calcTimeLeft());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { icon: Bell, label: "Notifications", badge: "3" },
    { icon: Settings, label: "Settings" },
    { icon: Shield, label: "Privacy" },
    { icon: HelpCircle, label: "Help & Support" },
  ];

  // Map territories to SVG positions (approximate relative positions based on lat/lng)
  const territoryPositions: { t: Territory; cx: number; cy: number; r: number }[] = (() => {
    const lats = territories.map((t) => t.lat);
    const lngs = territories.map((t) => t.lng);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    const latRange = maxLat - minLat || 1;
    const lngRange = maxLng - minLng || 1;
    const padding = 40;
    const svgW = 280;
    const svgH = 160;

    return territories.map((t) => ({
      t,
      cx: padding + ((t.lng - minLng) / lngRange) * (svgW - padding * 2),
      // Invert lat since higher latitude = more north = top of SVG
      cy: padding + ((t.lat - minLat) / latRange) * (svgH - padding * 2),
      r: Math.max(16, Math.min(32, t.radius / 60)),
    }));
  })();

  const sandtonTerritory = territories[0];

  return (
    <div className="min-h-screen bg-dark pb-20">
      <div className="px-4 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Logo size={32} />
            <h1 className="text-xl font-bold">Profile</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-yellow-400 font-semibold">
            <Coins size={16} />
            <span>{userProfile.coins}</span>
          </div>
        </div>

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-5 mb-6 text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-3">
            <User size={36} />
          </div>
          <h2 className="text-xl font-bold">{userProfile.name}</h2>
          <p className="text-gray-400 text-sm mb-4">
            Deal Hunter Extraordinaire
          </p>

          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: Award, label: "Level", value: userProfile.level },
              { icon: Target, label: "Deals", value: userProfile.dealsFound },
              {
                icon: Flame,
                label: "Streak",
                value: `${userProfile.streak}d`,
              },
              {
                icon: MapPin,
                label: "Rank",
                value: `#${userProfile.rank}`,
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="text-center"
              >
                <stat.icon
                  size={18}
                  className="mx-auto mb-1 text-primary-light"
                />
                <p className="text-sm font-bold">{stat.value}</p>
                <p className="text-[10px] text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Daily Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold">
              {"\u{1F525}"} Daily Challenges
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-accent text-sm font-semibold">
                {"\u{1F525}"} {userProfile.streak} day streak!
              </span>
            </div>
          </div>

          {countdown && (
            <p className="text-xs text-gray-400 mb-3">
              Resets in{" "}
              <span className="text-primary-light font-mono">{countdown}</span>
            </p>
          )}

          <div className="space-y-3">
            {dailyChallenges.map((challenge, i) => {
              const pct = Math.round(
                (challenge.current / challenge.target) * 100
              );
              return (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="glass rounded-2xl p-4 relative overflow-hidden"
                >
                  {challenge.completed && (
                    <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center z-10">
                      <span className="text-4xl opacity-30">
                        {"\u2705"}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold">
                      {challenge.title}
                    </span>
                    <span className="text-xs text-yellow-400 flex items-center gap-1">
                      {"\u{1FA99}"} {challenge.reward}
                    </span>
                  </div>
                  <div className="w-full bg-dark-lighter rounded-full h-2 mb-1">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                      className={`h-2 rounded-full ${
                        challenge.completed
                          ? "bg-green-500"
                          : "bg-gradient-to-r from-primary to-accent"
                      }`}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">
                      {challenge.current}/{challenge.target}
                    </span>
                    <span className="text-[10px] text-primary-light font-medium">
                      {pct}%
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Achievement Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h3 className="text-lg font-bold mb-3">
            {"\u{1F3C6}"} Achievement Badges
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {achievementBadges.map((badge, i) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 + i * 0.05 }}
                onClick={() =>
                  setSelectedBadge(
                    selectedBadge === badge.id ? null : badge.id
                  )
                }
                className={`glass rounded-2xl p-3 text-center cursor-pointer transition-all ${
                  !badge.unlocked ? "opacity-50 grayscale" : ""
                }`}
              >
                <div className="relative w-14 h-14 mx-auto mb-1">
                  {/* Progress ring for locked badges */}
                  {!badge.unlocked && (
                    <svg
                      className="absolute inset-0 w-14 h-14 -rotate-90"
                      viewBox="0 0 56 56"
                    >
                      <circle
                        cx="28"
                        cy="28"
                        r="24"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="3"
                      />
                      <circle
                        cx="28"
                        cy="28"
                        r="24"
                        fill="none"
                        stroke="#7C3AED"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray={`${
                          (badge.progress / 100) * 2 * Math.PI * 24
                        } ${2 * Math.PI * 24}`}
                      />
                    </svg>
                  )}
                  {/* Green glow ring for unlocked badges */}
                  {badge.unlocked && (
                    <svg
                      className="absolute inset-0 w-14 h-14"
                      viewBox="0 0 56 56"
                    >
                      <circle
                        cx="28"
                        cy="28"
                        r="24"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="3"
                        opacity="0.6"
                      />
                      <circle
                        cx="28"
                        cy="28"
                        r="24"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="6"
                        opacity="0.15"
                      />
                    </svg>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl">{badge.icon}</span>
                  </div>
                </div>
                <p className="text-xs font-semibold mt-1">{badge.label}</p>
                <AnimatePresence>
                  {selectedBadge === badge.id ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-[10px] text-gray-300 mt-1">
                        {badge.description}
                      </p>
                      <p className="text-[9px] text-primary-light mt-0.5 italic">
                        {badge.requirement}
                      </p>
                    </motion.div>
                  ) : (
                    <p className="text-[10px] text-gray-400">
                      {badge.unlocked
                        ? "Unlocked"
                        : `${badge.progress}%`}
                    </p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* My Territories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={20} className="text-primary-light" />
            <h3 className="text-lg font-bold">My Territories</h3>
          </div>

          {/* Mini Territory Map (SVG) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55 }}
            className="glass rounded-2xl p-4 mb-3"
          >
            <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wider">
              Territory Overview
            </p>
            <svg
              viewBox="0 0 280 160"
              className="w-full h-auto"
              style={{ maxHeight: 160 }}
            >
              {/* Background grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={`hgrid-${i}`}
                  x1="0"
                  y1={i * 40}
                  x2="280"
                  y2={i * 40}
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth="1"
                />
              ))}
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <line
                  key={`vgrid-${i}`}
                  x1={i * 46.67}
                  y1="0"
                  x2={i * 46.67}
                  y2="160"
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth="1"
                />
              ))}

              {/* Territory circles */}
              {territoryPositions.map(({ t, cx, cy, r }) => (
                <g key={t.id}>
                  {/* Outer glow */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r + 4}
                    fill={t.color}
                    opacity={0.15}
                  />
                  {/* Main circle */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill={t.color}
                    opacity={0.3}
                    stroke={t.color}
                    strokeWidth="2"
                  />
                  {/* Center dot */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={3}
                    fill={t.color}
                  />
                  {/* Label */}
                  <text
                    x={cx}
                    y={cy + r + 12}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.7)"
                    fontSize="9"
                    fontWeight="600"
                  >
                    {t.name}
                  </text>
                  {/* Crown emoji for rank 1 */}
                  {t.rank === 1 && (
                    <text
                      x={cx}
                      y={cy - r - 4}
                      textAnchor="middle"
                      fontSize="12"
                    >
                      {"\u{1F451}"}
                    </text>
                  )}
                </g>
              ))}
            </svg>
          </motion.div>

          {/* Territory Cards */}
          <div className="space-y-2 mb-3">
            {territories.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.08 }}
                className="glass rounded-2xl p-4 flex items-center gap-3"
                style={{ borderLeft: `3px solid ${t.rank <= 3 ? "#10B981" : "#7C3AED"}` }}
              >
                {/* Rank indicator */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background:
                      t.rank === 1
                        ? "linear-gradient(135deg, #F59E0B, #EF4444)"
                        : t.rank <= 3
                        ? "rgba(16, 185, 129, 0.2)"
                        : "rgba(124, 58, 237, 0.2)",
                  }}
                >
                  {t.rank === 1 ? (
                    <Crown size={18} className="text-yellow-300" />
                  ) : (
                    <span
                      className="text-sm font-bold"
                      style={{ color: t.rank <= 3 ? "#10B981" : "#7C3AED" }}
                    >
                      #{t.rank}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">{t.name}</p>
                  <p className="text-[11px] text-gray-400">
                    Rank #{t.rank} of {t.totalPlayers} players
                  </p>
                </div>

                {/* Deals found */}
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-primary-light">{t.dealsFound}</p>
                  <p className="text-[10px] text-gray-400">deals</p>
                </div>

                {/* Rank progress bar */}
                <div className="w-12 shrink-0">
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.max(5, ((t.totalPlayers - t.rank + 1) / t.totalPlayers) * 100)}%`,
                      }}
                      transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                      className="h-full rounded-full"
                      style={{
                        background:
                          t.rank === 1
                            ? "linear-gradient(90deg, #F59E0B, #EF4444)"
                            : t.rank <= 3
                            ? "#10B981"
                            : "#7C3AED",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Territory Leaderboard - Sandton CBD */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="glass rounded-2xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Crown size={16} className="text-yellow-400" />
              <p className="text-sm font-bold">{sandtonTerritory.name} Leaderboard</p>
            </div>
            <p className="text-xs text-gray-400 mb-3">
              Territory Leader: <span className="text-green-400 font-semibold">You!</span>{" "}
              <span className="text-white font-medium">
                #{sandtonTerritory.rank} of {sandtonTerritory.totalPlayers}
              </span>
            </p>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-gray-400">Dominance</span>
                <span className="text-green-400 font-semibold">
                  {Math.round(
                    ((sandtonTerritory.totalPlayers - sandtonTerritory.rank + 1) /
                      sandtonTerritory.totalPlayers) *
                      100
                  )}
                  %
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((sandtonTerritory.totalPlayers - sandtonTerritory.rank + 1) / sandtonTerritory.totalPlayers) * 100}%`,
                  }}
                  transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400"
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-gray-500 mt-1">
                <span>{sandtonTerritory.dealsFound} deals claimed</span>
                <span>{sandtonTerritory.totalPlayers} competing</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mb-6"
        >
          <h3 className="text-lg font-bold mb-3">Quick Links</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => router.push("/treasure-hunt")}
              className="glass rounded-2xl p-4 flex items-center gap-3 hover:bg-dark-lighter transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center shrink-0">
                <Compass size={20} className="text-yellow-400" />
              </div>
              <div>
                <p className="text-sm font-bold">Treasure Hunts</p>
                <p className="text-[10px] text-gray-400">3 active hunts</p>
              </div>
            </button>
            <button
              onClick={() => router.push("/leaderboard")}
              className="glass rounded-2xl p-4 flex items-center gap-3 hover:bg-dark-lighter transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center shrink-0">
                <Trophy size={20} className="text-pink-400" />
              </div>
              <div>
                <p className="text-sm font-bold">Leaderboard</p>
                <p className="text-[10px] text-gray-400">Rank #{userProfile.rank}</p>
              </div>
            </button>
          </div>
        </motion.div>

        {/* Settings Menu */}
        <h3 className="text-lg font-bold mb-3">Settings</h3>
        <div className="space-y-2">
          {menuItems.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="w-full glass rounded-2xl p-4 flex items-center gap-3 hover:bg-dark-lighter transition-colors"
            >
              <item.icon size={20} className="text-gray-400" />
              <span className="flex-1 text-left text-sm font-medium">
                {item.label}
              </span>
              {item.badge && (
                <span className="bg-accent text-dark text-xs font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
              <ChevronRight size={16} className="text-gray-500" />
            </motion.button>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
