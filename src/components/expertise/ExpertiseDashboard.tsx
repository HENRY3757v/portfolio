"use client";

import React, { useState } from "react";
import Link from "next/link";
import { skillsData } from "@/data/skills";
import { SkillItem } from "@/types";
import {
  Code2,
  Server,
  Database,
  BarChart2,
  Layout,
  Compass,
  ArrowUpRight,
  CheckCircle,
  Clock,
  Sparkles,
} from "lucide-react";

const CATEGORIES = [
  { id: "All", label: "All Arsenal" },
  { id: "Frontend", label: "Frontend", icon: Code2 },
  { id: "Backend", label: "Backend", icon: Server },
  { id: "Databases", label: "Databases", icon: Database },
  { id: "Data & Analytics", label: "Data & Analytics", icon: BarChart2 },
  { id: "UI/UX", label: "UI / UX", icon: Layout },
  { id: "Exploration", label: "Exploration", icon: Compass },
];

export default function ExpertiseDashboard() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  const filteredSkills = selectedCategory === "All"
    ? skillsData
    : skillsData.filter((s) => s.category === selectedCategory);

  const getStatusBadge = (status: SkillItem["status"]) => {
    switch (status) {
      case "Experienced":
        return {
          label: "Experienced",
          color: "text-identity-builder bg-identity-builder/10 border-identity-builder/20",
          icon: CheckCircle,
        };
      case "Working knowledge":
        return {
          label: "Working Knowledge",
          color: "text-identity-developer bg-identity-developer/10 border-identity-developer/20",
          icon: Clock,
        };
      case "Currently learning":
        return {
          label: "Active Research",
          color: "text-identity-explorer bg-identity-explorer/10 border-identity-explorer/20",
          icon: Sparkles,
        };
    }
  };

  return (
    <section id="expertise" className="relative py-28 px-4 sm:px-6 border-t border-white/5 bg-[#08090B]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-12">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-identity-builder" />
            <span className="text-xs font-mono uppercase tracking-widest text-identity-builder">
              02 // EXPERTISE DASHBOARD
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            THE TECHNOLOGY BEHIND THE WORK
          </h2>
          <p className="text-foreground-muted text-sm sm:text-base max-w-2xl leading-relaxed mt-1">
            An engineering capability interface mapped directly to production codebases and real implementations.
          </p>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono whitespace-nowrap transition-all border ${
                  isActive
                    ? "bg-white text-black font-semibold border-white shadow-lg"
                    : "bg-white/[0.03] text-foreground-muted hover:text-white border-white/5 hover:border-white/20"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Capability Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => {
            const statusInfo = getStatusBadge(skill.status);
            const StatusIcon = statusInfo.icon;
            const isExpanded = expandedSkill === skill.name;

            return (
              <div
                key={skill.name}
                onClick={() => setExpandedSkill(isExpanded ? null : skill.name)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isExpanded
                    ? "bg-[#141822] border-white/25 shadow-xl"
                    : "bg-[#0F1117] border-white/5 hover:border-white/15 hover:bg-[#13161F]"
                }`}
              >
                <div className="flex flex-col gap-3">
                  {/* Card Header: Category & Status Badge */}
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-foreground-dim uppercase tracking-wider text-[10px]">
                      {skill.category}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusInfo.color}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      <span>{statusInfo.label}</span>
                    </span>
                  </div>

                  {/* Skill Title */}
                  <h3 className="font-display font-bold text-lg text-white">
                    {skill.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-foreground-muted leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                {/* Card Footer: Project Linkage */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                  {skill.projectLinked ? (
                    <Link
                      href={skill.projectUrl || "/#projects"}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-identity-developer hover:underline font-semibold"
                    >
                      <span>Demo in {skill.projectLinked}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  ) : (
                    <span className="text-foreground-dim">Foundational Capability</span>
                  )}
                  <span className="text-foreground-dim text-[10px]">
                    {isExpanded ? "[Click to collapse]" : "[Details]"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dashboard Integrity Statement */}
        <div className="mt-10 p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-foreground-dim">
          <span>Zero meaningless percentages • Evaluated strictly through repository commits & functional output</span>
          <span className="text-identity-builder font-semibold">STATUS: VERIFIED SOURCE-LINKED</span>
        </div>
      </div>
    </section>
  );
}
