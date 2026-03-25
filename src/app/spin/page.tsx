"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/BottomNav";
import { Logo } from "@/components/Logo";
import { spinPrizes, userProfile } from "@/data/mock";
import type { SpinPrize } from "@/data/mock";
import confetti from "canvas-confetti";
import {
  Coins,
  Gift,
  Ticket,
  Trophy,
  X,
  Clock,
  ShoppingCart,
  Sparkles,
  HelpCircle,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const NUM_SEGMENTS = spinPrizes.length; // 8
const SEGMENT_DEG = 360 / NUM_SEGMENTS; // 45
const SPIN_COST = 50;
const SPIN_DURATION_MS = 4800;

// Big wins that trigger confetti
const BIG_WIN_TYPES = new Set<SpinPrize["type"]>(["grand", "mystery"]);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build conic-gradient string from the prizes array. */
function buildConicGradient(): string {
  const stops = spinPrizes.map((prize, i) => {
    const start = i * SEGMENT_DEG;
    const end = (i + 1) * SEGMENT_DEG;
    return `${prize.color} ${start}deg ${end}deg`;
  });
  return `conic-gradient(from 0deg, ${stops.join(", ")})`;
}

/** Icon component for a prize type. */
function PrizeIcon({
  type,
  size = 18,
  className = "",
}: {
  type: SpinPrize["type"];
  size?: number;
  className?: string;
}) {
  switch (type) {
    case "coins":
      return <Coins size={size} className={className} />;
    case "mystery":
      return <HelpCircle size={size} className={className} />;
    case "voucher":
      return <Ticket size={size} className={className} />;
    case "grand":
      return <Trophy size={size} className={className} />;
    case "none":
    default:
      return <X size={size} className={className} />;
  }
}

/** Human-friendly time label. */
function timeAgo(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 10) return "Just now";
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

/** Fire confetti burst. */
function fireBigWinConfetti() {
  const duration = 3000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ["#7C3AED", "#10B981", "#F59E0B", "#EC4899", "#EF4444"],
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ["#7C3AED", "#10B981", "#F59E0B", "#EC4899", "#EF4444"],
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}

function fireCoinsConfetti() {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#F59E0B", "#FCD34D", "#FBBF24"],
  });
}

// ---------------------------------------------------------------------------
// History entry type
// ---------------------------------------------------------------------------

interface HistoryEntry {
  prize: SpinPrize;
  timestamp: number;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function SpinPage() {
  const router = useRouter();

  // State
  const [coins, setCoins] = useState(userProfile.coins);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasFreeSpin, setHasFreeSpin] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<SpinPrize | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // Cumulative rotation tracker (so we always spin forward)
  const cumulativeRotation = useRef(0);

  // Re-render timer for "time ago" labels
  const [, setTick] = useState(0);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  if (!tickRef.current) {
    tickRef.current = setInterval(() => setTick((t) => t + 1), 15000);
  }

  // Memoize the conic gradient
  const conicGradient = useMemo(() => buildConicGradient(), []);

