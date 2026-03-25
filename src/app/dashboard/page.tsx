"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { BottomNav } from "@/components/BottomNav";
import dynamic from "next/dynamic";
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
  Clock,
  ShoppingBag,
  Utensils,
  Film,
  Home,
} from "lucide-react";

/* ───────────────────── Recharts (SSR-safe) ───────────────────── */

const AreaChart = dynamic(
  () => import("recharts").then((mod) => mod.AreaChart),
  { ssr: false }
);
const Area = dynamic(() => import("recharts").then((mod) => mod.Area), {
  ssr: false,
});
const XAxis = dynamic(() => import("recharts").then((mod) => mod.XAxis), {
  ssr: false,
});
const YAxis = dynamic(() => import("recharts").then((mod) => mod.YAxis), {
  ssr: false,
});
const CartesianGrid = dynamic(
  () => import("recharts").then((mod) => mod.CartesianGrid),
  { ssr: false }
);
const Tooltip = dynamic(
  () => import("recharts").then((mod) => mod.Tooltip),
  { ssr: false }
);
const ResponsiveContainer = dynamic(
  () => import("recharts").then((mod) => mod.ResponsiveContainer),
  { ssr: false }
);
const PieChart = dynamic(
  () => import("recharts").then((mod) => mod.PieChart),
  { ssr: false }
);
const Pie = dynamic(() => import("recharts").then((mod) => mod.Pie), {
  ssr: false,
});
const Cell = dynamic(() => import("recharts").then((mod) => mod.Cell), {
  ssr: false,
});

/* ───────────────────── Data ───────────────────── */

const monthlyData = [
  { month: "Jan", views: 4200, claims: 320 },
  { month: "Feb", views: 5100, claims: 410 },
  { month: "Mar", views: 4800, claims: 380 },
  { month: "Apr", views: 6200, claims: 520 },
  { month: "May", views: 5800, claims: 470 },
  { month: "Jun", views: 7100, claims: 610 },
  { month: "Jul", views: 6800, claims: 580 },
  { month: "Aug", views: 7500, claims: 650 },
  { month: "Sep", views: 8200, claims: 720 },
  { month: "Oct", views: 9100, claims: 810 },
  { month: "Nov", views: 8800, claims: 760 },
  { month: "Dec", views: 9500, claims: 847 },
];

const categoryData = [
  { name: "Food", value: 45, color: "#F59E0B" },
  { name: "Retail", value: 25, color: "#EC4899" },
  { name: "Entertainment", value: 20, color: "#8B5CF6" },
  { name: "Real Estate", value: 10, color: "#3B82F6" },
];

const categoryIcons: Record<string, typeof Utensils> = {
  Food: Utensils,
  Retail: ShoppingBag,
  Entertainment: Film,
  "Real Estate": Home,
};

const recentActivity = [
  {
    id: 1,
    user: "Thabo M.",
    deal: "50% off Lunch Special",
    category: "Food",
    time: "2 min ago",
  },
  {
    id: 2,
    user: "Naledi K.",
    deal: "Free Coffee with Pastry",
    category: "Food",
    time: "8 min ago",
  },
  {
    id: 3,
    user: "James R.",
    deal: "20% off Sneakers",
    category: "Retail",
    time: "15 min ago",
  },
  {
    id: 4,
    user: "Zanele D.",
    deal: "2-for-1 Movie Tickets",
    category: "Entertainment",
    time: "23 min ago",
  },
  {
    id: 5,
    user: "Pieter V.",
    deal: "Open House Tour",
    category: "Real Estate",
    time: "41 min ago",
  },
  {
    id: 6,
    user: "Amahle S.",
    deal: "Buy 1 Get 1 Burger",
    category: "Food",
    time: "1 hr ago",
  },
];

