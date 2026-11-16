"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle2,
  Copy,
  Check,
  Layers,
  Scale,
  Users,
  ShoppingBag,
  ShieldCheck,
  Receipt,
  Truck,
  Database,
  Server,
  Zap,
  Globe,
  Code2,
  AlertTriangle,
  Info,
} from "lucide-react";

export default function ShopEaseCaseStudy() {
  const project = projectsData[0];
  const [activeTab, setActiveTab] = useState<"overview" | "features" | "architecture" | "code" | "demo">("overview");
  const [selectedNode, setSelectedNode] = useState<string>("client");
  const [copiedCodeKey, setCopiedCodeKey] = useState<string | null>(null);

  const handleCopyCode = (code: string, key: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCodeKey(key);
      setTimeout(() => setCopiedCodeKey(null), 2500);
    });
  };

  const currentNode = project.architecture.nodes.find((n) => n.id === selectedNode) || project.architecture.nodes[0];

  return (
    <div className="min-h-screen bg-[#07080B] text-foreground pt-24 pb-24">
      {/* Top Breadcrumb Navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-foreground-dim hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO SHOWROOM</span>
        </Link>
      </div>

      {/* Hero / Section A: Project Introduction */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-identity-developer" />
          <span className="text-xs font-mono uppercase tracking-widest text-identity-developer">
            01 // FLAGSHIP ENGINEERING CASE STUDY
          </span>
        </div>

        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight mb-2">
          {project.title}
        </h1>
        <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground-muted mb-6">
          COMMERCE, REIMAGINED THROUGH ENGINEERING.
        </h2>

        <p className="text-foreground-muted text-sm sm:text-base max-w-3xl leading-relaxed mb-8">
          {project.longDescription}
        </p>

        {/* Project Meta Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#0E1117] border border-white/10 mb-10 text-xs font-mono">
          <div>
            <span className="text-foreground-dim uppercase block text-[10px]">Development Role</span>
            <span className="text-white font-medium">Lead Full-Stack Engineer</span>
          </div>
          <div>
            <span className="text-foreground-dim uppercase block text-[10px]">Platform Category</span>
            <span className="text-white font-medium">E-Commerce / Social Commerce</span>
          </div>
          <div>
            <span className="text-foreground-dim uppercase block text-[10px]">Database Persistence</span>
            <span className="text-identity-builder font-medium">Supabase PostgreSQL</span>
          </div>
          <div>
            <span className="text-foreground-dim uppercase block text-[10px]">Live Production</span>
            <span className="text-identity-developer font-medium">Vercel Edge Global</span>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-white text-black font-mono font-bold text-xs tracking-wider hover:bg-gray-200 transition-all flex items-center gap-2 shadow-lg"
            >
              <span>VIEW LIVE DEPLOYMENT</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono font-semibold text-xs tracking-wider transition-all flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            <span>SOURCE CODE ON GITHUB</span>
          </a>
        </div>

        {/* Large Browser Mockup */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
          <div className="h-8 px-4 bg-[#141822] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>
            <span className="text-xs font-mono text-foreground-dim">
              https://theshopease-five.vercel.app/
            </span>
            <div className="w-10" />
          </div>

          <div className="relative w-full h-[calc(100%-32px)]">
            <Image
              src={project.heroImage}
              alt="ShopEase Screenshot"
              fill
              priority
              className="object-cover object-top"
            />
            {/* Fallback presentation banner */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-tr from-black via-gray-950 to-blue-950/50 text-center">
              <span className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                SHOPEASE
              </span>
              <span className="text-xs font-mono text-identity-developer mt-2">
                Live React 19 Client with Real Supabase PostgreSQL Integration
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Case Study Interactive Navigation Tabs */}
      <div className="sticky top-16 z-40 bg-[#07080B]/90 backdrop-blur-xl border-y border-white/10 py-3 mb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {(["overview", "features", "architecture", "code", "demo"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all uppercase whitespace-nowrap ${
                activeTab === tab
                  ? "bg-white text-black font-semibold shadow-md"
                  : "text-foreground-muted hover:text-white hover:bg-white/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-24">
        {/* TAB 1: OVERVIEW (Problem & Solution) */}
        {(activeTab === "overview" || activeTab === "demo") && (
          <section className="space-y-16">
            {/* Problem Section */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                <span className="text-xs font-mono uppercase tracking-widest text-red-400">
                  SECTION B // THE PRODUCT CHALLENGE
                </span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">
                {project.problem.title}
              </h3>
              <p className="text-xs sm:text-sm text-foreground-muted max-w-2xl leading-relaxed mb-8">
                {project.problem.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.problem.points.map((point) => (
                  <div key={point.title} className="p-5 rounded-2xl bg-[#0F1218] border border-white/5 flex flex-col gap-2">
                    <h4 className="text-xs font-mono font-semibold text-white tracking-wide">
                      {point.title}
                    </h4>
                    <p className="text-xs text-foreground-muted leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Solution Section */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-identity-builder" />
                <span className="text-xs font-mono uppercase tracking-widest text-identity-builder">
                  SECTION C // THE ARCHITECTURAL SOLUTION
                </span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">
                {project.solution.title}
              </h3>
              <p className="text-xs sm:text-sm text-foreground-muted max-w-2xl leading-relaxed mb-8">
                {project.solution.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {project.solution.pillars.map((pillar) => (
                  <div key={pillar.title} className="p-5 rounded-2xl bg-[#10141D] border border-white/5 flex flex-col gap-2.5">
                    <span className="text-xs font-mono font-bold text-identity-developer uppercase">
                      {pillar.title}
                    </span>
                    <p className="text-xs text-foreground-muted leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TAB 2: FEATURES (6 Real Features with verified notes) */}
        {(activeTab === "features" || activeTab === "overview") && (
          <section className="space-y-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-identity-developer" />
                <span className="text-xs font-mono uppercase tracking-widest text-identity-developer">
                  FEATURE SHOWCASE // VERIFIED REPOSITORY CAPABILITIES
                </span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                Six Pillars of the ShopEase Interface
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.features.map((feature, fIdx) => (
                <div
                  key={feature.id}
                  className="p-7 rounded-3xl bg-[#0D1016] border border-white/10 flex flex-col justify-between shadow-xl"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs font-mono text-foreground-dim">
                      <span>FEATURE 0{fIdx + 1}</span>
                      <span className="text-identity-developer font-semibold">{feature.tagline}</span>
                    </div>

                    <h4 className="font-display font-bold text-xl text-white">
                      {feature.title}
                    </h4>

                    <p className="text-xs text-foreground-muted leading-relaxed">
                      {feature.description}
                    </p>

                    <div className="pt-3 border-t border-white/5 flex flex-col gap-1.5">
                      {feature.technicalDetails.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-xs text-foreground-muted">
                          <CheckCircle2 className="w-3.5 h-3.5 text-identity-builder mt-0.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {feature.simulatedNote && (
                    <div className="mt-5 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-[11px] text-yellow-300/90 flex items-start gap-2">
                      <Info className="w-3.5 h-3.5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>{feature.simulatedNote}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB 3: SYSTEM ARCHITECTURE (Interactive Nodes & Flow) */}
        {(activeTab === "architecture" || activeTab === "overview") && (
          <section className="space-y-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-identity-builder" />
                <span className="text-xs font-mono uppercase tracking-widest text-identity-builder">
                  SYSTEM ARCHITECTURE // INTERACTIVE DIAGRAM
                </span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">
                How ShopEase Operates in Production
              </h3>
              <p className="text-xs sm:text-sm text-foreground-muted max-w-2xl leading-relaxed">
                Click any component node below to inspect its responsibilities, implementation rationale, and exact source file locations.
              </p>
            </div>

            {/* Interactive Architecture Flow Diagram */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 p-3 rounded-2xl bg-[#0B0D12] border border-white/10">
              {project.architecture.nodes.map((node) => {
                const isSelected = selectedNode === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node.id)}
                    className={`p-3.5 rounded-xl text-left transition-all flex flex-col gap-1.5 border ${
                      isSelected
                        ? "bg-white/10 border-identity-developer text-white shadow-lg"
                        : "bg-white/[0.02] border-white/5 text-foreground-dim hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="text-[10px] font-mono uppercase truncate opacity-70">
                      {node.category}
                    </span>
                    <strong className="text-xs font-display font-bold text-white truncate">
                      {node.name}
                    </strong>
                    <span className="text-[9px] font-mono text-identity-developer truncate">
                      {node.tech.split("+")[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Node Deep Dive Inspector */}
            <div className="p-7 rounded-3xl bg-[#0E1117] border border-white/10 flex flex-col gap-4 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-identity-developer">
                    {currentNode.category}
                  </span>
                  <h4 className="font-display font-bold text-xl text-white">
                    {currentNode.name}
                  </h4>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-white">
                  {currentNode.tech}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                {currentNode.role}
              </p>

              {/* Verified Source Files */}
              <div className="pt-2">
                <span className="text-[10px] font-mono uppercase text-foreground-dim block mb-1.5">
                  Actual Source Files in Repository:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentNode.files.map((file) => (
                    <span
                      key={file}
                      className="px-2.5 py-1 rounded text-xs font-mono bg-black/60 border border-white/10 text-identity-builder"
                    >
                      {file}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Verified API Endpoints Reference */}
            <div>
              <h4 className="font-display font-bold text-xl text-white mb-4">
                Documented REST API Endpoints Reference
              </h4>
              <div className="divide-y divide-white/5 border border-white/10 rounded-2xl bg-[#0B0D12] overflow-hidden text-xs font-mono">
                {project.apiEndpoints.map((endpoint) => (
                  <div key={endpoint.path} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          endpoint.method === "GET"
                            ? "bg-identity-developer/20 text-identity-developer border border-identity-developer/30"
                            : "bg-identity-builder/20 text-identity-builder border border-identity-builder/30"
                        }`}
                      >
                        {endpoint.method}
                      </span>
                      <code className="text-white font-semibold">{endpoint.path}</code>
                    </div>
                    <span className="text-foreground-muted text-[11px] sm:text-right">
                      {endpoint.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TAB 4: CODE (Behind the Interface) */}
        {(activeTab === "code" || activeTab === "overview") && (
          <section className="space-y-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-identity-creator" />
                <span className="text-xs font-mono uppercase tracking-widest text-identity-creator">
                  ENGINEERING DEEP DIVE // BEHIND THE INTERFACE
                </span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                Real Code Excerpts from ShopEase
              </h3>
            </div>

            <div className="space-y-6">
              {/* Frontend Code Block */}
              <div className="rounded-2xl bg-[#090B0E] border border-white/10 overflow-hidden shadow-xl">
                <div className="px-4 py-3 bg-[#11141C] border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-identity-developer" />
                    <span className="text-xs font-mono font-semibold text-white">
                      {project.engineeringDeepDive.frontend.title}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(project.engineeringDeepDive.frontend.code, "frontend")}
                    className="flex items-center gap-1 text-[11px] font-mono text-foreground-dim hover:text-white"
                  >
                    {copiedCodeKey === "frontend" ? <Check className="w-3.5 h-3.5 text-identity-builder" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCodeKey === "frontend" ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <div className="p-4 text-xs font-mono bg-black/40 text-foreground-muted leading-relaxed overflow-x-auto">
                  <pre>{project.engineeringDeepDive.frontend.code}</pre>
                </div>
              </div>

              {/* Backend Code Block */}
              <div className="rounded-2xl bg-[#090B0E] border border-white/10 overflow-hidden shadow-xl">
                <div className="px-4 py-3 bg-[#11141C] border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-identity-builder" />
                    <span className="text-xs font-mono font-semibold text-white">
                      {project.engineeringDeepDive.backend.title}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(project.engineeringDeepDive.backend.code, "backend")}
                    className="flex items-center gap-1 text-[11px] font-mono text-foreground-dim hover:text-white"
                  >
                    {copiedCodeKey === "backend" ? <Check className="w-3.5 h-3.5 text-identity-builder" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCodeKey === "backend" ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <div className="p-4 text-xs font-mono bg-black/40 text-foreground-muted leading-relaxed overflow-x-auto">
                  <pre>{project.engineeringDeepDive.backend.code}</pre>
                </div>
              </div>

              {/* Database Schema Code Block */}
              <div className="rounded-2xl bg-[#090B0E] border border-white/10 overflow-hidden shadow-xl">
                <div className="px-4 py-3 bg-[#11141C] border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-identity-designer" />
                    <span className="text-xs font-mono font-semibold text-white">
                      {project.engineeringDeepDive.database.title}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(project.engineeringDeepDive.database.code, "database")}
                    className="flex items-center gap-1 text-[11px] font-mono text-foreground-dim hover:text-white"
                  >
                    {copiedCodeKey === "database" ? <Check className="w-3.5 h-3.5 text-identity-builder" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCodeKey === "database" ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <div className="p-4 text-xs font-mono bg-black/40 text-foreground-muted leading-relaxed overflow-x-auto">
                  <pre>{project.engineeringDeepDive.database.code}</pre>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 5: DEMO / LIVE NAVIGATION */}
        {(activeTab === "demo" || activeTab === "overview") && (
          <section className="p-10 rounded-3xl bg-gradient-to-tr from-[#0F1420] to-[#0A0D14] border border-white/15 flex flex-col items-center text-center gap-6 shadow-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-identity-developer">
              EXPERIENCE THE LIVE SYSTEM
            </span>
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              Ready to Explore ShopEase in Action?
            </h3>
            <p className="text-xs sm:text-sm text-foreground-muted max-w-xl leading-relaxed">
              Browse 2,400+ authentic Indian market items, test the 3-way specification comparison dock, simulate Dosti Deal WhatsApp discounts, and inspect the delivery sequence.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full bg-white text-black font-mono font-bold text-xs tracking-wider hover:bg-gray-200 transition-all flex items-center gap-2 shadow-xl"
              >
                <span>LAUNCH THE LIVE WEB APP</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono font-semibold text-xs tracking-wider transition-all flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>INSPECT REPOSITORY</span>
              </a>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
