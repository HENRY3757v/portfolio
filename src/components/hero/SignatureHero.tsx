"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Globe,
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface SignatureHeroProps {
  onEnterShowcase: (sectionId?: string) => void;
}

const MENU_ITEMS = [
  { label: "User Interface", target: "projects" },
  { label: "Brand Strategy", target: "services" },
  { label: "Full-Stack Systems", target: "projects" },
  { label: "Python & Automation", target: "expertise" },
  { label: "AI & Data Science", target: "about" },
  { label: "Creative Technology", target: "services" },
];

export default function SignatureHero({ onEnterShowcase }: SignatureHeroProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width - 0.5) * 24;
    const y = ((clientY - rect.top) / rect.height - 0.5) * 24;
    setMousePos({ x, y });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative w-screen h-screen min-h-[650px] bg-[#0c0e17] text-[#F5F5F3] flex items-center justify-between px-8 sm:px-16 lg:px-24 overflow-hidden select-none"
    >
      {/* Background Deep Vignette */}
      <div className="absolute inset-0 bg-[#0c0e17] pointer-events-none" />

      {/* LEFT COLUMN: 1:1 Match to the Reference Screenshot */}
      <div className="relative z-20 flex flex-col justify-between h-full max-h-[580px] py-6 max-w-sm">
        {/* Brand Typographic Title */}
        <div className="flex flex-col">
          <div className="font-display font-extrabold text-2xl sm:text-3xl tracking-[0.32em] text-[#ff2a6d] drop-shadow-[0_0_15px_rgba(255,42,109,0.4)] leading-tight">
            <span>SUVRADIP</span>
            <br />
            <span className="text-[#05d9e8] drop-shadow-[0_0_15px_rgba(5,217,232,0.4)]">DEY</span>
          </div>
          {/* Subtle Horizontal Divider */}
          <div className="w-8 h-px bg-white/20 mt-5" />
        </div>

        {/* Minimalist Vertical Navigation List */}
        <nav className="flex flex-col gap-4 text-sm sm:text-base font-sans tracking-wide py-4">
          {MENU_ITEMS.map((item, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <button
                key={item.label}
                onClick={() => onEnterShowcase(item.target)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`text-left transition-all duration-300 flex items-center gap-2 group cursor-pointer ${
                  isHovered
                    ? "text-white translate-x-1.5 font-medium"
                    : "text-[#8E929E] hover:text-white"
                }`}
              >
                <span>{item.label}</span>
                <span
                  className={`text-[10px] font-mono text-[#05d9e8] transition-opacity duration-300 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                >
                  →
                </span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Social Icons Row */}
        <div className="flex items-center gap-5 text-[#626674] pt-4">
          <a
            href="https://github.com/HENRY3757v"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            title="GitHub"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/suvradipdey"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            title="LinkedIn"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:leodas8777@gmail.com"
            className="hover:text-white transition-colors"
            title="Email"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
          <button
            onClick={() => onEnterShowcase()}
            className="text-[11px] font-mono tracking-wider text-[#05d9e8] hover:text-white flex items-center gap-1 transition-colors ml-2"
          >
            <span>CLICK TO ENTER SHOWCASE</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: Cinematic Multi-Exposure Chromatic Portrait */}
      <div
        onClick={() => onEnterShowcase()}
        className="relative z-10 w-full max-w-xl h-[85vh] flex items-center justify-center cursor-pointer group"
        title="Click to enter portfolio"
      >
        {/* Layer 1: Left Red/Magenta Exposure */}
        <div
          className="absolute inset-0 mix-blend-screen opacity-85 transition-all duration-300 pointer-events-none"
          style={{
            transform: `translate(${-34 + mousePos.x * 0.4}px, ${-4 + mousePos.y * 0.4}px) scale(0.97)`,
            filter: "contrast(140%) brightness(95%) sepia(100%) hue-rotate(315deg) saturate(380%)",
            WebkitMaskImage: "radial-gradient(circle at 50% 48%, black 42%, transparent 72%)",
            maskImage: "radial-gradient(circle at 50% 48%, black 42%, transparent 72%)",
          }}
        >
          <Image
            src="/images/suvradip-vignette.jpg?v=5"
            alt="Suvradip Dey - Red Exposure"
            fill
            priority
            className="object-contain object-center"
          />
        </div>

        {/* Layer 2: Center Yellow/Lime Exposure */}
        <div
          className="absolute inset-0 mix-blend-screen opacity-90 transition-all duration-300 pointer-events-none"
          style={{
            transform: `translate(${mousePos.x * 0.25}px, ${mousePos.y * 0.25}px)`,
            filter: "contrast(135%) brightness(110%) sepia(100%) hue-rotate(48deg) saturate(400%)",
            WebkitMaskImage: "radial-gradient(circle at 50% 48%, black 42%, transparent 72%)",
            maskImage: "radial-gradient(circle at 50% 48%, black 42%, transparent 72%)",
          }}
        >
          <Image
            src="/images/suvradip-vignette.jpg?v=5"
            alt="Suvradip Dey - Yellow Exposure"
            fill
            priority
            className="object-contain object-center"
          />
        </div>

        {/* Layer 3: Right Cyan/Blue Exposure */}
        <div
          className="absolute inset-0 mix-blend-screen opacity-85 transition-all duration-300 pointer-events-none"
          style={{
            transform: `translate(${32 - mousePos.x * 0.4}px, ${-6 - mousePos.y * 0.4}px) scale(1.02)`,
            filter: "contrast(135%) brightness(105%) sepia(100%) hue-rotate(185deg) saturate(380%)",
            WebkitMaskImage: "radial-gradient(circle at 50% 48%, black 42%, transparent 72%)",
            maskImage: "radial-gradient(circle at 50% 48%, black 42%, transparent 72%)",
          }}
        >
          <Image
            src="/images/suvradip-vignette.jpg?v=5"
            alt="Suvradip Dey - Blue Exposure"
            fill
            priority
            className="object-contain object-center"
          />
        </div>

        {/* Layer 4: Original Crisp Face Layer in Forefront */}
        <div
          className="absolute inset-0 opacity-80 transition-transform duration-300 pointer-events-none"
          style={{
            transform: `translate(${mousePos.x * 0.15}px, ${mousePos.y * 0.15}px)`,
            filter: "contrast(115%) brightness(95%)",
            WebkitMaskImage: "radial-gradient(circle at 50% 48%, black 40%, transparent 68%)",
            maskImage: "radial-gradient(circle at 50% 48%, black 40%, transparent 68%)",
          }}
        >
          <Image
            src="/images/suvradip-vignette.jpg?v=5"
            alt="Suvradip Dey"
            fill
            priority
            className="object-contain object-center"
          />
        </div>

        {/* Hover Click Hint */}
        <div className="absolute bottom-10 right-10 z-30 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10 text-[10px] font-mono text-white/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 pointer-events-none">
          <Sparkles className="w-3 h-3 text-[#05d9e8]" />
          <span>CLICK TO OPEN FULL INTERFACE</span>
        </div>
      </div>
    </section>
  );
}
