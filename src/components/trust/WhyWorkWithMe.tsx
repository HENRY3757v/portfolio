"use client";

import React from "react";
import {
  MessageSquare,
  Smartphone,
  Wrench,
  Code2,
  Sparkles,
  FileCheck2,
  Check,
} from "lucide-react";

const PRINCIPLES = [
  {
    icon: MessageSquare,
    title: "Clear Communication",
    description: "Direct, honest updates without confusing technical jargon. You'll always know exactly where your project stands.",
    accent: "#00f0ff",
  },
  {
    icon: Smartphone,
    title: "Responsive & Modern Design",
    description: "Every interface is built mobile-first and tested rigorously across smartphones, tablets, and desktop displays.",
    accent: "#ffb7c5",
  },
  {
    icon: Wrench,
    title: "Practical Problem Solving",
    description: "I focus on delivering solutions that solve real business bottlenecks rather than adding unnecessary complexity.",
    accent: "#10b981",
  },
  {
    icon: Code2,
    title: "Maintainable & Clean Code",
    description: "Written in strongly-typed TypeScript and modular Python with clear documentation so anyone can scale it later.",
    accent: "#c084fc",
  },
  {
    icon: Sparkles,
    title: "Attention to User Experience",
    description: "Smooth micro-interactions, intuitive visual hierarchies, and fast load speeds that keep visitors engaged.",
    accent: "#f59e0b",
  },
  {
    icon: FileCheck2,
    title: "Transparent Project Scope",
    description: "Agreed milestones, clear deliverables, and upfront timeline estimates with zero hidden surprises.",
    accent: "#ff2a6d",
  },
];

export default function WhyWorkWithMe() {
  return (
    <section className="relative py-24 px-4 sm:px-6 border-t border-white/5 bg-[#06080F]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-16 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-[#ffb7c5]">
            05 // PROFESSIONAL CREDIBILITY • 信頼性
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            MORE THAN CODE. SOLUTIONS THAT MAKE SENSE.
          </h2>
          <p className="text-foreground-muted text-sm sm:text-base leading-relaxed mt-1">
            Building software is about understanding objectives, respecting deadlines, and delivering tools that genuinely work for your business.
          </p>
        </div>

        {/* 6 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRINCIPLES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-7 rounded-3xl bg-[#0C0F17] border border-white/5 hover:border-white/15 transition-all flex flex-col gap-4 group"
              >
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center border transition-colors"
                  style={{
                    backgroundColor: `${item.accent}15`,
                    borderColor: `${item.accent}30`,
                    color: item.accent,
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white mb-1.5 group-hover:text-[#ffd1dc] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
