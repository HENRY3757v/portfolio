"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { soundFX } from "@/utils/soundEffects";
import { Sparkles, Shield } from "lucide-react";

export type PerformanceTier = "high" | "mid" | "low";

interface SamuraiInteractiveStageProps {
  onSlashTriggered?: () => void;
  className?: string;
  activeIdentityColor?: string;
}

type AnimationState = "idle" | "reach" | "grip" | "draw" | "slash" | "sheathe";

export default function SamuraiInteractiveStage({
  onSlashTriggered,
  className = "",
  activeIdentityColor = "#ff2a6d",
}: SamuraiInteractiveStageProps) {
  const [animState, setAnimState] = useState<AnimationState>("idle");
  const [performanceTier, setPerformanceTier] = useState<PerformanceTier>("high");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [slashCoords, setSlashCoords] = useState<{ x: number; y: number } | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const isAnimatingRef = useRef(false);
  const lastTapTimeRef = useRef(0);

  // 1. Detect Device Capability & Performance Tier (Adaptive Performance System)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    setIsTouchDevice(isTouch);

    const concurrency = navigator.hardwareConcurrency || 4;
    const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 4;

    if (prefersReducedMotion || concurrency <= 2 || memory <= 2) {
      setPerformanceTier("low");
    } else if (concurrency <= 4 || memory <= 4 || window.innerWidth < 480) {
      setPerformanceTier("mid");
    } else {
      setPerformanceTier("high");
    }
  }, []);

  // 2. Game-Quality Sword Drawing Sequence (Iaijutsu)
  const triggerSwordDraw = useCallback(
    (clientX?: number, clientY?: number) => {
      // Prevent repeated triggers during animation
      const now = Date.now();
      if (isAnimatingRef.current || now - lastTapTimeRef.current < 1900) {
        return;
      }
      isAnimatingRef.current = true;
      lastTapTimeRef.current = now;

      // Coordinate calculation for slash effect & sakura gust
      let clickX = clientX;
      let clickY = clientY;
      if (containerRef.current && (!clickX || !clickY)) {
        const rect = containerRef.current.getBoundingClientRect();
        clickX = rect.left + rect.width * 0.75;
        clickY = rect.top + rect.height * 0.55;
      }

      setSlashCoords({ x: clickX || 300, y: clickY || 300 });

      // Mobile Haptic Feedback Phase 1 (Initial Hand Placement)
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        try {
          navigator.vibrate(15);
        } catch {}
      }

      // PHASE 1: REACH - Arm moves towards katana hilt at waist
      setAnimState("reach");

      // PHASE 2: GRIP (200ms) - Hand wraps around tsuka handle
      setTimeout(() => {
        setAnimState("grip");
      }, 200);

      // PHASE 3: DRAW (380ms) - Lightning draw of the katana
      setTimeout(() => {
        setAnimState("draw");
        soundFX.playSwordDraw();

        // Mobile Haptic Feedback Phase 2 (Steel Draw Pulse)
        if (typeof navigator !== "undefined" && navigator.vibrate) {
          try {
            navigator.vibrate([25, 20, 35]);
          } catch {}
        }
      }, 380);

      // PHASE 4: SLASH & SAKURA WIND GUST (620ms) - Silver-pink cutting light
      setTimeout(() => {
        setAnimState("slash");
        soundFX.playSlash();

        // Dispatch wind gust to global falling sakura canvas
        window.dispatchEvent(
          new CustomEvent("sakura-gust", {
            detail: { x: clickX, y: clickY, force: 2.2 },
          })
        );

        if (onSlashTriggered) {
          onSlashTriggered();
        }
      }, 620);

      // PHASE 5: SHEATHE (1100ms) - Smooth, deliberate return to saya scabbard
      setTimeout(() => {
        setAnimState("sheathe");
        soundFX.playSheathe();
      }, 1100);

      // PHASE 6: RETURN TO IDLE (1750ms) - Restores stable breathing posture
      setTimeout(() => {
        setAnimState("idle");
        isAnimatingRef.current = false;
        setSlashCoords(null);
      }, 1750);
    },
    [onSlashTriggered]
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[560px] aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-[#d4af37]/20 select-none ${className}`}
      style={{
        backgroundColor: "#16120E",
      }}
    >
      {/* 1. ANTIQUE PARCHMENT BACKGROUND & SCENE ART (Parchment, Pagoda, Red Sun & Blooming Sakura Tree) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/samurai-hires.jpg"
          alt="Suvradip Dey - Samurai Experience Artwork"
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
          onLoad={() => setIsLoaded(true)}
          className={`object-cover object-center transition-all duration-700 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        />
        {/* Antique Japanese Parchment Texture Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0a07] via-transparent to-[#0e0a07]/50 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-radial-vignette opacity-40 pointer-events-none" />
      </div>

      {/* 2. SAKURA BLOSSOMS SWAY OVERLAY (Top-Left Arching Tree Glow) */}
      <div
        className="absolute top-0 left-0 w-3/5 h-2/5 pointer-events-none opacity-30 mix-blend-screen transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle at 15% 15%, rgba(255, 183, 197, 0.45) 0%, transparent 65%)",
        }}
      />

      {/* 3. RED RISING SUN SUBTLE RADIANT AURA (Upper Right) */}
      <div
        className={`absolute top-4 right-8 w-28 h-28 sm:w-36 sm:h-36 rounded-full pointer-events-none mix-blend-screen transition-all duration-1000 ${
          animState === "slash" ? "scale-125 opacity-60" : "scale-100 opacity-20"
        }`}
        style={{
          background: "radial-gradient(circle, rgba(239, 68, 68, 0.6) 0%, rgba(220, 38, 38, 0.2) 60%, transparent 80%)",
        }}
      />

      {/* 4. DYNAMIC KATANA DRAWING & SLASH EFFECTS OVERLAY */}
      {/* A. Silver-Pink Katana Blade Gleam during DRAW and SLASH */}
      {(animState === "draw" || animState === "slash") && (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          {/* Gleaming Japanese Steel Blade Arc */}
          <svg className="w-full h-full" viewBox="0 0 560 350" fill="none">
            <defs>
              <linearGradient id="katanaBladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#ffd1dc" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#ffb7c5" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
              <filter id="bladeGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Slashed Blade Arc Trail */}
            <path
              d="M 440 260 Q 380 180, 240 140 T 80 120"
              stroke="url(#katanaBladeGrad)"
              strokeWidth={animState === "slash" ? "5" : "2.5"}
              strokeLinecap="round"
              filter="url(#bladeGlow)"
              className="animate-slash-arc"
            />

            {/* Radiant Sparks Burst along blade cut */}
            <circle cx="360" cy="180" r="4" fill="#ffffff" className="animate-ping" />
            <circle cx="280" cy="150" r="3" fill="#ffb7c5" className="animate-ping" />
          </svg>

          {/* Flash Flare */}
          <div
            className="absolute w-24 h-24 rounded-full bg-white/80 blur-xl animate-blade-flash pointer-events-none"
            style={{
              top: "42%",
              right: "32%",
            }}
          />
        </div>
      )}

      {/* B. Resheath Spark (Habaki meeting Tsuba) */}
      {animState === "sheathe" && (
        <div
          className="absolute z-20 w-4 h-4 rounded-full bg-[#ffb7c5] shadow-[0_0_15px_#ffffff] animate-ping pointer-events-none"
          style={{
            top: "66%",
            right: "26%",
          }}
        />
      )}

      {/* 5. INTERACTIVE TOUCH / CLICK HITBOX (Does NOT hijack page scrolling) */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          triggerSwordDraw(e.clientX, e.clientY);
        }}
        onTouchEnd={(e) => {
          // Touch devices: triggers sword draw cleanly on tap without scrolling hijack
          if (e.changedTouches && e.changedTouches[0]) {
            const touch = e.changedTouches[0];
            triggerSwordDraw(touch.clientX, touch.clientY);
          }
        }}
        aria-label="Draw Samurai Katana Sword"
        className="absolute inset-0 z-30 w-full h-full cursor-pointer focus:outline-none flex flex-col justify-between p-3 sm:p-4 text-left group"
      >
        {/* Top Japanese Kanji Status Badge */}
        <div className="flex items-center justify-between w-full pointer-events-none">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#ffb7c5]/30 shadow-lg text-[10px] font-mono text-[#ffb7c5]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a6d] animate-pulse" />
            <span>
              {animState === "idle" && "侍 • SAMURAI STANCE"}
              {animState === "reach" && "構え • REACHING FOR BLADE"}
              {animState === "grip" && "把持 • GRIPPING TSUKA"}
              {animState === "draw" && "抜刀 • IAIJUTSU DRAW"}
              {animState === "slash" && "一閃 • SAKURA SLASH"}
              {animState === "sheathe" && "納刀 • RESHEATHING"}
            </span>
          </div>

          <div className="text-[10px] font-mono text-white/50 px-2 py-0.5 rounded bg-black/40 border border-white/10 hidden sm:block">
            {performanceTier.toUpperCase()} FPS
          </div>
        </div>

        {/* Bottom Touch Prompt Pill (Optimized for Mobile & Desktop) */}
        <div className="self-center sm:self-end flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-[#ffb7c5]/40 text-[11px] font-mono text-white shadow-xl group-hover:border-[#ffb7c5] group-hover:scale-105 active:scale-95 transition-all">
          <Sparkles className="w-3.5 h-3.5 text-[#ffb7c5] animate-spin" />
          <span className="font-semibold tracking-wider">
            {isTouchDevice ? "TAP SAMURAI TO DRAW BLADE ⚔️" : "CLICK TO DRAW KATANA ⚔️"}
          </span>
        </div>
      </button>

      {/* Subtle Loading Fallback */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#16120E] flex items-center justify-center text-[#ffb7c5] text-xs font-mono animate-pulse">
          INITIALIZING SAMURAI EXPERIENCE...
        </div>
      )}
    </div>
  );
}
