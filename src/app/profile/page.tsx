"use client";

import { motion } from "framer-motion";
import { BottomNav } from "@/components/BottomNav";
import { Logo } from "@/components/Logo";
import { userProfile } from "@/data/mock";
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
} from "lucide-react";

export default function ProfilePage() {
  const menuItems = [
    { icon: Bell, label: "Notifications", badge: "3" },
    { icon: Settings, label: "Settings" },
    { icon: Shield, label: "Privacy" },
    { icon: HelpCircle, label: "Help & Support" },
  ];

  const achievements = [
    { icon: "🔥", label: "Hot Streak", desc: "5 day streak", unlocked: true },
    { icon: "🎯", label: "Deal Hunter", desc: "Claim 25 deals", unlocked: true },
    { icon: "🗺️", label: "Explorer", desc: "Visit 10 areas", unlocked: true },
    { icon: "👑", label: "Top 10", desc: "Reach top 10", unlocked: false },
    { icon: "💎", label: "Diamond", desc: "Reach Level 20", unlocked: false },
    { icon: "🌟", label: "Legendary", desc: "Claim 100 deals", unlocked: false },
  ];

  return (
    <div className="min-h-screen bg-dark pb-20">
      <div className="px-4 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Logo size={32} />
            <h1 className="text-xl font-bold">Profile</h1>
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
          <p className="text-gray-400 text-sm mb-4">Deal Hunter Extraordinaire</p>

          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: Award, label: "Level", value: userProfile.level },
              { icon: Target, label: "Deals", value: userProfile.dealsFound },
              { icon: Flame, label: "Streak", value: `${userProfile.streak}d` },
              { icon: MapPin, label: "Rank", value: `#${userProfile.rank}` },
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

        {/* Achievements */}
        <h3 className="text-lg font-bold mb-3">Achievements</h3>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {achievements.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className={`glass rounded-2xl p-3 text-center ${
                !a.unlocked ? "opacity-40" : ""
              }`}
            >
              <span className="text-2xl">{a.icon}</span>
              <p className="text-xs font-semibold mt-1">{a.label}</p>
              <p className="text-[10px] text-gray-400">{a.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Menu */}
        <h3 className="text-lg font-bold mb-3">Settings</h3>
        <div className="space-y-2">
          {menuItems.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
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
