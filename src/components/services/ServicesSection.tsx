"use client";

import React, { useState } from "react";
import { soundFX } from "@/utils/soundEffects";
import {
  Globe,
  Terminal,
  Server,
  BarChart2,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Zap,
} from "lucide-react";

interface ServiceItem {
  id: string;
  kanji: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  capabilities: string[];
  ctaText: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "Website Development",
    kanji: "網頁開発",
    title: "Website Development",
    tagline: "Modern, responsive, high-converting web experiences",
    description: "Modern, responsive websites designed to establish a strong digital presence and convert visitors into customers.",
    icon: Globe,
    accent: "#00f0ff",
    capabilities: [
      "Personal portfolio websites",
      "Business websites & company profiles",
      "High-converting landing pages",
      "Responsive frontend development (Next.js / React)",
      "Website redesign, speed & mobile optimization",
    ],
    ctaText: "Discuss a Website Project",
  },
  {
    id: "Python Automation",
    kanji: "自動化",
    title: "Python Automation",
    tagline: "Cut manual work with custom automation scripts",
    description: "Custom Python solutions that reduce repetitive manual work and improve workflow efficiency.",
    icon: Terminal,
    accent: "#10b981",
    capabilities: [
      "Custom Python scripts & CLI utilities",
      "CSV, Excel & spreadsheet data processing",
      "Automated data cleaning & formatting",
      "File management & batch transformation",
      "Repetitive workflow & task automation",
    ],
    ctaText: "Automate My Workflow",
  },
  {
    id: "Backend Development",
    kanji: "基盤開発",
    title: "Backend Development",
    tagline: "Reliable APIs, business logic & database architecture",
    description: "Reliable backend functionality for web applications, databases, and custom software workflows.",
    icon: Server,
    accent: "#c084fc",
    capabilities: [
      "Python Flask & RESTful API development",
      "PostgreSQL, MySQL & Supabase database integration",
      "Form processing & server-side validation",
      "Authentication & secure business logic",
      "Cloud deployment & backend architecture",
    ],
    ctaText: "Build My Backend",
  },
  {
    id: "Data Analytics",
    kanji: "分析論",
    title: "Data Analytics",
    tagline: "Transform raw data into actionable visual insights",
    description: "Transform raw datasets into useful insights through cleaning, analysis, and visualization.",
    icon: BarChart2,
    accent: "#f59e0b",
    capabilities: [
      "Data preprocessing & exploratory analysis",
      "SQL query formulation & relational modeling",
      "Python Pandas & NumPy analytics pipelines",
      "Data visualization & interactive dashboard charts",
      "Reporting, metric tracking & quantitative insights",
    ],
    ctaText: "Discuss a Data Project",
  },
];

export default function ServicesSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleSelectService = (serviceId: string, e: React.MouseEvent) => {
    soundFX.playSlash();
    window.dispatchEvent(
      new CustomEvent("katana-slash", {
        detail: { x: e.clientX, y: e.clientY },
      })
    );

    // Preselect service in inquiry form
    window.dispatchEvent(
      new CustomEvent("preselect-service", {
        detail: { service: serviceId },
      })
    );

    setTimeout(() => {
      const el = document.getElementById("inquiry");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  const toggleExpand = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedIndex(expandedIndex === idx ? null : idx);
    soundFX.playSakuraChime();
  };

  return (
    <section id="services" className="relative py-28 px-4 sm:px-6 border-t border-white/5 bg-[#08090E] overflow-hidden">
      {/* Background Japanese Watermark Accent */}
      <div className="absolute right-8 top-12 pointer-events-none opacity-5 text-9xl font-serif select-none hidden lg:block">
        役務
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-16">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ffb7c5] shadow-[0_0_8px_#ff2a6d]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#ffb7c5]">
              04 // CLIENT SERVICES • 技術役務
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            WHAT I CAN BUILD FOR YOU.
          </h2>
          <p className="text-foreground-muted text-sm sm:text-base max-w-2xl leading-relaxed mt-1">
            From the first idea to a working digital solution. Practical problem-solving, transparent scopes, and reliable craftsmanship.
          </p>
        </div>

        {/* 4 Interactive Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={service.id}
                data-katana="true"
                className="p-8 rounded-3xl bg-[#0E1118] border border-white/10 hover:border-[#ffb7c5]/40 transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden"
              >
                {/* Accent Corner Glow */}
                <div
                  className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-10 group-hover:opacity-25 transition-opacity duration-500"
                  style={{ backgroundColor: service.accent }}
                />

                <div className="flex flex-col gap-5">
                  {/* Card Top: Icon, Kanji & Number */}
                  <div className="flex items-center justify-between">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300"
                      style={{
                        backgroundColor: `${service.accent}15`,
                        borderColor: `${service.accent}30`,
                        color: service.accent,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-serif text-white/40 tracking-wider">
                        {service.kanji}
                      </span>
                      <span className="text-xs font-mono text-white/30">
                        0{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight group-hover:text-[#ffd1dc] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs font-mono text-[#00f0ff] mt-0.5 mb-2">
                      {service.tagline}
                    </p>
                    <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Expandable Capabilities List */}
                  <div className="pt-2">
                    <button
                      onClick={(e) => toggleExpand(index, e)}
                      className="text-xs font-mono text-white/70 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer mb-3"
                    >
                      <span>{isExpanded ? "Hide Specific Capabilities" : "View Specific Capabilities (5)"}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-[#ffb7c5] transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <ul className="flex flex-col gap-2 p-3 rounded-2xl bg-black/40 border border-white/5 animate-in fade-in duration-200">
                        {service.capabilities.map((cap) => (
                          <li key={cap} className="flex items-start gap-2 text-xs font-mono text-white/80">
                            <CheckCircle2
                              className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                              style={{ color: service.accent }}
                            />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Card Action CTA */}
                <div className="pt-6 border-t border-white/5 mt-4">
                  <button
                    onClick={(e) => handleSelectService(service.id, e)}
                    className="w-full py-3 rounded-full text-xs font-mono font-semibold tracking-wider text-white bg-white/5 hover:bg-white/15 border border-white/10 hover:border-[#ffb7c5]/50 transition-all flex items-center justify-center gap-2 group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#ffd1dc] group-hover:text-black group-hover:border-transparent shadow-md cursor-pointer"
                  >
                    <span>{service.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Client Conversion Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0E1118] via-[#121620] to-[#0E1118] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-wider flex items-center gap-1.5 justify-center sm:justify-start">
              <Sparkles className="w-3.5 h-3.5 text-[#ffb7c5]" />
              NEED A CUSTOM COMBINATION?
            </span>
            <h4 className="font-display font-bold text-lg text-white">
              Have a project that spans frontend, automation, and backend?
            </h4>
            <p className="text-xs text-foreground-muted max-w-lg">
              Let&apos;s map out your exact technical architecture, establish clear milestones, and deliver a tailored solution.
            </p>
          </div>
          <button
            onClick={(e) => handleSelectService("Other", e)}
            className="flex-shrink-0 px-6 py-3 rounded-full text-xs font-mono font-bold tracking-wider text-black bg-gradient-to-r from-[#ffd1dc] via-white to-[#00f0ff] hover:opacity-90 transition-all flex items-center gap-2 shadow-lg cursor-pointer"
          >
            <span>REQUEST CUSTOM ARCHITECTURE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
