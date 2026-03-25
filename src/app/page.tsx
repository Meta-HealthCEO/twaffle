"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { MapPin, Zap, Gift, Trophy } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-sm"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <Logo size={80} />
        </motion.div>

        {/* Brand */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-5xl font-black tracking-tight mb-2"
        >
          <span className="text-primary-light">Tw</span>
          <span className="text-accent">affle</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-400 text-lg mb-8"
        >
          Catch deals in the wild
        </motion.p>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 gap-3 mb-8"
        >
          {[
            { icon: MapPin, label: "Discover", desc: "Local deals on map", color: "text-primary-light" },
            { icon: Zap, label: "Claim", desc: "Instant vouchers", color: "text-accent" },
            { icon: Gift, label: "Save", desc: "Real discounts", color: "text-yellow-400" },
            { icon: Trophy, label: "Compete", desc: "Earn points & rank", color: "text-pink-400" },
          ].map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="glass rounded-2xl p-4 text-left"
            >
              <f.icon size={24} className={`${f.color} mb-2`} />
              <p className="font-semibold text-sm">{f.label}</p>
              <p className="text-xs text-gray-400">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/map")}
          className="w-full bg-gradient-to-r from-primary to-accent text-white font-bold py-4 rounded-2xl text-lg shadow-lg shadow-primary/25 mb-4"
        >
          Explore the Map
        </motion.button>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          onClick={() => router.push("/dashboard")}
          className="text-gray-400 text-sm hover:text-white transition-colors"
        >
          I&apos;m a business →
        </motion.button>

        {/* Floating pins */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              top: `${15 + Math.random() * 70}%`,
              left: `${5 + Math.random() * 90}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {["📍", "🎫", "🏷️", "💰", "🎁", "⭐"][i]}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
