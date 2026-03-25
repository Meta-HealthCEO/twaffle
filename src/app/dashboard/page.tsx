"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/Logo";
import {
  MapPin,
  Eye,
  MousePointerClick,
  TrendingUp,
  Plus,
  BarChart3,
  ChevronRight,
  Check,
  Zap,
} from "lucide-react";

const pricingTiers = [
  {
    name: "Starter",
    price: "R499",
    period: "/month",
    features: ["5 pin drops/month", "Basic analytics", "Standard visibility", "Email support"],
    popular: false,
  },
  {
    name: "Growth",
    price: "R1,499",
    period: "/month",
    features: [
      "25 pin drops/month",
      "Advanced analytics",
      "Priority visibility",
      "Push notifications",
      "Custom branding",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "R4,999",
    period: "/month",
    features: [
      "Unlimited pin drops",
      "Real-time analytics",
      "Premium placement",
      "AR featured spots",
      "Dedicated manager",
      "API access",
    ],
    popular: false,
  },
];

const mockAnalytics = {
  views: 12453,
  claims: 847,
  conversion: 6.8,
  activePins: 8,
};

export default function DashboardPage() {
  const [wizardStep, setWizardStep] = useState(0);
  const [showWizard, setShowWizard] = useState(false);

  const wizardSteps = [
    {
      title: "Business Details",
      content: (
        <div className="space-y-3">
          <input
            className="w-full bg-dark-lighter rounded-xl p-3 text-sm border border-dark-lighter focus:border-primary outline-none"
            placeholder="Business Name"
          />
          <select className="w-full bg-dark-lighter rounded-xl p-3 text-sm border border-dark-lighter focus:border-primary outline-none text-gray-400">
            <option>Select Category</option>
            <option>Food & Dining</option>
            <option>Retail & Shopping</option>
            <option>Real Estate</option>
            <option>Entertainment</option>
          </select>
          <input
            className="w-full bg-dark-lighter rounded-xl p-3 text-sm border border-dark-lighter focus:border-primary outline-none"
            placeholder="Address"
          />
        </div>
      ),
    },
    {
      title: "Deal Details",
      content: (
        <div className="space-y-3">
          <input
            className="w-full bg-dark-lighter rounded-xl p-3 text-sm border border-dark-lighter focus:border-primary outline-none"
            placeholder="Deal Title (e.g., 50% off lunch)"
          />
          <textarea
            className="w-full bg-dark-lighter rounded-xl p-3 text-sm border border-dark-lighter focus:border-primary outline-none h-24 resize-none"
            placeholder="Deal Description"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              className="w-full bg-dark-lighter rounded-xl p-3 text-sm border border-dark-lighter focus:border-primary outline-none text-gray-400"
            />
            <input
              className="w-full bg-dark-lighter rounded-xl p-3 text-sm border border-dark-lighter focus:border-primary outline-none"
              placeholder="Max Claims"
              type="number"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Pin Location",
      content: (
        <div className="space-y-3">
          <div className="w-full h-48 bg-dark-lighter rounded-xl flex items-center justify-center border border-dark-lighter">
            <div className="text-center text-gray-400">
              <MapPin size={32} className="mx-auto mb-2 text-primary" />
              <p className="text-sm">Tap to place pin on map</p>
              <p className="text-xs">Johannesburg, SA</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Zap size={14} className="text-accent" />
            <span>Pin will be visible to users within 5km radius</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-dark pb-8">
      <div className="px-4 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Logo size={32} />
            <div>
              <h1 className="text-xl font-bold">Business Dashboard</h1>
              <p className="text-xs text-gray-400">Manage your deals & pins</p>
            </div>
          </div>
        </div>

        {/* Analytics cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            {
              icon: Eye,
              label: "Total Views",
              value: mockAnalytics.views.toLocaleString(),
              change: "+12%",
              color: "text-blue-400",
            },
            {
              icon: MousePointerClick,
              label: "Claims",
              value: mockAnalytics.claims.toLocaleString(),
              change: "+8%",
              color: "text-accent",
            },
            {
              icon: TrendingUp,
              label: "Conversion",
              value: `${mockAnalytics.conversion}%`,
              change: "+2.1%",
              color: "text-yellow-400",
            },
            {
              icon: MapPin,
              label: "Active Pins",
              value: mockAnalytics.activePins.toString(),
              change: "+3",
              color: "text-primary-light",
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-4"
            >
              <stat.icon size={20} className={stat.color} />
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-gray-400">{stat.label}</p>
                <span className="text-[10px] text-green-400 font-medium">
                  {stat.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Analytics chart placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-4 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Performance</h3>
            <BarChart3 size={18} className="text-gray-400" />
          </div>
          <div className="flex items-end gap-1.5 h-32">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                className="flex-1 rounded-t-md bg-gradient-to-t from-primary to-accent"
                style={{ opacity: 0.4 + (h / 100) * 0.6 }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-gray-500">
            <span>Jan</span>
            <span>Mar</span>
            <span>Jun</span>
            <span>Sep</span>
            <span>Dec</span>
          </div>
        </motion.div>

        {/* Drop a pin CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setShowWizard(true);
            setWizardStep(0);
          }}
          className="w-full bg-gradient-to-r from-primary to-accent text-white font-bold py-4 rounded-2xl mb-6 flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
        >
          <Plus size={20} />
          Drop a New Pin
        </motion.button>

        {/* Pricing */}
        <h3 className="text-lg font-bold mb-3">Pricing Plans</h3>
        <div className="space-y-3 mb-6">
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className={`glass rounded-2xl p-4 relative ${
                tier.popular ? "border-primary/50 ring-1 ring-primary/30" : ""
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-2 right-4 bg-accent text-dark text-[10px] font-bold px-2 py-0.5 rounded-full">
                  POPULAR
                </span>
              )}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-bold">{tier.name}</h4>
                  <p className="text-2xl font-black">
                    {tier.price}
                    <span className="text-sm text-gray-400 font-normal">
                      {tier.period}
                    </span>
                  </p>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
              <div className="space-y-1.5">
                {tier.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-xs text-gray-300">
                    <Check size={12} className="text-accent shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pin drop wizard modal */}
      <AnimatePresence>
        {showWizard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-dark/80 flex items-end"
            onClick={() => setShowWizard(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full glass-strong rounded-t-3xl p-6"
            >
              <div className="w-10 h-1 bg-gray-600 rounded-full mx-auto mb-4" />

              {/* Progress */}
              <div className="flex items-center gap-2 mb-4">
                {wizardSteps.map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-1 rounded-full transition-colors ${
                      i <= wizardStep ? "bg-accent" : "bg-dark-lighter"
                    }`}
                  />
                ))}
              </div>

              <h3 className="text-lg font-bold mb-1">
                Step {wizardStep + 1}: {wizardSteps[wizardStep].title}
              </h3>
              <p className="text-xs text-gray-400 mb-4">
                {wizardStep + 1} of {wizardSteps.length}
              </p>

              {wizardSteps[wizardStep].content}

              <div className="flex gap-3 mt-6">
                {wizardStep > 0 && (
                  <button
                    onClick={() => setWizardStep(wizardStep - 1)}
                    className="flex-1 glass py-3 rounded-xl text-sm font-medium"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={() => {
                    if (wizardStep < wizardSteps.length - 1) {
                      setWizardStep(wizardStep + 1);
                    } else {
                      setShowWizard(false);
                    }
                  }}
                  className="flex-1 bg-accent text-dark font-bold py-3 rounded-xl text-sm"
                >
                  {wizardStep === wizardSteps.length - 1 ? "Drop Pin!" : "Next"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
