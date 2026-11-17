"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { profileData } from "@/data/profile";
import {
  Globe,
  Github,
  Linkedin,
  Mail,
  FileText,
  ArrowDown,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

interface DimensionItem {
  id: string;
  label: string;
  role: string;
  description: string;
  targetSection: string;
  rgbShift: {
    layer1Hue: string; // Red/Magenta
    layer2Hue: string; // Yellow/Amber
    layer3Hue: string; // Cyan/Blue
    accent: string;
  };
}

const DIMENSIONS: DimensionItem[] = [
  {
    id: "ui",
    label: "User Interface",
    role: "Frontend Engineer",
    description: "React 19, Tailwind CSS v4, dynamic component systems & pixel-perfect responsive execution.",
    targetSection: "#projects",
    rgbShift: {
      layer1Hue: "hue-rotate(320deg)",
      layer2Hue: "hue-rotate(50deg)",
      layer3Hue: "hue-rotate(190deg)",
      accent: "#3B82F6",
    },
  },
  {
    id: "strategy",
    label: "Brand Strategy",
    role: "Digital Strategist & SEO",
    description: "Technical SEO, Core Web Vitals optimization, and conversion-focused digital positioning.",
    targetSection: "#services",
    rgbShift: {
      layer1Hue: "hue-rotate(340deg)",
      layer2Hue: "hue-rotate(35deg)",
      layer3Hue: "hue-rotate(210deg)",
      accent: "#EC4899",
    },
  },
  {
    id: "fullstack",
    label: "Full-Stack Systems",
    role: "Lead Full-Stack Architect",
    description: "ShopEase creator — Express 5 APIs, Node.js, and Supabase cloud PostgreSQL persistence.",
    targetSection: "#projects",
    rgbShift: {
      layer1Hue: "hue-rotate(280deg)",
      layer2Hue: "hue-rotate(60deg)",
      layer3Hue: "hue-rotate(160deg)",
      accent: "#10B981",
    },
  },
  {
    id: "python",
    label: "Python & Automation",
    role: "Backend & Scripting",
    description: "Automated ETL routines, SQL query optimization, file parsers, and algorithmic logic.",
    targetSection: "#expertise",
    rgbShift: {
      layer1Hue: "hue-rotate(300deg)",
      layer2Hue: "hue-rotate(75deg)",
      layer3Hue: "hue-rotate(140deg)",
      accent: "#059669",
    },
  },
  {
    id: "ai",
    label: "AI & Data Systems",
    role: "B.Tech CS & AI Student",
    description: "Machine learning fundamentals, predictive data modeling, and applied AI coursework at BBIT.",
    targetSection: "#about",
    rgbShift: {
      layer1Hue: "hue-rotate(15deg)",
      layer2Hue: "hue-rotate(40deg)",
      layer3Hue: "hue-rotate(220deg)",
      accent: "#F97316",
    },
  },
  {
    id: "creative",
    label: "Creative Technology",
    role: "Interaction Designer",
    description: "Where engineering meets art — chromatic typography, micro-interactions, and digital identity.",
    targetSection: "#services",
    rgbShift: {
      layer1Hue: "hue-rotate(310deg)",
      layer2Hue: "hue-rotate(90deg)",
      layer3Hue: "hue-rotate(180deg)",
      accent: "#06B6D4",
    },
  },
];

export default function SignatureHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const current = DIMENSIONS[activeIndex];

  // Subtle interactive mouse parallax over portrait
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((clientY - rect.top) / rect.height - 0.5) * 20;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const scrollToContent = (targetId?: string) => {
    const target = document.querySelector(targetId || "#about");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full bg-[#060813] text-[#F5F5F3] flex items-center justify-center px-6 sm:px-12 lg:px-20 py-20 overflow-hidden select-none"
    >
      {/* Background Subtle Radial Gradient */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at 70% 50%, ${current.rgbShift.accent}12 0%, transparent 65%), #060813`,
        }}
      />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* LEFT COLUMN: Editorial Brand, Capabilities List & Social Icons */}
        <div className="lg:col-span-5 flex flex-col justify-center gap-8">
          {/* Typographic Brand Logo (Tony Gines Aesthetic) */}
          <div className="flex flex-col">
            <div className="flex flex-col tracking-[0.38em] font-display font-extrabold text-2xl sm:text-3xl text-white">
              <span className="chromatic-logo leading-none" data-text="SUVRADIP">
                SUVRADIP
              </span>
              <span className="chromatic-logo leading-none mt-2 text-[#ff2a6d]" data-text="DEY">
                DEY
              </span>
            </div>

            {/* Accent Divider Line */}
            <div
              className="w-12 h-0.5 mt-5 transition-colors duration-500"
              style={{ backgroundColor: current.rgbShift.accent }}
            />
          </div>

          {/* Vertical Capabilities Menu (Hoverable / Clickable) */}
          <div className="flex flex-col gap-3 py-1">
            {DIMENSIONS.map((dim, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={dim.id}
                  onClick={() => {
                    setActiveIndex(idx);
                    scrollToContent(dim.targetSection);
                  }}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`text-left text-sm sm:text-base tracking-wide transition-all duration-300 flex items-center justify-between group py-1 ${
                    isActive
                      ? "text-white font-semibold pl-2"
                      : "text-foreground-dim hover:text-foreground-muted"
                  }`}
                  style={{
                    color: isActive ? "#ffffff" : undefined,
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        isActive ? "scale-125 opacity-100" : "opacity-0"
                      }`}
                      style={{ backgroundColor: dim.rgbShift.accent }}
                    />
                    <span>{dim.label}</span>
                  </span>

                  {isActive && (
                    <span className="text-[10px] font-mono tracking-wider opacity-60 flex items-center gap-1">
                      <span>ENTER</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Dimension Quick Description Card */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-1.5 transition-all">
            <span
              className="text-[10px] font-mono uppercase tracking-widest font-semibold transition-colors duration-500"
              style={{ color: current.rgbShift.accent }}
            >
              {current.role}
            </span>
            <p className="text-xs text-foreground-muted leading-relaxed">
              {current.description}
            </p>
          </div>

          {/* Minimalist Social Icon Row & Resume Link */}
          <div className="flex items-center gap-4 text-foreground-dim pt-2">
            <a
              href="https://github.com/HENRY3757v"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              title="GitHub Profile"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/suvradipdey"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              title="LinkedIn Profile"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:leodas8777@gmail.com"
              className="hover:text-white transition-colors"
              title="Email Suvradip"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="/resume.pdf"
              download="Suvradip_Dey_CV.pdf"
              className="hover:text-white transition-colors"
              title="Download CV"
              aria-label="Resume"
            >
              <FileText className="w-4 h-4" />
            </a>

            <div className="h-3 w-px bg-white/10 ml-2" />

            <button
              onClick={() => scrollToContent()}
              className="text-[11px] font-mono tracking-wider text-white hover:text-identity-developer flex items-center gap-1.5 transition-colors pl-1"
            >
              <span>ENTER SHOWCASE</span>
              <ArrowDown className="w-3 h-3 animate-bounce" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: The Multi-Exposure Chromatic Portrait Experience */}
        <div className="lg:col-span-7 flex justify-center lg:justify-end">
          <div
            onClick={() => scrollToContent(current.targetSection)}
            className="relative w-full max-w-lg aspect-[4/5] sm:aspect-[1/1] cursor-pointer group"
            title="Click to explore the full interactive portfolio"
          >
            {/* LAYER 1: Red / Magenta Ghost Exposure (Shifted Left) */}
            <div
              className="absolute inset-0 mix-blend-screen opacity-70 transition-all duration-500 pointer-events-none"
              style={{
                transform: `translate(${-18 + mouseOffset.x * 0.4}px, ${-4 + mouseOffset.y * 0.4}px) scale(0.98)`,
                filter: `contrast(130%) brightness(95%) sepia(100%) ${current.rgbShift.layer1Hue} saturate(300%)`,
                WebkitMaskImage: "radial-gradient(circle at 55% 48%, black 45%, transparent 75%)",
                maskImage: "radial-gradient(circle at 55% 48%, black 45%, transparent 75%)",
              }}
            >
              <Image
                src="/images/suvradip-portrait.jpg"
                alt="Suvradip Dey Multi-Exposure Layer Red"
                fill
                priority
                className="object-cover object-center"
              />
            </div>

            {/* LAYER 2: Yellow / Lime Exposure (Shifted Center-Right) */}
            <div
              className="absolute inset-0 mix-blend-screen opacity-75 transition-all duration-500 pointer-events-none"
              style={{
                transform: `translate(${12 + mouseOffset.x * 0.3}px, ${6 + mouseOffset.y * 0.3}px) scale(1.02)`,
                filter: `contrast(130%) brightness(105%) sepia(100%) ${current.rgbShift.layer2Hue} saturate(350%)`,
                WebkitMaskImage: "radial-gradient(circle at 55% 48%, black 45%, transparent 75%)",
                maskImage: "radial-gradient(circle at 55% 48%, black 45%, transparent 75%)",
              }}
            >
              <Image
                src="/images/suvradip-portrait.jpg"
                alt="Suvradip Dey Multi-Exposure Layer Yellow"
                fill
                priority
                className="object-cover object-center"
              />
            </div>

            {/* LAYER 3: Cyan / Electric Blue Exposure (Shifted Up-Right) */}
            <div
              className="absolute inset-0 mix-blend-screen opacity-70 transition-all duration-500 pointer-events-none"
              style={{
                transform: `translate(${6 - mouseOffset.x * 0.3}px, ${-8 - mouseOffset.y * 0.3}px)`,
                filter: `contrast(125%) brightness(100%) sepia(100%) ${current.rgbShift.layer3Hue} saturate(350%)`,
                WebkitMaskImage: "radial-gradient(circle at 55% 48%, black 45%, transparent 75%)",
                maskImage: "radial-gradient(circle at 55% 48%, black 45%, transparent 75%)",
              }}
            >
              <Image
                src="/images/suvradip-portrait.jpg"
                alt="Suvradip Dey Multi-Exposure Layer Cyan"
                fill
                priority
                className="object-cover object-center"
              />
            </div>

            {/* LAYER 4: Real Crisp Portrait (Vignetted seamlessly into dark backdrop) */}
            <div
              className="absolute inset-0 opacity-85 transition-transform duration-300 pointer-events-none"
              style={{
                transform: `translate(${mouseOffset.x * 0.15}px, ${mouseOffset.y * 0.15}px)`,
                filter: "contrast(112%) brightness(95%)",
                WebkitMaskImage: "radial-gradient(circle at 55% 48%, black 42%, transparent 72%)",
                maskImage: "radial-gradient(circle at 55% 48%, black 42%, transparent 72%)",
              }}
            >
              <Image
                src="/images/suvradip-portrait.jpg"
                alt="Suvradip Dey Portrait"
                fill
                priority
                className="object-cover object-center"
              />
            </div>

            {/* Floating Hint Overlay on Hover */}
            <div className="absolute bottom-8 right-6 z-20 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all flex items-center gap-2 shadow-2xl">
              <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: current.rgbShift.accent }} />
              <span>CLICK TO ENTER SHOWCASE</span>
              <ArrowDown className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
