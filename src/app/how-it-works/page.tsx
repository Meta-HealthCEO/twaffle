"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { BottomNav } from "@/components/BottomNav";
import {
  MapPin,
  Camera,
  Tag,
  QrCode,
  UserPlus,
  BarChart3,
  Smartphone,
  Store,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

interface Step {
  number: number;
  icon: typeof MapPin;
  title: string;
  description: string;
  color: string;
}

const userSteps: Step[] = [
  {
    number: 1,
    icon: Smartphone,
    title: "Download & Explore",
    description:
      "Open the map to browse nearby deals or switch to AR camera to discover pins in the real world around you.",
    color: "text-primary-light",
  },
  {
    number: 2,
    icon: Tag,
    title: "Discover Deals",
    description:
      "Find pins dropped by local businesses near you. Filter by category, distance, or discount value to find the best offers.",
    color: "text-accent",
  },
  {
    number: 3,
    icon: QrCode,
    title: "Claim & Save",
    description:
      "Tap to claim a deal, show the QR code at the business, and enjoy your discount. Earn XP and climb the leaderboard!",
    color: "text-yellow-400",
  },
];

const businessSteps: Step[] = [
  {
    number: 1,
    icon: UserPlus,
    title: "Sign Up",
    description:
      "Create your business profile in minutes. Add your logo, location, and details to get started on Twaffle.",
    color: "text-pink-400",
  },
  {
    number: 2,
    icon: MapPin,
    title: "Drop Pins",
    description:
      "Place deals on the map for users to find. Set your discount, claim limits, and expiry dates to control your campaign.",
    color: "text-primary-light",
  },
  {
    number: 3,
    icon: BarChart3,
    title: "Track Results",
    description:
      "Monitor views, claims, and conversions in real-time. Use analytics to optimise your campaigns and grow your customer base.",
    color: "text-accent",
  },
];

function StepCard({ step, index, sectionDelay }: { step: Step; index: number; sectionDelay: number }) {
  const StepIcon = step.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: sectionDelay + index * 0.15 }}
      className="glass rounded-3xl p-5 relative"
    >
      {/* Number badge */}
      <div className="absolute -top-3 -left-1">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg shadow-primary/25">
          <span className="text-sm font-black text-white">{step.number}</span>
        </div>
      </div>

      {/* Icon */}
      <div className="flex items-start gap-4 mt-2">
        <div className="w-12 h-12 rounded-2xl bg-dark-lighter flex items-center justify-center shrink-0">
          <StepIcon size={24} className={step.color} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-base mb-1">{step.title}</h4>
          <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
        </div>
      </div>

      {/* Connector line (not on last item) */}
      {step.number < 3 && (
        <div className="absolute -bottom-4 left-8 w-px h-4 bg-gradient-to-b from-primary/40 to-transparent" />
      )}
    </motion.div>
  );
}

export default function HowItWorksPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-dark pb-24">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute top-2/3 left-1/3 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 px-4 pt-6 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => router.push("/")} className="flex items-center gap-3">
            <Logo size={32} />
          </button>
          <h1 className="text-xl font-bold">How It Works</h1>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-black mb-3">
            <span className="text-primary-light">How</span>{" "}
            <span className="text-accent">Twaffle</span>{" "}
            <span className="text-white">Works</span>
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Discover deals in the real world. Whether you are a bargain hunter or a business
            owner, Twaffle connects you through location-based pins.
          </p>
        </motion.div>

        {/* For Users Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
              <Camera size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold">For Users</h3>
              <p className="text-xs text-gray-400">Find deals, save money, earn rewards</p>
            </div>
          </div>

          <div className="space-y-6">
            {userSteps.map((step, i) => (
              <StepCard key={step.title} step={step} index={i} sectionDelay={0.4} />
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.9 }}
          className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-10"
        />

        {/* For Businesses Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center">
              <Store size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold">For Businesses</h3>
              <p className="text-xs text-gray-400">Reach customers, drive foot traffic</p>
            </div>
          </div>

          <div className="space-y-6">
            {businessSteps.map((step, i) => (
              <StepCard key={step.title} step={step} index={i} sectionDelay={1.1} />
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="glass rounded-3xl p-6 text-center"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <TrendingUp size={32} className="text-accent mx-auto mb-3" />
          </motion.div>
          <h3 className="text-xl font-black mb-2">Ready to Get Started?</h3>
          <p className="text-gray-400 text-sm mb-5">
            Join thousands of users and businesses already using Twaffle to connect.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/map")}
              className="bg-gradient-to-r from-primary to-accent text-white font-bold py-3 px-6 rounded-xl text-sm shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
            >
              Explore Deals
              <ArrowRight size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/pricing")}
              className="glass text-white font-bold py-3 px-6 rounded-xl text-sm hover:bg-dark-lighter transition-colors flex items-center justify-center gap-2"
            >
              Business Pricing
              <ArrowRight size={16} />
            </motion.button>
          </div>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
}
