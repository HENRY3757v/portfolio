"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Sliders,
  Send,
} from "lucide-react";
import SakuraPetalsCanvas from "@/components/sakura/SakuraPetalsCanvas";
import { soundFX } from "@/utils/soundEffects";

interface SignatureHeroProps {
  onEnterShowcase: (sectionId?: string) => void;
}

interface IdentityState {
  id: string;
  kanji: string;
  title: string;
  headline: string;
  subline: string;
  accent: string;
  accentGlow: string;
  badge: string;
  filterStyle: string;
  tags: string[];
}

const IDENTITIES: IdentityState[] = [
  {
    id: "developer",
    kanji: "開発者",
    title: "THE DEVELOPER",
    headline: "ENGINEERING SCALABLE SYSTEMS",
    subline: "Building resilient full-stack applications with React, Next.js, and Node.",
    accent: "#00f0ff",
    accentGlow: "rgba(0, 240, 255, 0.4)",
    badge: "STATE 01",
    filterStyle: "sepia(70%) hue-rotate(155deg) saturate(320%) contrast(120%)",
    tags: ["React 19", "Next.js", "TypeScript", "Tailwind"],
  },
  {
    id: "designer",
    kanji: "設計者",
    title: "THE DESIGNER",
    headline: "MAKING TECHNOLOGY FEEL HUMAN",
    subline: "Crafting modern editorial layouts, interaction physics, and design systems.",
    accent: "#c084fc",
    accentGlow: "rgba(192, 132, 252, 0.4)",
    badge: "STATE 02",
    filterStyle: "sepia(80%) hue-rotate(240deg) saturate(320%) contrast(120%)",
    tags: ["Figma", "UI/UX", "Micro-Interactions", "Motion"],
  },
  {
    id: "builder",
    kanji: "構築者",
    title: "THE BUILDER",
    headline: "TURNING LOGIC INTO SOLUTIONS",
    subline: "Python architecture, automated workflows, and high-performance databases.",
    accent: "#10b981",
    accentGlow: "rgba(16, 185, 129, 0.4)",
    badge: "STATE 03",
    filterStyle: "sepia(80%) hue-rotate(90deg) saturate(340%) contrast(125%)",
    tags: ["Python", "Flask", "PostgreSQL", "Supabase"],
  },
  {
    id: "explorer",
    kanji: "探求者",
    title: "THE EXPLORER",
    headline: "DISCOVERING HIDDEN PATTERNS",
    subline: "Computer Science & AI Engineering exploration at BBIT Kolkata.",
    accent: "#f59e0b",
    accentGlow: "rgba(245, 158, 11, 0.4)",
    badge: "STATE 04",
    filterStyle: "sepia(80%) hue-rotate(15deg) saturate(380%) contrast(120%)",
    tags: ["Machine Learning", "Data Analysis", "Pandas", "Algorithms"],
  },
  {
    id: "creator",
    kanji: "創造者",
    title: "THE CREATOR",
    headline: "WHERE CODE MEETS ARTISTRY",
    subline: "Creative technology, Japanese sword aesthetics, and cinematic web experiences.",
    accent: "#ff2a6d",
    accentGlow: "rgba(255, 42, 109, 0.4)",
    badge: "STATE 05",
    filterStyle: "sepia(70%) hue-rotate(310deg) saturate(380%) contrast(125%)",
    tags: ["WebGL", "Sakura Physics", "Canvas", "Creative Tech"],
  },
];

const QUICK_SERVICES = [
  { label: "Website Development", target: "services", kanji: "ウェブ" },
  { label: "Python Automation", target: "services", kanji: "自動化" },
  { label: "Backend Systems", target: "services", kanji: "基盤" },
  { label: "ShopEase Flagship", target: "projects", kanji: "旗艦" },
];

