"use client";

import { usePathname, useRouter } from "next/navigation";
import { MapPin, Camera, RotateCw, Wallet, User } from "lucide-react";
import { motion } from "framer-motion";
import { userProfile } from "@/data/mock";

const navItems = [
  { path: "/map", label: "Map", icon: MapPin, special: false },
  { path: "/ar", label: "AR", icon: Camera, special: false },
  { path: "/spin", label: "Spin", icon: RotateCw, special: true },
  { path: "/wallet", label: "Wallet", icon: Wallet, special: false },
  { path: "/profile", label: "Profile", icon: User, special: false },
];

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-strong">
      {/* Coin balance bar */}
      <div className="flex items-center justify-center gap-1.5 py-1 border-b border-white/5">
        <span className="text-xs">{"\u{1FA99}"}</span>
        <span className="text-xs font-bold text-yellow-400">{userProfile.coins} coins</span>
      </div>
      <div className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          if (item.special) {
            return (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className="flex flex-col items-center gap-0.5 px-3 py-1.5 -mt-3 relative"
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg spin-glow ${
                    isActive
                      ? "bg-gradient-to-br from-primary to-accent shadow-primary/40"
                      : "bg-gradient-to-br from-primary/90 to-accent/90 shadow-primary/30"
                  }`}
                >
                  <Icon size={26} className="text-white" />
                </div>
                <span
                  className={`text-[10px] font-medium ${
                    isActive ? "text-accent" : "text-gray-400"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          }

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
