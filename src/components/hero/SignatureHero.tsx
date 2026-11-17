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

const MENU_ITEMS = [
  { label: "User Interface", target: "projects", kanji: "界面" },
  { label: "ShopEase Flagship", target: "projects", kanji: "旗艦" },
  { label: "Full-Stack Systems", target: "projects", kanji: "全層" },
  { label: "Python & Automation", target: "expertise", kanji: "自動" },
  { label: "AI & Data Science", target: "about", kanji: "知能" },
  { label: "Creative Technology", target: "services", kanji: "創造" },
];

export default function SignatureHero({ onEnterShowcase }: SignatureHeroProps) {
  const [activeIdentityIndex, setActiveIdentityIndex] = useState(0);
  const [revealPercent, setRevealPercent] = useState(65); // 0 = Full B&W, 100 = Full Color
  const [isDragging, setIsDragging] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredMenuIndex, setHoveredMenuIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentIdentity = IDENTITIES[activeIdentityIndex];

  // Mouse Parallax Calculation
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width - 0.5) * 28;
    const y = ((clientY - rect.top) / rect.height - 0.5) * 28;
    setMousePos({ x, y });

    // Handle Dragging Slider
    if (isDragging && containerRef.current) {
      const portraitRect = containerRef.current.getBoundingClientRect();
      const relativeX = clientX - portraitRect.left;
      const percentage = Math.max(0, Math.min(100, (relativeX / portraitRect.width) * 100));
      setRevealPercent(percentage);
    }
  };

  const handleIdentityClick = (index: number, e: React.MouseEvent) => {
    setActiveIdentityIndex(index);
    soundFX.playSlash();
    soundFX.playSakuraChime();

    // Trigger visual slash effect at clicked position
    window.dispatchEvent(
      new CustomEvent("katana-slash", {
        detail: { x: e.clientX, y: e.clientY },
      })
    );
  };

  const handleMenuClick = (target: string, e: React.MouseEvent) => {
    soundFX.playSlash();
    window.dispatchEvent(
      new CustomEvent("katana-slash", {
        detail: { x: e.clientX, y: e.clientY },
      })
    );
    setTimeout(() => {
      onEnterShowcase(target);
    }, 200);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsDragging(false)}
      className="relative w-screen h-screen min-h-[700px] bg-[#070913] text-[#F5F5F3] flex items-center justify-between px-6 sm:px-12 lg:px-20 overflow-hidden select-none"
    >
      {/* 1. SAKURA BACKGROUND LAYER (Petals fall BEHIND the portrait) */}
      <SakuraPetalsCanvas layer="background" petalCount={28} />

      {/* Atmospheric Japanese Moonlight Glow Aura */}
      <div
        className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[160px] pointer-events-none transition-all duration-700 opacity-25"
        style={{
          background: `radial-gradient(circle, ${currentIdentity.accent} 0%, rgba(255,183,197,0.15) 50%, transparent 75%)`,
        }}
      />

      {/* Subtle Japanese Minimalist Vertical Watermark */}
      <div className="absolute right-8 top-1/4 pointer-events-none opacity-5 text-8xl font-serif tracking-widest hidden lg:block">
        桜侍
      </div>

      {/* LEFT COLUMN: Tony Gines Japanese Editorial Typography & Menu */}
      <div className="relative z-20 flex flex-col justify-between h-full max-h-[620px] py-8 max-w-md">
        {/* Brand Typographic Title */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <span
              className="px-2 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase transition-colors duration-300"
              style={{
                backgroundColor: `${currentIdentity.accent}20`,
                color: currentIdentity.accent,
                border: `1px solid ${currentIdentity.accent}40`,
              }}
            >
              {currentIdentity.badge} • {currentIdentity.kanji}
            </span>
            <span className="text-xs font-mono text-white/40 tracking-wider">
              SUVRADIP DEY
            </span>
          </div>

          <div className="font-display font-extrabold text-3xl sm:text-4xl tracking-[0.25em] text-[#ff2a6d] drop-shadow-[0_0_20px_rgba(255,42,109,0.4)] leading-tight">
            <span>SUVRADIP</span>
            <br />
            <span
              className="transition-colors duration-500"
              style={{
                color: currentIdentity.accent,
                textShadow: `0 0 20px ${currentIdentity.accentGlow}`,
              }}
            >
              DEY
            </span>
          </div>

          {/* Thin Samurai Blade Divider */}
          <div className="w-12 h-[1.5px] bg-gradient-to-r from-white/40 via-[#ffb7c5] to-transparent mt-5 mb-4" />

          {/* Active Identity Sub-Headline */}
          <div className="text-xs sm:text-sm font-mono tracking-wider text-[#9aa0ad] max-w-xs transition-all duration-300">
            <p className="font-semibold text-white/90">{currentIdentity.headline}</p>
            <p className="text-[11px] text-white/50 mt-1 line-clamp-2">{currentIdentity.subline}</p>
          </div>
        </div>

        {/* Minimalist Vertical Navigation Menu */}
        <nav className="flex flex-col gap-3 py-4">
          {MENU_ITEMS.map((item, index) => {
            const isHovered = hoveredMenuIndex === index;
            return (
              <button
                key={item.label}
                onClick={(e) => handleMenuClick(item.target, e)}
                onMouseEnter={() => setHoveredMenuIndex(index)}
                onMouseLeave={() => setHoveredMenuIndex(null)}
                className={`text-left transition-all duration-300 flex items-center justify-between group cursor-pointer py-0.5 ${
                  isHovered
                    ? "translate-x-2 text-white font-medium"
                    : "text-[#8E929E] hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      isHovered
                        ? "bg-[#ffb7c5] shadow-[0_0_8px_#ff2a6d] scale-125"
                        : "bg-white/20"
                    }`}
                  />
                  <span className="text-sm tracking-wide">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-serif text-white/30 group-hover:text-[#ffb7c5] transition-colors">
                    {item.kanji}
                  </span>
                  <ChevronRight
                    className={`w-3 h-3 text-[#00f0ff] transition-opacity duration-300 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </nav>

        {/* Bottom Social Icons & Katana Enter Button */}
        <div className="flex items-center gap-4 text-[#626674] pt-4 border-t border-white/5">
          <a
            href="https://github.com/HENRY3757v"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/suvradipdey"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:leodas8777@gmail.com"
            className="hover:text-white transition-colors"
            title="Send Email"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={(e) => handleMenuClick("about", e)}
            className="text-[11px] font-mono tracking-wider text-[#ffb7c5] hover:text-white flex items-center gap-1.5 transition-colors ml-auto group cursor-pointer"
          >
            <span>ENTER SHOWCASE</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* CENTER / RIGHT COLUMN: CINEMATIC LIVING PORTRAIT & IDENTITY ENGINE */}
      <div className="relative z-20 flex-1 max-w-2xl h-[88vh] flex flex-col items-center justify-center">
        {/* Five Identity Selector Pills (Top of portrait) */}
        <div className="relative z-30 flex items-center justify-center gap-1.5 mb-3 bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-xl">
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

        {/* The Living Portrait Frame with Parallax & Breathe */}
        <div
          ref={containerRef}
          onClick={(e) => handleIdentityClick((activeIdentityIndex + 1) % IDENTITIES.length, e)}
          className="relative w-full max-w-lg h-[72vh] flex items-center justify-center cursor-pointer group"
          title="Click to slash & switch identity state"
        >
          {/* Subtle Living Breathing Scale Wrapper */}
          <div
            className="relative w-full h-full animate-living-breathe transition-transform duration-300 ease-out"
            style={{
              transform: `translate(${mousePos.x * 0.25}px, ${mousePos.y * 0.25}px) rotateX(${
                -mousePos.y * 0.35
              }deg) rotateY(${mousePos.x * 0.35}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* LAYER A: Black & White Living Photographic Base (Visible on Right of Slider) */}
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
                alt="Suvradip Dey - Black & White Living Portrait"
                fill
                priority
                className="object-contain object-center select-none"
              />
            </div>

            {/* LAYER B: Dynamic Vibrant Color & Identity Aura (Visible on Left of Slider) */}
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

            {/* LAYER C: Sharp Forefront Face & Lighting Flare */}
            <div
              className="absolute inset-0 pointer-events-none opacity-45 mix-blend-overlay transition-transform duration-300"
              style={{
                transform: `translate(${mousePos.x * 0.1}px, ${mousePos.y * 0.1}px)`,
                WebkitMaskImage: "radial-gradient(circle at 50% 45%, black 35%, transparent 65%)",
                maskImage: "radial-gradient(circle at 50% 45%, black 35%, transparent 65%)",
              }}
            >
              <Image
                src="/images/suvradip-vignette.jpg?v=5"
                alt="Suvradip Dey - Highlight"
                fill
                priority
                className="object-contain object-center select-none"
              />
            </div>

            {/* Katana Slash Light Dividing Cut Line at revealPercent */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#ffb7c5] to-transparent shadow-[0_0_15px_#ff2a6d] pointer-events-none transition-all duration-75"
              style={{
                left: `${revealPercent}%`,
              }}
            >
              {/* Draggable Samurai Crest Handle */}
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

            {/* Interactive Japanese Katana Slash Hint Badge */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 px-4 py-1.5 rounded-full bg-black/70 border border-white/10 text-[10px] font-mono text-white/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 pointer-events-none shadow-2xl backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-[#ffb7c5] animate-spin" />
              <span>CLICK TO SLASH &amp; TRANSFORM IDENTITY</span>
            </div>
          </div>
        </div>

        {/* Identity Tags Footer Bar */}
        <div className="relative z-30 flex items-center gap-2 mt-2">
          {currentIdentity.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-md text-[10px] font-mono text-white/60 bg-white/5 border border-white/5"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* 2. SAKURA FOREGROUND LAYER (Petals drift IN FRONT of Suvradip's face) */}
      <SakuraPetalsCanvas layer="foreground" petalCount={16} />
    </section>
  );
}
