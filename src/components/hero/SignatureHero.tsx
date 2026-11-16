"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { identityStates } from "@/data/identities";
import { profileData } from "@/data/profile";
import {
  ArrowRight,
  Code2,
  Terminal,
  Layers,
  Sparkles,
  Cpu,
  MoveHorizontal,
  Eye,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

export default function SignatureHero() {
  const [activeIdentityIndex, setActiveIdentityIndex] = useState(0);
  const [revealRatio, setRevealRatio] = useState(0.45); // 0 to 1 color reveal slider
  const [isDragging, setIsDragging] = useState(false);
  const [isHoldingReveal, setIsHoldingReveal] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const portraitContainerRef = useRef<HTMLDivElement>(null);

  const activeIdentity = identityStates[activeIdentityIndex];

  // Drag interaction calculation
  const updateRevealFromPointer = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const position = (clientX - rect.left) / rect.width;
    const clamped = Math.max(0, Math.min(1, position));
    setRevealRatio(clamped);

    // Progressive identity switching based on slider drag position (5 segments)
    const segmentIndex = Math.min(4, Math.floor(clamped * 5));
    setActiveIdentityIndex(segmentIndex);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updateRevealFromPointer(e.clientX);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updateRevealFromPointer(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {}
  };

  // Keyboard navigation for accessible identity & reveal manipulation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If focused inside an input, don't hijack keys
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === "ArrowRight") {
        setActiveIdentityIndex((prev) => {
          const next = (prev + 1) % identityStates.length;
          setRevealRatio((next + 0.5) / identityStates.length);
          return next;
        });
      } else if (e.key === "ArrowLeft") {
        setActiveIdentityIndex((prev) => {
          const next = (prev - 1 + identityStates.length) % identityStates.length;
          setRevealRatio((next + 0.5) / identityStates.length);
          return next;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const selectIdentity = (index: number) => {
    setActiveIdentityIndex(index);
    setRevealRatio((index + 0.5) / identityStates.length);
  };

  // Effective reveal ratio takes hold-to-reveal into account
  const effectiveReveal = isHoldingReveal ? 1.0 : revealRatio;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 50% 20%, ${activeIdentity.glowColor} 0%, transparent 60%)`,
      }}
    >
      {/* Background Ambient Glow tailored to active identity */}
      <div
        className="ambient-glow w-[500px] h-[500px] -top-20 -left-20"
        style={{ background: activeIdentity.accentColor }}
      />
      <div
        className="ambient-glow w-[450px] h-[450px] bottom-10 right-0"
        style={{ background: activeIdentity.accentColor }}
      />

      <div className="max-w-6xl w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Editorial Identity Copy */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Identity Pill & State Counter */}
          <div className="flex items-center gap-3">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider border transition-all duration-300"
              style={{
                borderColor: `${activeIdentity.accentColor}55`,
                backgroundColor: `${activeIdentity.accentColor}15`,
                color: activeIdentity.accentColor,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: activeIdentity.accentColor }} />
              <span>DIMENSION {activeIdentity.stateNumber} / 05</span>
              <span className="opacity-40">•</span>
              <span className="uppercase font-semibold">{activeIdentity.roleName}</span>
            </div>

            <span className="text-xs font-mono text-foreground-dim">
              [PRESS ARROW KEYS TO SHIFT]
            </span>
          </div>

          {/* Subtitle Monogram & Title */}
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-foreground-muted block mb-1">
              SUVRADIP DEY • {profileData.role}
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-white">
              I DON&apos;T JUST BUILD WEBSITES.
              <br />
              <span
                className="transition-colors duration-500"
                style={{ color: activeIdentity.accentColor }}
              >
                I BUILD DIGITAL EXPERIENCES.
              </span>
            </h1>
          </div>

          {/* Supporting Statement & Identity Headline */}
          <div className="border-l-2 pl-4 py-1 transition-colors duration-500" style={{ borderColor: activeIdentity.accentColor }}>
            <h2 className="font-display font-bold text-lg text-white mb-1">
              {activeIdentity.headline}
            </h2>
            <p className="text-foreground-muted text-sm sm:text-base leading-relaxed">
              &ldquo;{activeIdentity.supportingLine}&rdquo;
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="#projects"
              className="px-6 py-3 rounded-full text-xs font-mono font-bold tracking-wider text-black bg-white hover:bg-gray-200 transition-all flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95"
            >
              <span>EXPLORE MY WORK</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="#contact"
              className="px-6 py-3 rounded-full text-xs font-mono font-semibold tracking-wider text-white border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <span>LET&apos;S COLLABORATE</span>
            </Link>

            {/* Quick Hold to Reveal Button */}
            <button
              onMouseDown={() => setIsHoldingReveal(true)}
              onMouseUp={() => setIsHoldingReveal(false)}
              onTouchStart={() => setIsHoldingReveal(true)}
              onTouchEnd={() => setIsHoldingReveal(false)}
              className="px-4 py-2.5 rounded-full text-xs font-mono text-foreground-dim hover:text-white border border-dashed border-white/20 hover:border-white/40 flex items-center gap-1.5 transition-all select-none"
              title="Hold to temporarily reveal full photographic color"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>HOLD FOR COLOR</span>
            </button>
          </div>

          {/* Interactive Identity Switcher Tabs */}
          <div className="pt-4 border-t border-white/5">
            <div className="text-[11px] font-mono uppercase tracking-widest text-foreground-dim mb-2.5 flex items-center justify-between">
              <span>EXPLORE IDENTITY PHASES</span>
              <span className="font-semibold text-white">{activeIdentity.roleName}</span>
            </div>
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {identityStates.map((state, idx) => {
                const isActive = idx === activeIdentityIndex;
                return (
                  <button
                    key={state.id}
                    onClick={() => selectIdentity(idx)}
                    className={`py-2 px-1.5 rounded-lg text-center transition-all flex flex-col items-center gap-1 border ${
                      isActive
                        ? "bg-white/10 border-white/30 text-white shadow-md"
                        : "bg-white/[0.02] border-white/5 text-foreground-dim hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: state.accentColor }}
                    />
                    <span className="text-[10px] font-mono font-semibold truncate max-w-full">
                      {state.stateNumber}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Signature Identity Engine & Portrait Reveal */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div
            ref={portraitContainerRef}
            className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0D0F14] select-none"
          >
            {/* 1. Underlying Grayscale / Black-and-White Portrait */}
            <div className="absolute inset-0 z-10 grayscale contrast-125 brightness-95">
              <Image
                src="/images/suvradip-portrait.jpg"
                alt="Suvradip Dey - Creative Developer"
                fill
                priority
                className="object-cover object-center"
              />
              {/* Fallback stylized silhouette if portrait file is still loading */}
              <div className="absolute inset-0 flex items-center justify-center p-8 bg-gradient-to-b from-gray-900 to-black text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center font-mono text-xl text-white">
                    SD
                  </div>
                  <span className="text-xs font-mono text-foreground-dim">Suvradip Dey Portrait</span>
                </div>
              </div>
            </div>

            {/* 2. Top Color Layer with dynamic clip-path mask */}
            <div
              className="absolute inset-0 z-20 transition-all duration-75 pointer-events-none"
              style={{
                clipPath: `inset(0 0 0 ${effectiveReveal * 100}%)`,
              }}
            >
              <Image
                src="/images/suvradip-portrait.jpg"
                alt="Suvradip Dey - Full Color"
                fill
                priority
                className="object-cover object-center filter saturate-110 contrast-105"
              />
              <div
                className="absolute inset-0 mix-blend-color opacity-30"
                style={{ backgroundColor: activeIdentity.accentColor }}
              />
            </div>

            {/* 3. Physical interactive slider line separating B&W and Color */}
            <div
              className="absolute top-0 bottom-0 z-30 w-0.5 pointer-events-none transition-all duration-75"
              style={{
                left: `${effectiveReveal * 100}%`,
                backgroundColor: activeIdentity.accentColor,
                boxShadow: `0 0 15px ${activeIdentity.accentColor}`,
              }}
            >
              {/* Slider center handle orb */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-xl border-2 pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-transform"
                style={{ borderColor: activeIdentity.accentColor }}
              >
                <MoveHorizontal className="w-4 h-4" />
              </div>
            </div>

            {/* Corner Badge */}
            <div className="absolute top-4 left-4 z-30 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeIdentity.accentColor }} />
              <span>{Math.round(effectiveReveal * 100)}% COLOR REVEAL</span>
            </div>

            {/* Floating Technical Snippet Card */}
            <div className="absolute bottom-4 inset-x-4 z-30 p-3 rounded-2xl bg-[#090B0E]/90 backdrop-blur-xl border border-white/10 text-xs font-mono">
              <div className="flex items-center justify-between text-[10px] text-foreground-dim mb-1 pb-1 border-b border-white/5">
                <span className="flex items-center gap-1 text-white">
                  <Terminal className="w-3 h-3 text-identity-developer" />
                  <span>{activeIdentity.badge}</span>
                </span>
                <span>{activeIdentity.roleName}</span>
              </div>
              <p className="text-foreground-muted text-[11px] line-clamp-2 leading-relaxed">
                {activeIdentity.codeSnippet?.split("\n")[0]}
              </p>
            </div>
          </div>

          {/* Interactive Drag Bar Control */}
          <div className="w-full max-w-md mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-mono text-foreground-dim">
              <span className="flex items-center gap-1.5 font-semibold text-white">
                <MoveHorizontal className="w-3.5 h-3.5 text-identity-developer" />
                <span>DRAG TO EXPLORE MY DIMENSIONS</span>
              </span>
              <span>{Math.round(revealRatio * 100)}%</span>
            </div>

            {/* Scrubbable Track */}
            <div
              ref={sliderRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className="relative w-full h-8 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full cursor-ew-resize flex items-center px-2 touch-none select-none transition-colors"
            >
              {/* Progress fill */}
              <div
                className="absolute left-1 top-1 bottom-1 rounded-full transition-all duration-75"
                style={{
                  width: `calc(${revealRatio * 100}% - 8px)`,
                  backgroundColor: `${activeIdentity.accentColor}33`,
                  border: `1px solid ${activeIdentity.accentColor}77`,
                }}
              />

              {/* Thumb Handle */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white shadow-lg pointer-events-none transition-all duration-75"
                style={{
                  left: `calc(${revealRatio * 100}% - 10px)`,
                  boxShadow: `0 0 10px ${activeIdentity.accentColor}`,
                }}
              />
            </div>

            <div className="flex justify-between text-[10px] font-mono text-foreground-dim px-1">
              <span>01 B&amp;W LOGIC</span>
              <span>03 BUILDER</span>
              <span>05 FULL COLOR CREATION</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
