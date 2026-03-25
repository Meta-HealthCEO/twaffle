"use client";

import { usePathname, useRouter } from "next/navigation";
import { Map, Camera, Wallet, User, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { path: "/map", label: "Map", icon: Map },
  { path: "/ar", label: "AR", icon: Camera },
  { path: "/wallet", label: "Wallet", icon: Wallet },
  { path: "/leaderboard", label: "Ranks", icon: Trophy },
  { path: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-strong">
      <div className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors relative"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-primary/20 rounded-xl"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <Icon
                size={22}
                className={isActive ? "text-accent" : "text-gray-400"}
              />
              <span
                className={`text-[10px] font-medium ${
                  isActive ? "text-accent" : "text-gray-400"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