  // ---- Spin logic ----
  const handleSpin = useCallback(() => {
    if (isSpinning) return;

    // Cost check
    if (!hasFreeSpin && coins < SPIN_COST) return;

    // Deduct cost
    if (!hasFreeSpin) {
      setCoins((c) => c - SPIN_COST);
    } else {
      setHasFreeSpin(false);
    }

    setIsSpinning(true);
    setWonPrize(null);
    setShowResult(false);

    // Pick random winning segment
    const winIndex = Math.floor(Math.random() * NUM_SEGMENTS);
    const prize = spinPrizes[winIndex];

    // Calculate target rotation:
    // The pointer is at the top (0 degrees). The wheel rotates clockwise.
    // Segment i occupies [i*45, (i+1)*45] in the conic gradient.
    // For the pointer at top to land on segment i, the wheel rotation (mod 360)
    // should place that segment at the 0-degree mark.
    // We want: (rotation mod 360) = 360 - (winIndex * SEGMENT_DEG + SEGMENT_DEG / 2)
    // Plus additional full rotations for dramatic effect.
    const segmentCenter = winIndex * SEGMENT_DEG + SEGMENT_DEG / 2;
    const targetAngleOnWheel = 360 - segmentCenter;

    // Add 5-8 full rotations for visual drama
    const extraRotations = (5 + Math.floor(Math.random() * 4)) * 360;
    const currentModulo = cumulativeRotation.current % 360;
    let delta = targetAngleOnWheel - currentModulo;
    if (delta < 0) delta += 360;
    const totalSpin = extraRotations + delta;

    const newRotation = cumulativeRotation.current + totalSpin;
    cumulativeRotation.current = newRotation;
    setRotation(newRotation);

    // After spin completes, show result
    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(prize);

      // Credit winnings
      if (prize.type === "coins" && prize.value > 0) {
        setCoins((c) => c + prize.value);
      }

      // Add to history
      setHistory((prev) => [{ prize, timestamp: Date.now() }, ...prev]);

      // Confetti for big wins
      if (BIG_WIN_TYPES.has(prize.type)) {
        fireBigWinConfetti();
      } else if (prize.type === "coins" && prize.value >= 500) {
        fireBigWinConfetti();
      } else if (prize.type === "coins" && prize.value > 0) {
        fireCoinsConfetti();
      } else if (prize.type === "voucher") {
        fireCoinsConfetti();
      }

      // Show modal after a tiny beat
      setTimeout(() => setShowResult(true), 300);
    }, SPIN_DURATION_MS + 200);
  }, [isSpinning, hasFreeSpin, coins]);

  // Whether user can afford a spin
  const canSpin = hasFreeSpin || coins >= SPIN_COST;

  // ---- Render ----
  return (
    <div className="min-h-screen bg-dark text-white relative overflow-x-hidden pb-32">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 w-64 h-64 bg-accent/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      {/* ====== Top Bar ====== */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 flex items-center justify-between px-4 pt-4 pb-2 max-w-lg mx-auto"
      >
        <div className="flex items-center gap-2">
          <Logo size={28} />
          <span className="font-bold text-lg">
            <span className="text-primary-light">Spin</span>
            <span className="text-gray-400 font-normal ml-1 text-sm">& Win</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Coin balance */}
          <div className="glass rounded-full px-3 py-1.5 flex items-center gap-1.5">
            <span className="text-sm">🪙</span>
            <span className="text-sm font-bold text-yellow-400">{coins}</span>
          </div>
          {/* Buy Coins */}
          <button
            onClick={() => router.push("/shop")}
            className="bg-accent/20 hover:bg-accent/30 text-accent rounded-full px-3 py-1.5 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ShoppingCart size={12} />
            Buy
          </button>
        </div>
      </motion.header>

      {/* ====== Main Content ====== */}
      <main className="relative z-10 flex flex-col items-center px-4 max-w-lg mx-auto">
        {/* Free spin badge */}
        <AnimatePresence>
          {hasFreeSpin && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mb-3 mt-1"
            >
              <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-full px-4 py-1.5 text-sm font-semibold text-yellow-400">
                <Sparkles size={14} />
                1 Free Daily Spin!
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ====== Wheel Assembly ====== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.2 }}
          className="relative mt-2 mb-6"
        >
          {/* Pointer / Arrow indicator at top */}
          <div className="absolute top-[-14px] left-1/2 -translate-x-1/2 z-30">
            <div
              className="w-0 h-0"
              style={{
                borderLeft: "14px solid transparent",
                borderRight: "14px solid transparent",
                borderTop: "24px solid #7C3AED",
                filter: "drop-shadow(0 4px 12px rgba(124, 58, 237, 0.6))",
              }}
            />
          </div>

          {/* Outer glow ring */}
          <div
            className="absolute inset-[-8px] rounded-full z-0"
            style={{
              background:
                "conic-gradient(from 0deg, #7C3AED, #10B981, #F59E0B, #EC4899, #3B82F6, #EF4444, #8B5CF6, #7C3AED)",
              opacity: 0.3,
              filter: "blur(12px)",
            }}
          />

          {/* Decorative outer ring */}
          <div
            className="relative rounded-full p-[4px] z-10"
            style={{
              background:
                "linear-gradient(135deg, rgba(124, 58, 237, 0.8), rgba(16, 185, 129, 0.8), rgba(124, 58, 237, 0.8))",
              boxShadow:
                "0 0 30px rgba(124, 58, 237, 0.3), inset 0 0 30px rgba(124, 58, 237, 0.1)",
            }}
          >
            {/* Inner ring */}
            <div className="rounded-full p-[3px] bg-dark">
              {/* Wheel container */}
              <div
                className="relative rounded-full overflow-hidden"
                style={{ width: 300, height: 300 }}
              >
                {/* Colored segments (conic-gradient) */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: conicGradient,
                    transform: `rotate(${rotation}deg)`,
                    transition: isSpinning
                      ? `transform ${SPIN_DURATION_MS}ms cubic-bezier(0.17, 0.67, 0.12, 0.99)`
                      : "none",
                  }}
                >
                  {/* Segment divider lines */}
                  {spinPrizes.map((_, i) => (
                    <div
                      key={`line-${i}`}
                      className="absolute top-0 left-1/2 h-1/2 origin-bottom"
                      style={{
                        transform: `rotate(${i * SEGMENT_DEG}deg) translateX(-0.5px)`,
                        width: "1px",
                        background:
                          "linear-gradient(to top, transparent 20%, rgba(0,0,0,0.3) 100%)",
                      }}
                    />
                  ))}

                  {/* Prize labels */}
                  {spinPrizes.map((prize, i) => {
                    const angle = i * SEGMENT_DEG + SEGMENT_DEG / 2;
                    return (
                      <div
                        key={`label-${i}`}
                        className="absolute top-0 left-0 w-full h-full"
                        style={{
                          transform: `rotate(${angle}deg)`,
                        }}
                      >
                        <div
                          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
                          style={{
                            top: "15%",
                          }}
                        >
                          <span
                            className="text-[10px] font-bold leading-tight text-center whitespace-nowrap"
                            style={{
                              color: prize.textColor,
                              textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                            }}
                          >
                            {prize.label.split(" ").map((word, wi) => (
                              <span key={wi} className="block">
                                {word}
                              </span>
                            ))}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {/* Inner circle decorative dots at segment boundaries */}
                  {spinPrizes.map((_, i) => {
                    const angle = (i * SEGMENT_DEG * Math.PI) / 180;
                    const r = 130;
                    const cx = 150 + r * Math.sin(angle);
                    const cy = 150 - r * Math.cos(angle);
                    return (
                      <div
                        key={`dot-${i}`}
                        className="absolute w-2 h-2 rounded-full bg-white/30"
                        style={{
                          left: cx - 4,
                          top: cy - 4,
                        }}
                      />
                    );
                  })}
                </div>

                {/* Center overlay / SPIN button */}
                <button
                  onClick={handleSpin}
                  disabled={isSpinning || !canSpin}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[80px] h-[80px] rounded-full flex flex-col items-center justify-center cursor-pointer disabled:cursor-not-allowed transition-transform active:scale-95"
                  style={{
                    background: isSpinning
                      ? "linear-gradient(135deg, #4B5563, #374151)"
                      : canSpin
                      ? "linear-gradient(135deg, #7C3AED, #6D28D9)"
                      : "linear-gradient(135deg, #374151, #1F2937)",
                    boxShadow: isSpinning
                      ? "0 4px 20px rgba(0,0,0,0.4)"
                      : canSpin
                      ? "0 4px 20px rgba(124, 58, 237, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)"
                      : "0 4px 20px rgba(0,0,0,0.4)",
                    border: "3px solid rgba(255,255,255,0.15)",
                  }}
                >
                  {isSpinning ? (
                    <span className="text-sm font-bold text-gray-300 animate-pulse">
                      ...
                    </span>
                  ) : hasFreeSpin ? (
                    <>
                      <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider">
                        Free
                      </span>
                      <span className="text-lg font-black text-white leading-none">
                        SPIN
                      </span>
                    </>
                  ) : canSpin ? (
                    <>
                      <span className="text-[13px] font-black text-white leading-none">
                        SPIN
                      </span>
                      <span className="flex items-center gap-0.5 mt-0.5">
                        <span className="text-[10px]">🪙</span>
                        <span className="text-[11px] font-bold text-yellow-400">
                          {SPIN_COST}
                        </span>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-[11px] font-bold text-gray-400 leading-tight text-center">
                        Need
                      </span>
                      <span className="flex items-center gap-0.5">
                        <span className="text-[10px]">🪙</span>
                        <span className="text-[11px] font-bold text-gray-400">
                          {SPIN_COST}
                        </span>
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Outer decorative dots */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 15 * Math.PI) / 180;
            const r = 162;
            return (
              <div
                key={`outer-dot-${i}`}
                className="absolute rounded-full"
                style={{
                  width: i % 3 === 0 ? 6 : 4,
                  height: i % 3 === 0 ? 6 : 4,
                  background:
                    i % 3 === 0
                      ? "rgba(124, 58, 237, 0.8)"
                      : "rgba(255, 255, 255, 0.15)",
                  left: 150 + 4 + r * Math.sin(angle) - (i % 3 === 0 ? 3 : 2),
                  top: 150 + 4 + 3 - r * Math.cos(angle) - (i % 3 === 0 ? 3 : 2),
                }}
              />
            );
          })}
        </motion.div>

        {/* Spin cost info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-gray-500 mb-6 text-center"
        >
          {hasFreeSpin
            ? "Your daily free spin is ready!"
            : `Each spin costs ${SPIN_COST} coins`}
        </motion.p>

        {/* ====== Prize History ====== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full"
        >
          <div className="flex items-center gap-2 mb-3">
            <Clock size={14} className="text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-300">
              Prize History
            </h3>
            {history.length > 0 && (
              <span className="text-xs text-gray-500 ml-auto">
                {history.length} spin{history.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {history.length === 0 ? (
            <div className="glass rounded-2xl p-6 text-center">
              <Gift size={28} className="text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-500">
                No spins yet. Try your luck!
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {history.map((entry, i) => (
                <motion.div
                  key={`${entry.timestamp}-${i}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i === 0 ? 0.1 : 0 }}
                  className="glass rounded-xl px-4 py-3 flex items-center gap-3"
                >
                  {/* Icon */}
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: `${entry.prize.color}25`,
                      border: `1px solid ${entry.prize.color}40`,
                    }}
                  >
                    <PrizeIcon
                      type={entry.prize.type}
                      size={16}
                      className="text-white"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                      {entry.prize.label}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      {entry.prize.type === "coins"
                        ? `+${entry.prize.value} coins`
                        : entry.prize.type === "none"
                        ? "No prize"
                        : entry.prize.type === "mystery"
                        ? "Tap to reveal"
                        : entry.prize.type === "voucher"
                        ? "Check wallet"
                        : "Check wallet"}
                    </p>
                  </div>

                  {/* Time */}
                  <span className="text-[11px] text-gray-500 shrink-0">
                    {timeAgo(entry.timestamp)}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>

      {/* ====== Win Result Modal ====== */}
      <AnimatePresence>
        {showResult && wonPrize && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            onClick={() => setShowResult(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal card */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="relative glass-strong rounded-3xl p-6 w-full max-w-xs text-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setShowResult(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Glow behind icon */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{ background: wonPrize.color }}
              />

              {/* Prize icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 15,
                  delay: 0.1,
                }}
                className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center relative"
                style={{
                  background: `linear-gradient(135deg, ${wonPrize.color}, ${wonPrize.color}bb)`,
                  boxShadow: `0 8px 30px ${wonPrize.color}50`,
                }}
              >
                <PrizeIcon type={wonPrize.type} size={32} className="text-white" />
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-black mb-1"
                style={{ color: wonPrize.type === "none" ? "#94a3b8" : wonPrize.color }}
              >
                {wonPrize.type === "none" ? "Better Luck!" : "You Won!"}
              </motion.h2>

              {/* Prize name */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg font-bold text-white mb-2"
              >
                {wonPrize.label}
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm text-gray-400 mb-5"
              >
                {wonPrize.type === "coins"
                  ? `${wonPrize.value} coins have been added to your balance!`
                  : wonPrize.type === "mystery"
                  ? "A mystery reward awaits you! Check your wallet."
                  : wonPrize.type === "voucher"
                  ? "A free voucher has been added to your wallet!"
                  : wonPrize.type === "grand"
                  ? "Incredible! The grand prize is yours! Check your wallet."
                  : "Don't worry, spin again for another chance!"}
              </motion.p>

              {/* Action button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowResult(false)}
                className="w-full py-3 rounded-2xl font-bold text-white text-sm transition-opacity cursor-pointer"
                style={{
                  background:
                    wonPrize.type === "none"
                      ? "linear-gradient(135deg, #4B5563, #374151)"
                      : `linear-gradient(135deg, ${wonPrize.color}, ${wonPrize.color}cc)`,
                  boxShadow:
                    wonPrize.type !== "none"
                      ? `0 4px 20px ${wonPrize.color}40`
                      : undefined,
                }}
              >
                {wonPrize.type === "none" ? "Try Again" : "Awesome!"}
              </motion.button>

              {/* Coin balance update */}
              {wonPrize.type === "coins" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-3 text-xs text-gray-500"
                >
                  Balance: 🪙{" "}
                  <span className="text-yellow-400 font-bold">{coins}</span>{" "}
                  coins
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====== Bottom Nav ====== */}
      <BottomNav />
    </div>
  );
}
