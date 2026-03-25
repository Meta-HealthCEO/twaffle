"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BottomNav } from "@/components/BottomNav";
import { userProfile } from "@/data/mock";
import {
  ArrowLeft,
  Coins,
  Sparkles,
  Check,
  Disc,
  Lock,
  MapPin,
} from "lucide-react";

interface CoinPackage {
  id: string;
  name: string;
  coins: number;
  price: number;
  bonus?: string;
  bonusColor?: string;
}

const coinPackages: CoinPackage[] = [
  {
    id: "starter",
    name: "Starter",
    coins: 100,
    price: 10,
  },
  {
    id: "popular",
    name: "Popular",
    coins: 600,
    price: 50,
    bonus: "20% bonus",
    bonusColor: "from-primary to-purple-400",
  },
  {
    id: "best-value",
    name: "Best Value",
    coins: 1500,
    price: 100,
    bonus: "50% bonus",
    bonusColor: "from-accent to-emerald-400",
  },
  {
    id: "whale",
    name: "Whale",
    coins: 5000,
    price: 250,
    bonus: "100% bonus",
    bonusColor: "from-yellow-500 to-orange-400",
  },
];

const useCases = [
  {
    icon: Disc,
    title: "Spin the Wheel",
    description: "Use coins to spin for prizes and discounts",
    link: "/spin",
  },
  {
    icon: Lock,
    title: "Unlock Premium Deals",
    description: "Access exclusive deals from top brands",
    link: null,
  },
  {
    icon: MapPin,
    title: "Enter Treasure Hunts",
    description: "Join location-based treasure hunts for big rewards",
    link: "/treasure-hunt",
  },
];

export default function ShopPage() {
  const router = useRouter();
  const [purchasingId, setPurchasingId] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  const handleBuy = (pkg: CoinPackage) => {
    if (purchasingId || successId) return;
    setPurchasingId(pkg.id);

    // Simulate payment processing
    setTimeout(() => {
      setPurchasingId(null);
      setSuccessId(pkg.id);

      // Reset after 2 seconds
      setTimeout(() => {
        setSuccessId(null);
      }, 2000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-dark pb-24">
      <div className="px-4 pt-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 glass rounded-xl flex items-center justify-center"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">Coin Shop</h1>
        </div>

        {/* Coin Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-3xl p-5 mb-6 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-3xl">🪙</span>
            <span className="text-4xl font-bold text-yellow-400">
              {userProfile.coins}
            </span>
          </div>
          <p className="text-gray-400 text-sm">Your current balance</p>
        </motion.div>

        {/* Coin Packages */}
        <h3 className="text-lg font-bold mb-3">Buy Coins</h3>
        <div className="grid grid-cols-2 gap-3 mb-8">
          {coinPackages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="glass rounded-2xl p-4 relative overflow-hidden"
            >
              {/* Bonus Badge */}
              {pkg.bonus && (
                <div
                  className={`absolute -top-0 -right-0 bg-gradient-to-r ${pkg.bonusColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-bl-xl`}
                >
                  {pkg.bonus}
                </div>
              )}

              <p className="text-xs text-gray-400 font-medium mb-1 mt-1">
                {pkg.name}
              </p>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-lg">🪙</span>
                <span className="text-2xl font-bold">{pkg.coins.toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-300 mb-3">
                R{pkg.price}
              </p>

              <AnimatePresence mode="wait">
                {successId === pkg.id ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="w-full py-2 rounded-xl bg-accent/20 flex items-center justify-center gap-1.5"
                  >
                    <Check size={16} className="text-accent" />
                    <span className="text-xs font-bold text-accent">
                      Coins added!
                    </span>
                  </motion.div>
                ) : (
                  <motion.button
                    key="buy"
                    initial={{ opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    onClick={() => handleBuy(pkg)}
                    disabled={purchasingId !== null}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-bold transition-opacity disabled:opacity-50"
                  >
                    {purchasingId === pkg.id ? (
                      <motion.span
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                      >
                        Processing...
                      </motion.span>
                    ) : (
                      "Buy"
                    )}
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* What can you do with coins */}
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
          <Sparkles size={18} className="text-yellow-400" />
          What can you do with coins?
        </h3>
        <div className="space-y-3">
          {useCases.map((item, i) => {
            const Icon = item.icon;
            const content = (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="glass rounded-2xl p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-primary-light" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            );

            if (item.link) {
              return (
                <button
                  key={item.title}
                  onClick={() => router.push(item.link!)}
                  className="w-full text-left"
                >
                  {content}
                </button>
              );
            }

            return content;
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