const pricingTiers = [
  {
    name: "Starter",
    price: "R499",
    period: "/month",
    features: [
      "5 pin drops/month",
      "Basic analytics",
      "Standard visibility",
      "Email support",
    ],
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

/* ───────────────────── Component ───────────────────── */

export default function DashboardPage() {
  const router = useRouter();
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
            <option>Food &amp; Dining</option>
            <option>Retail &amp; Shopping</option>
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
    <div className="min-h-screen bg-dark pb-24">
      <div className="px-4 pt-6">
        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Logo size={32} />
            <div>
              <h1 className="text-xl font-bold">Business Dashboard</h1>
              <p className="text-xs text-gray-400">
                Manage your deals &amp; pins
              </p>
            </div>
          </div>
        </div>

        {/* ── Analytics cards ── */}
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

        {/* ── Performance Area Chart ── */}
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
          <div className="w-full h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyData}
                margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="gradViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="gradClaims"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1E293B"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#64748B", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748B", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E293B",
                    border: "1px solid #334155",
                    borderRadius: "12px",
                    fontSize: "12px",
                    color: "#F8FAFC",
                  }}
                  itemStyle={{ color: "#F8FAFC" }}
                  labelStyle={{ color: "#94A3B8", fontWeight: 600 }}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#7C3AED"
                  strokeWidth={2}
                  fill="url(#gradViews)"
                  name="Views"
                />
                <Area
                  type="monotone"
                  dataKey="claims"
                  stroke="#10B981"
                  strokeWidth={2}
                  fill="url(#gradClaims)"
                  name="Claims"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#7C3AED]" />
              <span className="text-xs text-gray-400">Views</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#10B981]" />
              <span className="text-xs text-gray-400">Claims</span>
            </div>
          </div>
        </motion.div>

        {/* ── Category Breakdown Pie Chart ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl p-4 mb-6"
        >
          <h3 className="font-semibold mb-4">Deal Categories</h3>
          <div className="flex items-center">
            <div className="w-1/2 h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {categoryData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1E293B",
                      border: "1px solid #334155",
                      borderRadius: "12px",
                      fontSize: "12px",
                      color: "#F8FAFC",
                    }}
                    itemStyle={{ color: "#F8FAFC" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-3 pl-2">
              {categoryData.map((cat) => {
                const Icon = categoryIcons[cat.name] ?? ShoppingBag;
                return (
                  <div key={cat.name} className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: cat.color }}
                    />
                    <Icon size={14} className="text-gray-400 shrink-0" />
                    <span className="text-xs text-gray-300 flex-1">
                      {cat.name}
                    </span>
                    <span className="text-xs font-semibold text-gray-200">
                      {cat.value}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ── Recent Activity Feed ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="glass rounded-2xl p-4 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Activity</h3>
            <Clock size={18} className="text-gray-400" />
          </div>
          <div className="space-y-3">
            {recentActivity.map((item, i) => {
              const Icon = categoryIcons[item.category] ?? ShoppingBag;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 w-8 h-8 rounded-full bg-dark-lighter flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-200 leading-tight">
                      <span className="font-semibold text-white">
                        {item.user}
                      </span>{" "}
                      claimed{" "}
                      <span className="text-accent font-medium">
                        {item.deal}
                      </span>
                    </p>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      {item.time}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Drop a Pin CTA ── */}
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

        {/* ── Pricing Plans ── */}
        <h3 className="text-lg font-bold mb-3">Pricing Plans</h3>
        <div className="space-y-3 mb-3">
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
                  <div
                    key={f}
                    className="flex items-center gap-2 text-xs text-gray-300"
                  >
                    <Check size={12} className="text-accent shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <button
          onClick={() => router.push("/pricing")}
          className="text-primary-light text-sm font-medium hover:underline underline-offset-4 mb-6 block"
        >
          View full pricing details &rarr;
        </button>
      </div>

      {/* ── Pin Drop Wizard Modal ── */}
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
                  {wizardStep === wizardSteps.length - 1
                    ? "Drop Pin!"
                    : "Next"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <BottomNav />
    </div>
  );
}
