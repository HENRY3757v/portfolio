"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import { soundFX } from "@/utils/soundEffects";
import {
  ArrowUpRight,
  Github,
  ExternalLink,
  BookOpen,
  Sparkles,
  Layers,
  Scale,
  Users,
  Database,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function ProjectsShowroom() {
  const flagship = projectsData[0]; // ShopEase

  const handleSlashClick = (e: React.MouseEvent) => {
    soundFX.playSlash();
    window.dispatchEvent(
      new CustomEvent("katana-slash", {
        detail: { x: e.clientX, y: e.clientY },
      })
    );
  };

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-6 border-t border-white/5 bg-[#07090C] overflow-hidden">
      {/* Background Japanese Watermark Accent */}
      <div className="absolute right-6 top-16 pointer-events-none opacity-5 text-9xl font-serif select-none hidden lg:block">
        旗艦
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-16">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ffb7c5] shadow-[0_0_8px_#ff2a6d]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#ffb7c5]">
              03 // 旗艦案件 • THE DIGITAL SHOWROOM
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            SELECTED WORK.
          </h2>
          <p className="text-foreground-muted text-sm sm:text-base max-w-2xl leading-relaxed mt-1">
            &ldquo;Proof lives in the pixels.&rdquo; Engineered with real databases, authentic catalogs, and zero fictional metrics.
          </p>
        </div>

        {/* Flagship Project Card: ShopEase with Katana Interactive Accents */}
        <div
          data-katana="true"
          className="relative rounded-3xl bg-[#0E1117] border border-white/10 overflow-hidden shadow-2xl mb-16 group hover:border-[#ffb7c5]/30 transition-all duration-500"
        >
          {/* Subtle Sakura Ambient Glow */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#ff2a6d]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#ff2a6d]/20 transition-all duration-700" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
            {/* Left: Project Screenshot & Browser Presentation */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-xl group-hover:border-[#ffb7c5]/40 transition-all duration-500">
                {/* Mockup Top Window Bar */}
                <div className="h-7 px-3 bg-[#151922] border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  </div>
                  <span className="text-[10px] font-mono text-foreground-dim">
                    theshopease-five.vercel.app
                  </span>
                  <div className="w-8" />
                </div>

                {/* Screenshot Image */}
                <div className="relative w-full h-[calc(100%-28px)] bg-[#0A0C10]">
                  <Image
                    src={flagship.heroImage}
                    alt="ShopEase - Next-Gen E-Commerce Platform"
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  {/* Fallback stylized banner if image path is unavailable */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-tr from-black via-gray-950 to-blue-950/40">
                    <span className="font-display font-extrabold text-2xl text-white tracking-wider">
                      SHOPEASE
                    </span>
                    <span className="text-xs font-mono text-[#00f0ff] mt-1">
                      React 19 • Tailwind CSS v4 • Supabase PostgreSQL
                    </span>
                  </div>
                </div>

                {/* Live Indicator Pill */}
                <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>PRODUCTION DEPLOYED ON VERCEL</span>
                </div>
              </div>

              {/* Verified Feature Highlights Chips */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2 text-foreground-muted">
                  <Scale className="w-3.5 h-3.5 text-[#00f0ff] flex-shrink-0" />
                  <span>VS Spec 3-Way Mode</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2 text-foreground-muted">
                  <Users className="w-3.5 h-3.5 text-[#c084fc] flex-shrink-0" />
                  <span>Dosti Deal (12% Off)</span>
                </div>
              </div>
            </div>

            {/* Right: Editorial Copy & CTAs */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold tracking-widest text-[#00f0ff] uppercase">
                    {flagship.flagshipNumber}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#ffb7c5]/10 border border-[#ffb7c5]/30 text-[#ffb7c5]">
                    KATANA VERIFIED
                  </span>
                </div>
                <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                  {flagship.title}
                </h3>
                <h4 className="text-sm sm:text-base font-medium text-foreground-muted mt-1">
                  {flagship.subtitle}
                </h4>
              </div>

              <p className="text-foreground-muted text-sm leading-relaxed">
                {flagship.description}
              </p>

              {/* Tech Stack Tags */}
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-foreground-dim block mb-2">
                  VERIFIED STACK ARCHITECTURE
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {flagship.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 border border-white/10 text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons with Katana Slash Feedback */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/projects/shopease"
                  onClick={handleSlashClick}
                  className="px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider text-black bg-gradient-to-r from-white via-white to-[#ffd1dc] hover:from-[#ffd1dc] hover:to-white transition-all flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>EXPLORE CASE STUDY</span>
                </Link>

                {flagship.liveUrl && (
                  <a
                    href={flagship.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleSlashClick}
                    className="px-5 py-2.5 rounded-full text-xs font-mono font-semibold tracking-wider text-white border border-white/20 hover:border-[#00f0ff]/50 bg-white/5 hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>VIEW LIVE PROJECT</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#00f0ff]" />
                  </a>
                )}

                <a
                  href={flagship.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleSlashClick}
                  className="p-2.5 rounded-full text-foreground-muted hover:text-white border border-white/10 hover:border-white/30 bg-white/5 transition-all cursor-pointer"
                  title="View Source Code on GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Future Projects Reusable Extensibility Slot */}
        <div className="p-8 rounded-3xl bg-[#0B0D12] border border-dashed border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
              EXTENSIBLE REPOSITORY PIPELINE
            </span>
            <h4 className="font-display font-bold text-lg text-white">
              Actively Engineering Next Systems in the Lab
            </h4>
            <p className="text-xs text-foreground-muted max-w-lg">
              Adhering to strict engineering honesty: Only fully verified, live-deployed projects with verifiable source codes are showcased as completed. New full-stack architectures and AI utilities will link directly here upon release.
            </p>
          </div>
          <a
            href="https://github.com/HENRY3757v"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleSlashClick}
            className="flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-mono text-white bg-white/5 hover:bg-white/10 border border-white/15 flex items-center gap-2 cursor-pointer"
          >
            <Github className="w-3.5 h-3.5" />
            <span>FOLLOW GITHUB REPOSITORIES</span>
          </a>
        </div>
      </div>
    </section>
  );
}