export default function SignatureHero({ onEnterShowcase }: SignatureHeroProps) {
  const [activeIdentityIndex, setActiveIdentityIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"samurai" | "portrait">("samurai");
  const [revealPercent, setRevealPercent] = useState(65); // 0 = Full B&W, 100 = Full Color
  const [isDragging, setIsDragging] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredMenuIndex, setHoveredMenuIndex] = useState<number | null>(null);
  const [animState, setAnimState] = useState<"idle" | "reach" | "grip" | "draw" | "slash" | "sheathe">("idle");

  const containerRef = useRef<HTMLDivElement | null>(null);
  const isAnimatingRef = useRef(false);
  const currentIdentity = IDENTITIES[activeIdentityIndex];

  // Mouse Parallax Calculation
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width - 0.5) * 26;
    const y = ((clientY - rect.top) / rect.height - 0.5) * 26;
    setMousePos({ x, y });

    // Handle Dragging Slider in Portrait Mode
    if (isDragging && containerRef.current) {
      const portraitRect = containerRef.current.getBoundingClientRect();
      const relativeX = clientX - portraitRect.left;
      const percentage = Math.max(0, Math.min(100, (relativeX / portraitRect.width) * 100));
      setRevealPercent(percentage);
    }
  };

  // Sword Drawing Sequence (Iaijutsu on the full-bleed samurai backdrop)
  const handleTriggerSwordDraw = (clientX?: number, clientY?: number) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate(15);
      } catch {}
    }

    setAnimState("reach");

    setTimeout(() => {
      setAnimState("grip");
    }, 180);

    setTimeout(() => {
      setAnimState("draw");
      soundFX.playSwordDraw();
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        try {
          navigator.vibrate([25, 20, 35]);
        } catch {}
      }
    }, 360);

    setTimeout(() => {
      setAnimState("slash");
      soundFX.playSlash();

      // Trigger wind gust for sakura petals across the whole screen
      window.dispatchEvent(
        new CustomEvent("sakura-gust", {
          detail: { x: clientX, y: clientY, force: 2.2 },
        })
      );
      window.dispatchEvent(
        new CustomEvent("katana-slash", {
          detail: { x: clientX || window.innerWidth * 0.7, y: clientY || window.innerHeight * 0.5 },
        })
      );
    }, 600);

    setTimeout(() => {
      setAnimState("sheathe");
      soundFX.playSheathe();
    }, 1100);

    setTimeout(() => {
      setAnimState("idle");
      isAnimatingRef.current = false;
    }, 1750);
  };

  const handleIdentityClick = (index: number, e: React.MouseEvent) => {
    setActiveIdentityIndex(index);
    soundFX.playSlash();
    soundFX.playSakuraChime();

    window.dispatchEvent(
      new CustomEvent("katana-slash", {
        detail: { x: e.clientX, y: e.clientY },
      })
    );
  };

  const handleCtaClick = (target: string, e: React.MouseEvent) => {
    soundFX.playSlash();
    window.dispatchEvent(
      new CustomEvent("katana-slash", {
        detail: { x: e.clientX, y: e.clientY },
      })
    );
    setTimeout(() => {
      onEnterShowcase(target);
    }, 180);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsDragging(false)}
      className="relative w-full min-h-screen bg-[#070913] text-[#F5F5F3] flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 lg:px-16 py-12 lg:py-0 overflow-x-hidden select-none"
    >
      {/* 0. FULL IMMERSIVE SAMURAI MASTER ARTWORK BACKDROP (Antique Parchment, Pagoda, Red Sun, Blooming Sakura & Samurai) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src="/images/samurai-backdrop.jpg"
          alt="Suvradip Dey - Samurai Experience Full Backdrop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center] sm:object-[76%_center] lg:object-[82%_center] opacity-90 transition-transform duration-700 ease-out"
          style={{
            transform: `scale(1.03) translate(${mousePos.x * 0.15}px, ${mousePos.y * 0.15}px)`,
          }}
        />

        {/* Master Japanese Ambient Gradients for Flawless Readability */}
        {/* Left-to-Right Scrim: Darkens under text on the left, reveals the majestic samurai on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070913]/95 via-[#070913]/75 to-[#070913]/30 sm:via-[#070913]/60 lg:from-[#070913]/90 lg:via-[#070913]/40 lg:to-transparent" />

        {/* Top Header & Bottom Section Transition Scrims */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#070913] via-[#070913]/70 to-transparent opacity-85" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#070913] via-[#070913]/80 to-transparent" />
      </div>

      {/* 1. SAKURA BACKGROUND LAYER (Petals drift behind subject) */}
      <SakuraPetalsCanvas layer="background" />

      {/* Atmospheric Japanese Moonlight Glow Aura */}
      <div
        className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[160px] pointer-events-none transition-all duration-700 opacity-20"
        style={{
          background: `radial-gradient(circle, ${currentIdentity.accent} 0%, rgba(255,183,197,0.15) 50%, transparent 75%)`,
        }}
      />

      {/* Subtle Japanese Minimalist Vertical Watermark */}
      <div className="absolute right-8 top-1/4 pointer-events-none opacity-5 text-8xl font-serif tracking-widest hidden lg:block">
        桜侍
      </div>

      {/* LEFT COLUMN: Client-Conversion Headline, Story & Direct Actions */}
      <div className="relative z-20 flex flex-col justify-between w-full max-w-xl py-4 lg:py-8">
        <div className="flex flex-col">
          {/* Identity Tag & Name Banner */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
            <span
              className="px-2.5 py-1 rounded text-[10px] font-mono tracking-widest uppercase transition-colors duration-300"
              style={{
                backgroundColor: `${currentIdentity.accent}20`,
                color: currentIdentity.accent,
                border: `1px solid ${currentIdentity.accent}40`,
              }}
            >
              {currentIdentity.badge} • {currentIdentity.kanji}
            </span>
            <span className="text-[11px] font-mono text-white/60 tracking-wider">
              SUVRADIP DEY • FREELANCE ENGINEER
            </span>
          </div>

          {/* Master Conversion Headline with CSS clamp() */}
          <h1
            className="font-display font-extrabold text-white tracking-tight leading-[1.15] mb-3 sm:mb-4 drop-shadow-md"
            style={{
              fontSize: "clamp(1.65rem, 5vw, 2.75rem)",
            }}
          >
            I Build Digital Experiences That Work as{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd1dc] via-[#ff2a6d] to-[#00f0ff]">
              Beautifully
            </span>{" "}
            as They Look.
          </h1>

          {/* Master Supporting Text */}
          <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed max-w-lg mb-6 drop-shadow-sm">
            I&apos;m Suvradip Dey, a developer building modern websites, Python-powered automation, backend systems, and data-driven solutions. I help individuals, startups, and businesses transform ideas into functional digital products.
          </p>

          {/* Three High-Conversion Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6">
            {/* Primary CTA: Start a Project */}
            <button
              onClick={(e) => handleCtaClick("inquiry", e)}
              className="min-h-[44px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs font-mono font-bold tracking-wider text-black bg-gradient-to-r from-[#ffd1dc] via-[#ffb7c5] to-white hover:from-white hover:to-[#ffd1dc] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,183,197,0.3)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-[#ff2a6d]" />
              <span>START A PROJECT</span>
            </button>

            {/* Secondary CTA: Explore My Work */}
            <button
              onClick={(e) => handleCtaClick("projects", e)}
              className="min-h-[44px] px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs font-mono font-semibold tracking-wider text-white border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-sm"
            >
              <span>EXPLORE MY WORK</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#00f0ff]" />
            </button>

            {/* Additional CTA: View Services */}
            <button
              onClick={(e) => handleCtaClick("services", e)}
              className="min-h-[44px] px-3.5 py-2 text-xs font-mono text-white/70 hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>VIEW SERVICES</span>
              <ChevronRight className="w-3 h-3 text-[#ffb7c5]" />
            </button>
          </div>

          {/* Quick Service Highlights */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
            {QUICK_SERVICES.map((s, idx) => (
              <button
                key={s.label}
                onClick={(e) => handleCtaClick(s.target, e)}
                onMouseEnter={() => setHoveredMenuIndex(idx)}
                onMouseLeave={() => setHoveredMenuIndex(null)}
                className="min-h-[44px] p-2 rounded-xl bg-black/40 hover:bg-white/[0.08] border border-white/5 hover:border-white/20 backdrop-blur-sm transition-all flex items-center justify-between text-left group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffb7c5] group-hover:scale-125 transition-transform" />
                  <span className="text-[11px] font-mono text-white/80 group-hover:text-white">{s.label}</span>
                </div>
                <span className="text-[9px] font-serif text-white/40 group-hover:text-[#ffb7c5]">{s.kanji}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Social Icons Row */}
        <div className="flex items-center gap-4 text-[#626674] pt-4 border-t border-white/10 mt-4">
          <a
            href="https://github.com/HENRY3757v"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:text-white transition-colors"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/suvradip-dey-1a659728b"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:text-white transition-colors"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:leodas8777@gmail.com"
            className="p-2 hover:text-white transition-colors"
            title="Send Email"
          >
            <Mail className="w-4 h-4" />
          </a>

          <div className="ml-auto text-[10px] font-mono text-white/50 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AVAILABLE FOR WORK</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: INTERACTIVE SAMURAI HOTSPOT & LIVING PORTRAIT ENGINE */}
      <div className="relative z-20 flex-1 w-full max-w-xl flex flex-col items-center justify-center pt-6 lg:pt-0 pl-0 lg:pl-8">
        {/* Experience Mode Toggle */}
        <div className="relative z-30 flex items-center gap-2 mb-3 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-xl">
          <button
            onClick={() => setViewMode("samurai")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === "samurai"
                ? "bg-[#ffb7c5] text-black font-bold shadow-lg shadow-[#ffb7c5]/30"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>SAMURAI BACKDROP ⚔️</span>
          </button>
          <button
            onClick={() => setViewMode("portrait")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === "portrait"
                ? "bg-white/20 text-white font-bold border border-white/20 shadow-lg"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>LIVING PORTRAIT 📷</span>
          </button>
        </div>

        {/* Five Identity Selector Pills */}
        <div className="relative z-30 flex items-center justify-center gap-1.5 mb-4 bg-black/50 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-xl flex-wrap">
          {IDENTITIES.map((identity, idx) => {
            const isActive = activeIdentityIndex === idx;
            return (
              <button
                key={identity.id}
                onClick={(e) => handleIdentityClick(idx, e)}
                className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "bg-white/15 text-white shadow-lg font-bold border border-white/20"
                    : "text-[#8E929E] hover:text-white hover:bg-white/5"
                }`}
                style={{
                  color: isActive ? identity.accent : undefined,
                  boxShadow: isActive ? `0 0 15px ${identity.accentGlow}` : undefined,
                }}
              >
                <span className="text-[9px] opacity-60 font-serif">{identity.kanji}</span>
                <span>{identity.id.toUpperCase()}</span>
              </button>
            );
          })}
        </div>

        {/* MAIN STAGE: Interactive Katana Hotspot OR Living Portrait */}
        {viewMode === "samurai" ? (
          <div className="relative w-full max-w-md h-[40vh] sm:h-[48vh] lg:h-[58vh] flex flex-col items-center justify-center">
            {/* Interactive Clickable Hotspot over the Samurai in Backdrop */}
            <button
              type="button"
              onClick={(e) => handleTriggerSwordDraw(e.clientX, e.clientY)}
              onTouchEnd={(e) => {
                if (e.changedTouches && e.changedTouches[0]) {
                  handleTriggerSwordDraw(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
                }
              }}
              className="relative w-full h-full rounded-3xl border border-white/10 hover:border-[#ffb7c5]/50 bg-black/20 hover:bg-black/10 backdrop-blur-[2px] transition-all flex flex-col justify-between p-4 cursor-pointer group shadow-2xl"
              aria-label="Draw Samurai Katana Sword"
            >
              {/* Top Status Badge */}
              <div className="flex items-center justify-between w-full pointer-events-none">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#ffb7c5]/30 text-[10px] font-mono text-[#ffb7c5]">
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
              </div>

              {/* Dynamic Cutting Blade Arc Overlay during Draw & Slash */}
              {(animState === "draw" || animState === "slash") && (
                <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 500 350" fill="none">
                    <defs>
                      <linearGradient id="heroKatanaBlade" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                        <stop offset="35%" stopColor="#ffd1dc" stopOpacity="0.85" />
                        <stop offset="70%" stopColor="#ffb7c5" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                      </linearGradient>
                      <filter id="heroBladeGlow">
                        <feGaussianBlur stdDeviation="3.5" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    <path
                      d="M 400 280 Q 320 180, 180 120 T 50 100"
                      stroke="url(#heroKatanaBlade)"
                      strokeWidth={animState === "slash" ? "5.5" : "3"}
                      strokeLinecap="round"
                      filter="url(#heroBladeGlow)"
                      className="animate-slash-arc"
                    />

                    <circle cx="300" cy="170" r="5" fill="#ffffff" className="animate-ping" />
                    <circle cx="220" cy="140" r="4" fill="#ffb7c5" className="animate-ping" />
                  </svg>

                  <div
                    className="absolute w-28 h-28 rounded-full bg-white/90 blur-xl animate-blade-flash pointer-events-none"
                    style={{ top: "40%", right: "30%" }}
                  />
                </div>
              )}

              {/* Resheath Spark */}
              {animState === "sheathe" && (
                <div
                  className="absolute z-30 w-5 h-5 rounded-full bg-[#ffb7c5] shadow-[0_0_20px_#ffffff] animate-ping pointer-events-none"
                  style={{ top: "65%", right: "30%" }}
                />
              )}

              {/* Bottom Touch / Click Invitation Pill */}
              <div className="self-center flex items-center gap-2 px-4 py-2 rounded-full bg-black/85 backdrop-blur-md border border-[#ffb7c5]/40 text-xs font-mono text-white shadow-2xl group-hover:scale-105 group-hover:border-[#ffb7c5] transition-all">
                <Sparkles className="w-3.5 h-3.5 text-[#ffb7c5] animate-spin" />
                <span className="font-semibold tracking-wider">TAP SAMURAI TO DRAW BLADE ⚔️</span>
              </div>
            </button>

            <p className="mt-2 text-[10px] font-mono text-white/50 tracking-wider">
              ANTIQUE PARCHMENT • SHINOGI-ZUKURI KATANA • SAKURA WIND PHYSICS
            </p>
          </div>
        ) : (
          /* The Living Photographic Portrait Frame */
          <div
            ref={containerRef}
            onClick={(e) => handleIdentityClick((activeIdentityIndex + 1) % IDENTITIES.length, e)}
            className="relative w-full max-w-md h-[45vh] lg:h-[55vh] flex items-center justify-center cursor-pointer group"
            title="Click to slash & switch identity state"
          >
            <div
              className="relative w-full h-full animate-living-breathe transition-transform duration-300 ease-out"
              style={{
                transform: `translate(${mousePos.x * 0.22}px, ${mousePos.y * 0.22}px) rotateX(${
                  -mousePos.y * 0.3
                }deg) rotateY(${mousePos.x * 0.3}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* LAYER A: Black & White Base */}
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-500"
                style={{
                  filter: "grayscale(100%) contrast(125%) brightness(92%)",
                  clipPath: `polygon(${revealPercent}% 0, 100% 0, 100% 100%, ${revealPercent}% 100%)`,
                  WebkitMaskImage: "radial-gradient(circle at 50% 48%, black 42%, transparent 74%)",
                  maskImage: "radial-gradient(circle at 50% 48%, black 42%, transparent 74%)",
                }}
              >
                <Image
                  src="/images/suvradip-vignette.jpg?v=5"
                  alt="Suvradip Dey - Living B&W Portrait"
                  fill
                  priority
                  className="object-contain object-center select-none"
                />
              </div>

              {/* LAYER B: Dynamic Color */}
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-500"
                style={{
                  filter: currentIdentity.filterStyle,
                  clipPath: `polygon(0 0, ${revealPercent}% 0, ${revealPercent}% 100%, 0 100%)`,
                  WebkitMaskImage: "radial-gradient(circle at 50% 48%, black 42%, transparent 74%)",
                  maskImage: "radial-gradient(circle at 50% 48%, black 42%, transparent 74%)",
                }}
              >
                <Image
                  src="/images/suvradip-vignette.jpg?v=5"
                  alt="Suvradip Dey - Identity Color Portrait"
                  fill
                  priority
                  className="object-contain object-center select-none"
                />
              </div>

              {/* Katana Slash Light Dividing Cut Line */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#ffb7c5] to-transparent shadow-[0_0_15px_#ff2a6d] pointer-events-none transition-all duration-75"
                style={{
                  left: `${revealPercent}%`,
                }}
              >
                <div
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setIsDragging(true);
                  }}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-black/80 border border-[#ffb7c5] shadow-[0_0_12px_#ff2a6d] flex items-center justify-center cursor-ew-resize pointer-events-auto hover:scale-110 transition-transform"
                  title="Drag to reveal color dimension"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#ffb7c5]" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Identity Tags Footer Bar */}
        <div className="relative z-30 flex items-center gap-2 mt-3 flex-wrap justify-center">
          {currentIdentity.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-md text-[10px] font-mono text-white/70 bg-black/40 border border-white/10 backdrop-blur-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* 2. SAKURA FOREGROUND LAYER (Petals drift in front across entire screen) */}
      <SakuraPetalsCanvas layer="foreground" />
    </section>
  );
}
