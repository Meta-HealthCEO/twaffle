"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { BottomNav } from "@/components/BottomNav";
import {
  Check,
  Star,
  Zap,
  Crown,
  ChevronDown,
  MapPin,
  BarChart3,
  Eye,
  Mail,
  Bell,
  Palette,
  FlaskConical,
  Activity,
  Award,
  Smartphone,
  Globe,
  Users,
  Key,
} from "lucide-react";

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  icon: typeof Star;
  features: { text: string; icon: typeof Check }[];
  popular: boolean;
  cta: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

const tiers: PricingTier[] = [
  {
    name: "Starter",
    price: "R499",
    period: "/month",
    description: "Perfect for small businesses just getting started with location-based marketing.",
    icon: Star,
    features: [
      { text: "5 pin drops/month", icon: MapPin },
      { text: "Basic analytics", icon: BarChart3 },
      { text: "Standard visibility", icon: Eye },
      { text: "Email support", icon: Mail },
    ],
    popular: false,
    cta: "Get Started",
  },
  {
    name: "Growth",
    price: "R1,499",
    period: "/month",
    description: "For growing businesses ready to reach more customers and optimise campaigns.",
    icon: Zap,
    features: [
      { text: "25 pin drops/month", icon: MapPin },
      { text: "Advanced analytics", icon: Activity },
      { text: "Priority visibility", icon: Eye },
      { text: "Push notifications", icon: Bell },
      { text: "Custom branding", icon: Palette },
      { text: "A/B testing", icon: FlaskConical },
    ],
    popular: true,
    cta: "Start Growing",
  },
  {
    name: "Enterprise",
    price: "R4,999",
    period: "/month",
    description: "Full-featured solution for large businesses and franchises.",
    icon: Crown,
    features: [
      { text: "Unlimited pin drops", icon: MapPin },
      { text: "Real-time analytics", icon: Activity },
      { text: "Premium placement", icon: Award },
      { text: "AR featured spots", icon: Smartphone },
      { text: "Dedicated manager", icon: Users },
      { text: "API access", icon: Key },
      { text: "White-label option", icon: Globe },
    ],
    popular: false,
    cta: "Contact Sales",
  },
];

const faqs: FAQItem[] = [
  {
    question: "Can I change my plan at any time?",
    answer:
      "Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle. If you upgrade mid-cycle, you will be charged a prorated amount.",
  },
  {
    question: "What happens when I run out of pin drops?",
    answer:
      "You can purchase additional pin drops as needed, or upgrade to a higher tier for more monthly allowance. Unused pin drops do not roll over to the next month.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "We offer a 14-day free trial on the Starter and Growth plans. No credit card required. You will have full access to all features included in your chosen tier during the trial period.",
  },
  {
    question: "How does billing work for the Enterprise plan?",
    answer:
      "Enterprise plans are billed monthly or annually (with a 20% discount for annual billing). We also offer custom billing arrangements for large organisations. Contact our sales team for details.",
  },
];

export default function PricingPage() {
  const router = useRouter();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-dark pb-24">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 px-4 pt-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => router.push("/")} className="flex items-center gap-3">
            <Logo size={32} />
          </button>
          <h1 className="text-xl font-bold">Pricing</h1>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-black mb-3">
            <span className="text-primary-light">Simple</span>{" "}
            <span className="text-accent">Pricing</span>
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Choose the plan that fits your business. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {tiers.map((tier, i) => {
            const TierIcon = tier.icon;
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.15 }}
                className={`glass rounded-3xl p-6 relative flex flex-col ${
                  tier.popular
                    ? "border-primary/60 shadow-[0_0_30px_rgba(124,58,237,0.3)]"
                    : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary to-primary-light text-white text-xs font-bold px-4 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      tier.popular
                        ? "bg-gradient-to-br from-primary to-accent"
                        : "bg-dark-lighter"
                    }`}
                  >
                    <TierIcon size={20} className={tier.popular ? "text-white" : "text-primary-light"} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{tier.name}</h3>
                  </div>
                </div>

                <div className="mb-3">
                  <span className="text-3xl font-black">{tier.price}</span>
                  <span className="text-gray-400 text-sm">{tier.period}</span>
                </div>

                <p className="text-gray-400 text-sm mb-5">{tier.description}</p>

                <div className="space-y-3 mb-6 flex-1">
                  {tier.features.map((feature) => {
                    const FeatureIcon = feature.icon;
                    return (
                      <div key={feature.text} className="flex items-center gap-3">
                        <FeatureIcon size={16} className="text-accent shrink-0" />
                        <span className="text-sm">{feature.text}</span>
                      </div>
                    );
                  })}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-colors ${
                    tier.popular
                      ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25"
                      : "glass text-white hover:bg-dark-lighter"
                  }`}
                >
                  {tier.cta}
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <h3 className="text-2xl font-black text-center mb-6">
            Frequently Asked Questions
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="glass rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-semibold text-sm pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={18} className="text-gray-400 shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 text-sm text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
}
