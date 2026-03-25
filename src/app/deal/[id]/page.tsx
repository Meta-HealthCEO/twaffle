"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import { deals, categoryColors } from "@/data/mock";
import type { Category } from "@/data/mock";
import { BottomNav } from "@/components/BottomNav";
import {
  ArrowLeft,
  Star,
  MapPin,
  CheckCircle,
  Clock,
  Bed,
  Bath,
  Maximize,
  BadgeCheck,
  Share2,
  Car,
  Waves,
  ChevronLeft,
  ChevronRight,
  Shield,
  GraduationCap,
  ShoppingBag,
  Train,
  Phone,
  MessageCircle,
  Check,
  Zap,
  Home,
  Eye,
  X,
  FileText,
  Calendar,
  Loader2,
  PartyPopper,
  User,
  Mail,
  Briefcase,
  DollarSign,
} from "lucide-react";

const virtualTourRooms = [
  { label: "Kitchen", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=500&fit=crop", hotspot: "Marble countertops with integrated appliances" },
  { label: "Lounge", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=500&fit=crop", hotspot: "Open-plan living with natural light" },
  { label: "Bedroom", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=500&fit=crop", hotspot: "Spacious master with built-in wardrobes" },
  { label: "Bathroom", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=500&fit=crop", hotspot: "Modern finishes with double vanity" },
  { label: "Garden", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=500&fit=crop", hotspot: "Private garden with covered patio" },
];

function generateQrGrid(id: string): boolean[][] {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) | 0;
  }
  const grid: boolean[][] = [];
  for (let row = 0; row < 8; row++) {
    grid[row] = [];
    for (let col = 0; col < 8; col++) {
      const seed = hash ^ (row * 13 + col * 7);
      grid[row][col] = (seed & (1 << ((row + col) % 16))) !== 0;
    }
  }
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      grid[r][c] =
        r === 0 || r === 2 || c === 0 || c === 2 || (r === 1 && c === 1);
      grid[r][5 + c] =
        r === 0 || r === 2 || c === 0 || c === 2 || (r === 1 && c === 1);
      grid[5 + r][c] =
        r === 0 || r === 2 || c === 0 || c === 2 || (r === 1 && c === 1);
    }
  }
  return grid;
}

function parsePriceToNumber(priceStr: string | undefined): number {
  if (!priceStr) return 0;
  return Number(priceStr.replace(/[^0-9]/g, ""));
}

function formatCurrency(amount: number): string {
  return `R${amount.toLocaleString("en-ZA", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

function calculateMonthlyPayment(
  principal: number,
  annualRatePercent: number,
  years: number
): number {
  const monthlyRate = annualRatePercent / 100 / 12;
  const numPayments = years * 12;
  if (monthlyRate === 0) return principal / numPayments;
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)
  );
}

export default function DealDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const deal = deals.find((d) => d.id === id);

  const [claimed, setClaimed] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });
  const [isUrgent, setIsUrgent] = useState(false);
  const [viewingForm, setViewingForm] = useState({
    name: "Shaun Schoeman",
    email: "shaun@example.com",
    phone: "+27 82 123 4567",
    date: "",
    time: "",
  });
  const [viewingSubmitted, setViewingSubmitted] = useState(false);

  // Virtual tour state
  const [tourIndex, setTourIndex] = useState(0);
  const [tourFullscreen, setTourFullscreen] = useState(false);
  const [tourTouchStart, setTourTouchStart] = useState<number | null>(null);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  // Bond application state
  const [showBondApp, setShowBondApp] = useState(false);
  const [bondForm, setBondForm] = useState({
    fullName: "Shaun Schoeman",
    idNumber: "9001015009087",
    email: "shaun@example.com",
    phone: "+27 82 123 4567",
    monthlyIncome: "R65,000",
    employment: "Software Developer at Meta-Health",
  });
  const [bondDepositPercent, setBondDepositPercent] = useState(10);
  const [bondSubmitting, setBondSubmitting] = useState(false);
  const [bondApproved, setBondApproved] = useState(false);
  const [bondRefNumber, setBondRefNumber] = useState("");

  // Gallery state
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Bond calculator state
  const [depositPercent, setDepositPercent] = useState(10);
  const [interestRate, setInterestRate] = useState(11.75);
  const [loanTerm, setLoanTerm] = useState<20 | 30>(20);

  useEffect(() => {
    if (!deal) return;

    const calcCountdown = () => {
      const now = new Date().getTime();
      const expiry = new Date(deal.expiry).getTime();
      const diff = expiry - now;

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0 });
        setIsUrgent(true);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setCountdown({ days, hours, minutes });
      setIsUrgent(diff < 24 * 60 * 60 * 1000);
    };

    calcCountdown();
    const interval = setInterval(calcCountdown, 60000);
    return () => clearInterval(interval);
  }, [deal]);

  const galleryImages = deal?.images && deal.images.length > 1 ? deal.images : deal ? [deal.image] : [];

  const handleGalleryPrev = useCallback(() => {
    setGalleryIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  }, [galleryImages.length]);

  const handleGalleryNext = useCallback(() => {
    setGalleryIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  }, [galleryImages.length]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStart === null) return;
      const diff = touchStart - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) handleGalleryNext();
        else handleGalleryPrev();
      }
      setTouchStart(null);
    },
    [touchStart, handleGalleryNext, handleGalleryPrev]
  );

  // Bond calculator
  const monthlyPayment = useMemo(() => {
    if (!deal?.price) return 0;
    const totalPrice = parsePriceToNumber(deal.price);
    const depositAmount = totalPrice * (depositPercent / 100);
    const loanAmount = totalPrice - depositAmount;
    return calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
  }, [deal?.price, depositPercent, interestRate, loanTerm]);

  if (!deal) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">&#128269;</div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Deal Not Found
          </h1>
          <p className="text-gray-400 mb-6">
            This deal may have expired or been removed.
          </p>
          <button
            onClick={() => router.push("/map")}
            className="bg-gradient-to-r from-primary to-accent text-white font-bold py-3 px-6 rounded-2xl"
          >
            Back to Map
          </button>
        </motion.div>
      </div>
    );
  }

  const isRealEstate = deal.category === "Real Estate";
  const hasGallery = isRealEstate && deal.images && deal.images.length > 1;
  const catColor = categoryColors[deal.category as Category];
  const qrGrid = generateQrGrid(deal.id);

  const similarProperties = isRealEstate
    ? deals
        .filter((d) => d.category === "Real Estate" && d.id !== deal.id)
        .slice(0, 3)
    : [];

  const handleClaim = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.7 },
      colors: ["#7C3AED", "#10B981", "#F59E0B", "#EC4899"],
    });
    setClaimed(true);
  };

  const handleViewingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setViewingSubmitted(true);
  };

  const handleTourTouchStart = useCallback((e: React.TouchEvent) => {
    setTourTouchStart(e.touches[0].clientX);
  }, []);

  const handleTourTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (tourTouchStart === null) return;
      const diff = tourTouchStart - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) setTourIndex((p) => (p === virtualTourRooms.length - 1 ? 0 : p + 1));
        else setTourIndex((p) => (p === 0 ? virtualTourRooms.length - 1 : p - 1));
      }
      setTourTouchStart(null);
    },
    [tourTouchStart]
  );

  const handleBondSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBondSubmitting(true);
    setTimeout(() => {
      setBondSubmitting(false);
      setBondApproved(true);
      setBondRefNumber(`TW-2026-${Math.floor(10000 + Math.random() * 90000)}`);
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#7C3AED", "#10B981", "#F59E0B", "#EC4899", "#3B82F6"],
      });
    }, 2000);
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  const neighbourhoodItems = [
    {
      key: "safety" as const,
      label: "Safety",
      icon: Shield,
      color: "#10B981",
    },
    {
      key: "schools" as const,
      label: "Schools",
      icon: GraduationCap,
      color: "#3B82F6",
    },
    {
      key: "shopping" as const,
      label: "Shopping",
      icon: ShoppingBag,
      color: "#F59E0B",
    },
    {
      key: "transport" as const,
      label: "Transport",
      icon: Train,
      color: "#8B5CF6",
    },
  ];

  const whatsappPhone = deal.agent
    ? deal.agent.phone.replace(/[^0-9]/g, "")
    : "";

  return (
    <div className="min-h-screen bg-dark pb-24">
      {/* HERO IMAGE / GALLERY */}
      <div
        className="relative w-full h-80 overflow-hidden"
        onTouchStart={hasGallery ? handleTouchStart : undefined}
        onTouchEnd={hasGallery ? handleTouchEnd : undefined}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={galleryIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={galleryImages[galleryIndex]}
              alt={`${deal.businessName} - image ${galleryIndex + 1}`}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="absolute top-12 left-4 z-10 glass rounded-full p-2.5"
        >
          <ArrowLeft size={22} className="text-white" />
        </motion.button>

        {/* Share button */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-12 right-4 z-10 glass rounded-full p-2.5"
        >
          <Share2 size={22} className="text-white" />
        </motion.button>

        {/* Flash deal badge */}
        {deal.isFlash && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 300 }}
            className="absolute top-12 left-1/2 -translate-x-1/2 z-10 flash-badge"
          >
            <div className="flex items-center gap-1.5 bg-red-500 text-white text-sm font-black px-4 py-1.5 rounded-full shadow-lg shadow-red-500/40">
              <Zap size={14} className="fill-white" />
              FLASH
            </div>
          </motion.div>
        )}

        {/* Discount badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          className="absolute bottom-4 right-4 z-10 px-4 py-2 rounded-xl font-bold text-white text-lg shadow-lg"
          style={{ backgroundColor: catColor }}
        >
          {deal.discount}
        </motion.div>

        {/* Gallery navigation arrows */}
        {hasGallery && (
          <>
            <button
              onClick={handleGalleryPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 glass rounded-full p-2 opacity-80 hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft size={22} className="text-white" />
            </button>
            <button
              onClick={handleGalleryNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 glass rounded-full p-2 opacity-80 hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight size={22} className="text-white" />
            </button>
          </>
        )}

        {/* Gallery dot indicators */}
        {hasGallery && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setGalleryIndex(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === galleryIndex
                    ? "w-6 h-2 bg-white"
                    : "w-2 h-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="px-5 -mt-4 relative z-10 space-y-5">
        {/* BUSINESS INFO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-5"
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <h1 className="text-2xl font-bold text-white leading-tight">
              {deal.businessName}
            </h1>
            {deal.verified && (
              <span className="flex items-center gap-1 bg-blue-500/20 text-blue-400 text-xs font-semibold px-2.5 py-1 rounded-full shrink-0">
                <BadgeCheck size={14} />
                Verified
              </span>
            )}
          </div>

          {/* Star rating */}
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={18}
                className={
                  i < Math.round(deal.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-600"
                }
              />
            ))}
            <span className="text-gray-400 text-sm ml-1">{deal.rating}</span>
          </div>

          {/* Category tag */}
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                backgroundColor: `${catColor}20`,
                color: catColor,
              }}
            >
              {deal.category}
            </span>

            {/* Address */}
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <MapPin size={14} className="shrink-0" />
              <span>{deal.address}</span>
            </div>
          </div>
        </motion.div>

        {/* REAL ESTATE - PROMINENT PRICE */}
        {isRealEstate && deal.price && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl p-5 bg-gradient-to-r from-blue-600/20 via-purple-600/15 to-blue-600/20 border border-blue-500/30"
          >
            <p className="text-sm text-blue-300 font-medium mb-1">
              Asking Price
            </p>
            <p className="text-3xl font-black text-white tracking-tight">
              {deal.price}
            </p>
            {deal.sqm && (
              <p className="text-sm text-gray-400 mt-1">
                {formatCurrency(
                  Math.round(parsePriceToNumber(deal.price) / deal.sqm)
                )}
                /m&sup2;
              </p>
            )}
          </motion.div>
        )}

        {/* EXPIRY COUNTDOWN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`glass rounded-2xl p-5 ${
            isUrgent ? "border border-red-500/50" : ""
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <Clock
              size={18}
              className={isUrgent ? "text-red-400" : "text-gray-400"}
            />
            <span
              className={`text-sm font-medium ${
                isUrgent ? "text-red-400" : "text-gray-400"
              }`}
            >
              {isUrgent ? "Expiring Soon!" : "Deal Expires In"}
            </span>
          </div>
          <div className="flex items-center justify-center gap-3">
            {[
              { value: pad(countdown.days), label: "Days" },
              { value: pad(countdown.hours), label: "Hours" },
              { value: pad(countdown.minutes), label: "Mins" },
            ].map((unit, i) => (
              <div key={unit.label} className="flex items-center gap-3">
                <div className="text-center">
                  <div
                    className={`text-3xl font-black tabular-nums rounded-xl px-4 py-2 ${
                      isUrgent
                        ? "bg-red-500/20 text-red-400"
                        : "bg-white/5 text-white"
                    }`}
                  >
                    {unit.value}
                  </div>
                  <span className="text-xs text-gray-500 mt-1 block">
                    {unit.label}
                  </span>
                </div>
                {i < 2 && (
                  <span
                    className={`text-2xl font-bold ${
                      isUrgent ? "text-red-400" : "text-gray-600"
                    }`}
                  >
                    :
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* REAL ESTATE - ENHANCED PROPERTY STATS BAR */}
        {isRealEstate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="glass rounded-2xl p-5"
          >
            <h2 className="text-lg font-bold text-white mb-4">
              Property Details
            </h2>
            <div className="flex items-center justify-between gap-2">
              {[
                {
                  icon: Bed,
                  value: deal.bedrooms ?? 0,
                  label: "Beds",
                  color: "#3B82F6",
                },
                {
                  icon: Bath,
                  value: deal.bathrooms ?? 0,
                  label: "Baths",
                  color: "#06B6D4",
                },
                {
                  icon: Maximize,
                  value: `${deal.sqm ?? 0}`,
                  label: "m\u00B2",
                  color: "#8B5CF6",
                },
                {
                  icon: Car,
                  value: deal.garage ?? 0,
                  label: "Garage",
                  color: "#F59E0B",
                },
                {
                  icon: Waves,
                  value: deal.pool ? "\u2713" : "\u2013",
                  label: "Pool",
                  color: deal.pool ? "#10B981" : "#64748B",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex flex-col items-center text-center flex-1"
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-2"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <Icon size={20} style={{ color: item.color }} />
                    </div>
                    <span className="text-white font-bold text-sm">
                      {item.value}
                    </span>
                    <span className="text-gray-500 text-[11px]">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* DESCRIPTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-5"
        >
          <h2 className="text-lg font-bold text-white mb-2">Details</h2>
          <p className="text-gray-300 leading-relaxed">{deal.description}</p>
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
            <span>
              {deal.claimed}/{deal.maxClaims} claimed
            </span>
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                style={{
                  width: `${Math.min(
                    (deal.claimed / deal.maxClaims) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* REAL ESTATE - PROPERTY FEATURES */}
        {isRealEstate && deal.features && deal.features.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32 }}
            className="glass rounded-2xl p-5"
          >
            <h2 className="text-lg font-bold text-white mb-4">
              Property Features
            </h2>
            <div className="flex flex-wrap gap-2">
              {deal.features.map((feature) => (
                <span
                  key={feature}
                  className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-gray-300 text-sm font-medium px-3 py-1.5 rounded-full"
                >
                  <Check size={13} className="text-accent shrink-0" />
                  {feature}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* REAL ESTATE - VIRTUAL TOUR */}
        {isRealEstate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.33 }}
            className="glass rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Eye size={20} className="text-blue-400" />
                <h2 className="text-lg font-bold text-white">Virtual Tour</h2>
              </div>
              <button
                onClick={() => setTourFullscreen(true)}
                className="flex items-center gap-1.5 bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-semibold px-3 py-1.5 rounded-full"
              >
                <Eye size={13} />
                Start Virtual Tour
              </button>
            </div>

            {/* Room gallery */}
            <div
              className="relative w-full h-48 rounded-xl overflow-hidden mb-3"
              onTouchStart={handleTourTouchStart}
              onTouchEnd={handleTourTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={tourIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={virtualTourRooms[tourIndex].image}
                    alt={virtualTourRooms[tourIndex].label}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Room label */}
              <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                {virtualTourRooms[tourIndex].label}
              </div>

              {/* Hotspot dot */}
              <button
                onClick={() => setActiveHotspot(activeHotspot === tourIndex ? null : tourIndex)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-blue-500/80 border-2 border-white flex items-center justify-center animate-pulse cursor-pointer"
              >
                <span className="text-white text-xs font-bold">i</span>
              </button>

              {/* Hotspot tooltip */}
              <AnimatePresence>
                {activeHotspot === tourIndex && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-3 left-3 right-3 z-10 bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg"
                  >
                    {virtualTourRooms[tourIndex].hotspot}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Nav arrows */}
              <button
                onClick={() => setTourIndex((p) => (p === 0 ? virtualTourRooms.length - 1 : p - 1))}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 glass rounded-full p-1.5 opacity-80"
              >
                <ChevronLeft size={18} className="text-white" />
              </button>
              <button
                onClick={() => setTourIndex((p) => (p === virtualTourRooms.length - 1 ? 0 : p + 1))}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 glass rounded-full p-1.5 opacity-80"
              >
                <ChevronRight size={18} className="text-white" />
              </button>
            </div>

            {/* Room dot indicators */}
            <div className="flex items-center justify-center gap-2">
              {virtualTourRooms.map((room, i) => (
                <button
                  key={room.label}
                  onClick={() => { setTourIndex(i); setActiveHotspot(null); }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium transition-all ${
                    i === tourIndex
                      ? "bg-blue-500/30 text-blue-300 border border-blue-500/40"
                      : "bg-white/5 text-gray-400"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${i === tourIndex ? "bg-blue-400" : "bg-gray-500"}`} />
                  {room.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* VIRTUAL TOUR FULLSCREEN MODAL */}
        <AnimatePresence>
          {tourFullscreen && isRealEstate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black flex flex-col"
            >
              {/* Close button */}
              <button
                onClick={() => setTourFullscreen(false)}
                className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm rounded-full p-2"
              >
                <X size={24} className="text-white" />
              </button>

              {/* Room label */}
              <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-sm text-white text-sm font-bold px-4 py-2 rounded-full">
                {virtualTourRooms[tourIndex].label}
              </div>

              {/* Counter */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                {tourIndex + 1} / {virtualTourRooms.length}
              </div>

              {/* Image */}
              <div
                className="flex-1 relative"
                onTouchStart={handleTourTouchStart}
                onTouchEnd={handleTourTouchEnd}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tourIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={virtualTourRooms[tourIndex].image}
                      alt={virtualTourRooms[tourIndex].label}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Hotspot */}
                <button
                  onClick={() => setActiveHotspot(activeHotspot === tourIndex ? null : tourIndex)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-blue-500/80 border-2 border-white flex items-center justify-center animate-pulse"
                >
                  <span className="text-white text-sm font-bold">i</span>
                </button>

                <AnimatePresence>
                  {activeHotspot === tourIndex && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-20 left-4 right-4 z-10 bg-black/80 backdrop-blur-sm text-white text-sm px-4 py-3 rounded-xl text-center"
                    >
                      {virtualTourRooms[tourIndex].hotspot}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Nav arrows */}
                <button
                  onClick={() => setTourIndex((p) => (p === 0 ? virtualTourRooms.length - 1 : p - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm rounded-full p-3"
                >
                  <ChevronLeft size={24} className="text-white" />
                </button>
                <button
                  onClick={() => setTourIndex((p) => (p === virtualTourRooms.length - 1 ? 0 : p + 1))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm rounded-full p-3"
                >
                  <ChevronRight size={24} className="text-white" />
                </button>
              </div>

              {/* Bottom room selector */}
              <div className="bg-black/80 backdrop-blur-sm px-4 py-3 flex items-center justify-center gap-2 overflow-x-auto">
                {virtualTourRooms.map((room, i) => (
                  <button
                    key={room.label}
                    onClick={() => { setTourIndex(i); setActiveHotspot(null); }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                      i === tourIndex
                        ? "bg-blue-500 text-white"
                        : "bg-white/10 text-gray-300"
                    }`}
                  >
                    {room.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* REAL ESTATE - NEIGHBOURHOOD SCORE CARDS */}
        {isRealEstate && deal.neighbourhood && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34 }}
            className="glass rounded-2xl p-5"
          >
            <h2 className="text-lg font-bold text-white mb-4">
              Neighbourhood
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {neighbourhoodItems.map((item) => {
                const Icon = item.icon;
                const score = deal.neighbourhood![item.key];
                return (
                  <div key={item.key} className="bg-white/5 rounded-xl p-3.5">
                    <div className="flex items-center gap-2 mb-2.5">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${item.color}20` }}
                      >
                        <Icon size={16} style={{ color: item.color }} />
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-400 leading-none">
                          {item.label}
                        </p>
                        <p className="text-sm font-bold text-white">
                          {score}/10
                        </p>
                      </div>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${score * 10}%` }}
                        transition={{
                          delay: 0.5,
                          duration: 0.8,
                          ease: "easeOut",
                        }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* REAL ESTATE - AGENT CARD */}
        {isRealEstate && deal.agent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36 }}
            className="glass rounded-2xl p-5"
          >
            <h2 className="text-lg font-bold text-white mb-4">
              Listing Agent
            </h2>
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500/40 shrink-0">
                <Image
                  src={deal.agent.photo}
                  alt={deal.agent.name}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-base truncate">
                  {deal.agent.name}
                </p>
                <p className="text-gray-400 text-sm">{deal.agent.phone}</p>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <a
                href={`tel:${deal.agent.phone}`}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 font-semibold py-3 rounded-xl text-sm transition-colors hover:bg-blue-500/30"
              >
                <Phone size={16} />
                Call
              </a>
              <a
                href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
                  `Hi ${deal.agent.name}, I'm interested in the property: ${deal.businessName} - ${deal.price}. Could I get more information?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-semibold py-3 rounded-xl text-sm transition-colors hover:bg-emerald-500/30"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
            </div>
          </motion.div>
        )}

        {/* REAL ESTATE - BOND CALCULATOR */}
        {isRealEstate && deal.price && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38 }}
            className="glass rounded-2xl p-5"
          >
            <h2 className="text-lg font-bold text-white mb-5">
              Bond Calculator
            </h2>

            {/* Deposit slider */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-gray-400">Deposit</label>
                <span className="text-sm font-bold text-white">
                  {depositPercent}%{" "}
                  <span className="text-gray-500 font-normal">
                    (
                    {formatCurrency(
                      Math.round(
                        parsePriceToNumber(deal.price) *
                          (depositPercent / 100)
                      )
                    )}
                    )
                  </span>
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={50}
                step={1}
                value={depositPercent}
                onChange={(e) => setDepositPercent(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[10px] text-gray-600 mt-1">
                <span>0%</span>
                <span>50%</span>
              </div>
            </div>

            {/* Interest rate slider */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-gray-400">Interest Rate</label>
                <span className="text-sm font-bold text-white">
                  {interestRate.toFixed(2)}%
                </span>
              </div>
              <input
                type="range"
                min={800}
                max={1400}
                step={25}
                value={Math.round(interestRate * 100)}
                onChange={(e) =>
                  setInterestRate(Number(e.target.value) / 100)
                }
                className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[10px] text-gray-600 mt-1">
                <span>8%</span>
                <span>14%</span>
              </div>
            </div>

            {/* Loan term toggle */}
            <div className="mb-5">
              <label className="text-sm text-gray-400 block mb-2">
                Loan Term
              </label>
              <div className="flex bg-white/5 rounded-xl p-1">
                <button
                  onClick={() => setLoanTerm(20)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    loanTerm === 20
                      ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  20 Years
                </button>
                <button
                  onClick={() => setLoanTerm(30)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    loanTerm === 30
                      ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  30 Years
                </button>
              </div>
            </div>

            {/* Monthly payment result */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-400 mb-1">
                Estimated Monthly Payment
              </p>
              <p className="text-3xl font-black text-white">
                {formatCurrency(Math.round(monthlyPayment))}
              </p>
              <p className="text-xs text-gray-500 mt-1.5">
                Loan amount:{" "}
                {formatCurrency(
                  Math.round(
                    parsePriceToNumber(deal.price) *
                      (1 - depositPercent / 100)
                  )
                )}{" "}
                over {loanTerm} years
              </p>
            </div>
          </motion.div>
        )}

        {/* REAL ESTATE - SCHEDULE VIEWING FORM */}
        {isRealEstate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={20} className="text-blue-400" />
              <h2 className="text-lg font-bold text-white">Schedule a Viewing</h2>
            </div>
            {viewingSubmitted ? (
              <div className="text-center py-4">
                <CheckCircle size={48} className="text-accent mx-auto mb-3" />
                <p className="text-white font-semibold">Viewing Confirmed!</p>
                <p className="text-gray-400 text-sm mt-1">
                  {viewingForm.date && `${new Date(viewingForm.date).toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "long" })}`}
                  {viewingForm.time && ` at ${viewingForm.time}`}
                </p>
                <p className="text-gray-500 text-xs mt-2">
                  A confirmation has been sent to {viewingForm.email}
                </p>
              </div>
            ) : (
              <form onSubmit={handleViewingSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={viewingForm.name}
                  onChange={(e) =>
                    setViewingForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={viewingForm.email}
                  onChange={(e) =>
                    setViewingForm((f) => ({ ...f, email: e.target.value }))
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  value={viewingForm.phone}
                  onChange={(e) =>
                    setViewingForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
                <input
                  type="date"
                  required
                  value={viewingForm.date}
                  onChange={(e) =>
                    setViewingForm((f) => ({ ...f, date: e.target.value }))
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
                {/* Time slots */}
                <div>
                  <p className="text-sm text-gray-400 mb-2">Preferred Time</p>
                  <div className="grid grid-cols-3 gap-2">
                    {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"].map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setViewingForm((f) => ({ ...f, time }))}
                        className={`py-2 rounded-lg text-sm font-medium transition-all ${
                          viewingForm.time === time
                            ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                            : "bg-white/5 text-gray-400 border border-white/10 hover:border-blue-500/30"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3.5 rounded-xl text-base"
                >
                  Request Viewing
                </button>
              </form>
            )}
          </motion.div>
        )}

        {/* REAL ESTATE - APPLY FOR BOND */}
        {isRealEstate && deal.price && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.41 }}
            className="glass rounded-2xl p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <FileText size={20} className="text-emerald-400" />
              <h2 className="text-lg font-bold text-white">Apply for Bond</h2>
            </div>

            {!showBondApp && !bondApproved && (
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-4">
                  Get pre-approved for a home loan in minutes. No obligation.
                </p>
                <button
                  onClick={() => setShowBondApp(true)}
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold py-3.5 rounded-xl text-base"
                >
                  Start Application
                </button>
              </div>
            )}

            {showBondApp && !bondApproved && (
              <form onSubmit={handleBondSubmit} className="space-y-3">
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={bondForm.fullName}
                    onChange={(e) => setBondForm((f) => ({ ...f, fullName: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                </div>
                <div className="relative">
                  <Shield size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="ID Number"
                    required
                    value={bondForm.idNumber}
                    onChange={(e) => setBondForm((f) => ({ ...f, idNumber: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                </div>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={bondForm.email}
                    onChange={(e) => setBondForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                </div>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="tel"
                    placeholder="Phone"
                    required
                    value={bondForm.phone}
                    onChange={(e) => setBondForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                </div>
                <div className="relative">
                  <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Monthly Income"
                    required
                    value={bondForm.monthlyIncome}
                    onChange={(e) => setBondForm((f) => ({ ...f, monthlyIncome: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                </div>
                <div className="relative">
                  <Briefcase size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Employment"
                    required
                    value={bondForm.employment}
                    onChange={(e) => setBondForm((f) => ({ ...f, employment: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                </div>

                {/* Deposit slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-400">Deposit</label>
                    <span className="text-sm font-bold text-white">
                      {bondDepositPercent}%{" "}
                      <span className="text-gray-500 font-normal">
                        ({formatCurrency(Math.round(parsePriceToNumber(deal.price) * (bondDepositPercent / 100)))})
                      </span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={50}
                    step={1}
                    value={bondDepositPercent}
                    onChange={(e) => setBondDepositPercent(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex justify-between text-[10px] text-gray-600 mt-1">
                    <span>0%</span>
                    <span>50%</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={bondSubmitting}
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold py-3.5 rounded-xl text-base flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {bondSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Processing Application...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </form>
            )}

            {bondApproved && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <CheckCircle size={56} className="text-emerald-400 mx-auto mb-3" />
                </motion.div>
                <h3 className="text-xl font-black text-white mb-1">Application Approved!</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Your bond has been pre-approved. The contract will be sent to you shortly via email.
                </p>
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 mb-4">
                  <p className="text-xs text-gray-400 mb-1">Reference Number</p>
                  <p className="text-lg font-mono font-bold text-emerald-400">{bondRefNumber}</p>
                </div>
                <button
                  onClick={() => { setShowBondApp(false); setBondApproved(false); }}
                  className="bg-white/10 border border-white/10 text-white font-semibold py-2.5 px-6 rounded-xl text-sm"
                >
                  Back to Property
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* REAL ESTATE - SIMILAR PROPERTIES */}
        {isRealEstate && similarProperties.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42 }}
            className="glass rounded-2xl p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Home size={20} className="text-blue-400" />
              <h2 className="text-lg font-bold text-white">
                Similar Properties
              </h2>
            </div>
            <div className="space-y-3">
              {similarProperties.map((prop) => (
                <Link
                  key={prop.id}
                  href={`/deal/${prop.id}`}
                  className="flex gap-3 bg-white/5 rounded-xl p-3 hover:bg-white/10 transition-colors"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={prop.image}
                      alt={prop.businessName}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm truncate">
                      {prop.businessName}
                    </p>
                    {prop.price && (
                      <p className="text-blue-400 font-bold text-sm mt-0.5">
                        {prop.price}
                      </p>
                    )}
                    <div className="flex items-center gap-3 mt-1.5 text-gray-400 text-xs">
                      {prop.bedrooms && (
                        <span className="flex items-center gap-1">
                          <Bed size={12} /> {prop.bedrooms} beds
                        </span>
                      )}
                      {prop.bathrooms && (
                        <span className="flex items-center gap-1">
                          <Bath size={12} /> {prop.bathrooms} baths
                        </span>
                      )}
                      {prop.sqm && (
                        <span className="flex items-center gap-1">
                          <Maximize size={12} /> {prop.sqm} sqm
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* CLAIM BUTTON (non real estate) */}
        {!isRealEstate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {claimed ? (
              <div className="text-center py-4 glass rounded-2xl">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <CheckCircle
                    size={56}
                    className="text-accent mx-auto mb-3"
                  />
                </motion.div>
                <p className="text-white font-bold text-lg">Deal Claimed!</p>
                <p className="text-gray-400 text-sm mt-1">
                  +{deal.points} points earned
                </p>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleClaim}
                className="w-full bg-gradient-to-r from-primary to-accent text-white font-bold py-4 rounded-2xl text-lg shadow-lg shadow-primary/25"
              >
                Claim This Deal
              </motion.button>
            )}
          </motion.div>
        )}

        {/* QR CODE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl p-5 flex flex-col items-center"
        >
          <svg
            width={160}
            height={160}
            viewBox="0 0 160 160"
            className="mb-3"
          >
            <rect width={160} height={160} rx={12} fill="#1E293B" />
            {qrGrid.map((row, rIdx) =>
              row.map((filled, cIdx) =>
                filled ? (
                  <rect
                    key={`${rIdx}-${cIdx}`}
                    x={12 + cIdx * 17}
                    y={12 + rIdx * 17}
                    width={14}
                    height={14}
                    rx={2}
                    fill="white"
                  />
                ) : null
              )
            )}
          </svg>
          <p className="text-gray-400 text-sm text-center">
            Show this QR code to redeem
          </p>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
