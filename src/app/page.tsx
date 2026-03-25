"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Logo } from "@/components/Logo";
import { deals } from "@/data/mock";
import {
  MapPin,
  Zap,
  Gift,
  Trophy,
  Star,
  Clock,
  Music,
  Heart,
} from "lucide-react";
import { useMemo } from "react";

// ---------- Particles ----------
function Particles({ count = 20 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: 2 + Math.random() * 2, // 2-4px
        duration: 8 + Math.random() * 12, // 8-20s
        delay: Math.random() * 10,
        opacity: 0.12 + Math.random() * 0.18, // 0.12-0.30
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-primary-light"
          style={{
            left: p.left,
            bottom: -10,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -1200],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// ---------- Featured deals (first 3 verified deals with images) ----------
const featuredDeals = deals.filter((d) => d.verified).slice(0, 3);

// ---------- Page ----------
export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-dark text-white relative overflow-x-hidden">
      {/* ---- Background blobs ---- */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      {/* ---- Particles ---- */}
      <Particles count={20} />

      {/* ============================= HERO ============================= */}
      <section className="relative z-10 flex flex-col items-center justify-center px-6 pt-20 pb-16 text-center max-w-lg mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="mb-6"
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
          className="text-gray-400 text-lg mb-10"
        >
          Catch deals in the wild
        </motion.p>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 gap-3 mb-10 w-full"
        >
          {[
            {
              icon: MapPin,
              label: "Discover",
              desc: "Local deals on map",
              color: "text-primary-light",
            },
            {
              icon: Zap,
              label: "Claim",
              desc: "Instant vouchers",
              color: "text-accent",
            },
            {
              icon: Gift,
              label: "Save",
              desc: "Real discounts",
              color: "text-yellow-400",
            },
            {
              icon: Trophy,
              label: "Compete",
              desc: "Earn points & rank",
              color: "text-pink-400",
            },
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

        {/* CTAs */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/map")}
          className="w-full bg-gradient-to-r from-primary to-accent text-white font-bold py-4 rounded-2xl text-lg shadow-lg shadow-primary/25 mb-4 cursor-pointer"
        >
          Explore the Map
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/spin")}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-4 rounded-2xl text-lg shadow-lg shadow-yellow-500/25 mb-4 cursor-pointer"
        >
          🎰 Spin {"&"} Win Prizes
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="flex gap-4 w-full"
        >
          <button
            onClick={() => router.push("/treasure-hunt")}
            className="flex-1 glass text-white font-semibold py-3 rounded-2xl text-sm cursor-pointer hover:bg-white/10 transition-colors"
          >
            🗺️ Treasure Hunts
          </button>
          <button
            onClick={() => router.push("/shop")}
            className="flex-1 glass text-white font-semibold py-3 rounded-2xl text-sm cursor-pointer hover:bg-white/10 transition-colors"
          >
            🪙 Buy Coins
          </button>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          onClick={() => router.push("/dashboard")}
          className="text-gray-400 text-sm hover:text-white transition-colors cursor-pointer mt-4"
        >
          I&apos;m a business &rarr;
        </motion.button>
      </section>

      {/* ======================== FEATURED DEALS ======================== */}
      <section className="relative z-10 px-6 pb-20 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-center mb-8"
        >
          <span className="text-primary-light">Featured</span> Deals
        </motion.h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredDeals.map((deal, i) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              onClick={() => router.push("/map")}
              className="glass rounded-2xl overflow-hidden cursor-pointer group"
            >
              {/* Image */}
              <div className="relative w-full h-44 overflow-hidden">
                <Image
                  src={deal.image}
                  alt={deal.businessName}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Discount badge */}
                <span className="absolute top-3 left-3 bg-accent/90 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                  {deal.discount}
                </span>
              </div>

              {/* Body */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-sm truncate">
                    {deal.businessName}
                  </h3>
                  <span className="flex items-center gap-1 text-yellow-400 text-xs shrink-0 ml-2">
                    <Star size={12} fill="currentColor" />
                    {deal.rating}
                  </span>
                </div>
                <p className="text-xs text-gray-400 line-clamp-2 mb-3">
                  {deal.description}
                </p>
                <div className="flex items-center justify-between text-[11px] text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin size={11} /> {deal.address.split(",")[0]}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> Expires{" "}
                    {new Date(deal.expiry).toLocaleDateString("en-ZA", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <button
            onClick={() => router.push("/map")}
            className="text-primary-light text-sm font-medium hover:underline underline-offset-4 cursor-pointer"
          >
            View all deals on the map &rarr;
          </button>
        </motion.div>
      </section>

      {/* ============================= FOOTER ============================= */}
      <footer className="relative z-10 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-12">
          {/* Top row: branding + store badges */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-8 mb-10">
            {/* Brand */}
            <div className="flex flex-col items-center sm:items-start gap-3">
              <div className="flex items-center gap-2">
                <Logo size={28} />
                <span className="font-bold text-lg">
                  <span className="text-primary-light">Tw</span>
                  <span className="text-accent">affle</span>
                </span>
              </div>
              <p className="text-gray-500 text-xs max-w-xs text-center sm:text-left">
                Pokemon Go meets local advertising. Discover, claim, and save on
                deals around you.
              </p>
            </div>

            {/* App Store badges (placeholders) */}
            <div className="flex gap-3">
              <span className="glass rounded-xl px-5 py-3 text-xs font-medium text-gray-300 flex items-center gap-2 select-none">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.52-3.23 0-1.44.64-2.2.46-3.06-.4C3.79 16.17 4.36 9.05 8.73 8.78c1.26.06 2.14.72 2.88.76.99-.2 1.94-.78 3-.7 1.28.1 2.24.6 2.88 1.53-2.65 1.6-2.02 5.12.38 6.1-.48 1.26-1.1 2.5-1.82 3.81zM12.05 8.73c-.14-2.2 1.62-4.07 3.73-4.23.3 2.53-2.29 4.43-3.73 4.23z" />
                </svg>
                App Store
              </span>
              <span className="glass rounded-xl px-5 py-3 text-xs font-medium text-gray-300 flex items-center gap-2 select-none">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                >
                  <path d="M3.61 1.814L13.793 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734c0-.382.218-.722.61-.92zM14.5 12.707l2.55 2.55-8.97 5.1 6.42-7.65zm3.88-1.2l1.72.98c.58.33.58.86 0 1.19l-1.54.88-2.74-2.74 2.56-1.31zM8.08 4.643l8.97 5.1-2.55 2.55-6.42-7.65z" />
                </svg>
                Google Play
              </span>
            </div>
          </div>

          {/* Links + Social */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            {/* Nav links */}
            <div className="flex gap-6 text-sm text-gray-400">
              <button
                onClick={() => router.push("/how-it-works")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                How It Works
              </button>
              <button
                onClick={() => router.push("/pricing")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Pricing
              </button>
            </div>

            {/* Social links */}
            <div className="flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-gray-500 hover:text-primary-light transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-500 hover:text-primary-light transition-colors"
              >
                <Heart size={18} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-gray-500 hover:text-primary-light transition-colors"
              >
                <Music size={18} />
              </a>
            </div>
          </div>

          {/* Bottom row */}
          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p>Made with ❤️ in South Africa</p>
            <p>&copy; {new Date().getFullYear()} Twaffle. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
