import React from "react";
import Image from "next/image";
import { profileData } from "@/data/profile";
import {
  GraduationCap,
  MapPin,
  FileText,
  Compass,
  Cpu,
  Database,
  Code2,
  CheckCircle2,
  Download,
  Sparkles,
} from "lucide-react";

export default function AboutSection() {
  const pillars = [
    {
      title: "Frontend Engineering & Systems",
      desc: "Creating high-performance, responsive React web applications with fluid state synchronization and accessibility standards.",
      icon: Code2,
      accent: "text-identity-developer",
    },
    {
      title: "Backend & Relational Persistence",
      desc: "Designing secure REST APIs, parameterized SQL queries, and connection poolers in PostgreSQL and Supabase.",
      icon: Database,
      accent: "text-identity-builder",
    },
    {
      title: "Digital Strategy & Core Web Vitals",
      desc: "Pairing clean engineering with technical SEO, page speed tuning, and user conversion principles so platforms excel.",
      icon: Compass,
      accent: "text-identity-designer",
    },
    {
      title: "AI & Emerging Technologies",
      desc: "Undergraduate exploration at BBIT in machine learning fundamentals, algorithmic problem-solving, and data pipelines.",
      icon: Cpu,
      accent: "text-identity-explorer",
    },
  ];

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 border-t border-white/5 bg-[#090B0E]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-16">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-identity-developer" />
            <span className="text-xs font-mono uppercase tracking-widest text-identity-developer">
              01 // BEYOND THE SCREEN
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            {profileData.headlines.aboutHeadline}
          </h2>
          <p className="text-foreground-muted text-sm sm:text-base max-w-2xl leading-relaxed mt-1">
            Bridging computer science rigor with modern interface craftsmanship.
          </p>
        </div>

        {/* Editorial Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Profile Card & Education */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-6 rounded-3xl bg-[#111318] border border-white/10 shadow-xl flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/10 bg-black flex-shrink-0">
                  <Image
                    src="/images/suvradip-portrait.jpg"
                    alt={profileData.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">{profileData.name}</h3>
                  <span className="text-xs font-mono text-foreground-dim block">{profileData.role}</span>
                  <div className="flex items-center gap-1.5 text-xs text-foreground-muted mt-1">
                    <MapPin className="w-3.5 h-3.5 text-identity-developer" />
                    <span>{profileData.location}</span>
                  </div>
                </div>
              </div>

              {/* Education Block */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs font-mono text-identity-builder">
                  <GraduationCap className="w-4 h-4" />
                  <span>FORMAL EDUCATION</span>
                </div>
                <strong className="text-sm font-semibold text-white">
                  {profileData.education.degree} ({profileData.education.major})
                </strong>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  {profileData.education.institution}
                  <br />
                  <span className="text-foreground-dim text-[11px]">{profileData.education.affiliation}</span>
                </p>
                <div className="flex items-center justify-between text-xs font-mono text-foreground-dim pt-2 border-t border-white/5 mt-1">
                  <span>TIMELINE: {profileData.education.years}</span>
                  <span className="text-white font-medium">CGPA: {profileData.education.cgpa}</span>
                </div>
              </div>

              {/* Verified Facts Badges */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-foreground-muted">
                  <CheckCircle2 className="w-3.5 h-3.5 text-identity-builder" />
                  <span>Full-Stack Flagship Deployed (ShopEase on Vercel)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-foreground-muted">
                  <CheckCircle2 className="w-3.5 h-3.5 text-identity-builder" />
                  <span>Relational Database Management (PostgreSQL & Supabase)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-foreground-muted">
                  <CheckCircle2 className="w-3.5 h-3.5 text-identity-builder" />
                  <span>Active GitHub Open-Source Commits</span>
                </div>
              </div>

              {/* Download Resume Action */}
              <a
                href={profileData.contact.resumeUrl}
                download="Suvradip_Dey_CV.pdf"
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <Download className="w-4 h-4 text-identity-developer" />
                <span>DOWNLOAD VERIFIED RESUME (PDF)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Pillars */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="space-y-4 text-foreground-muted text-sm sm:text-base leading-relaxed">
              <p className="text-white font-medium text-lg leading-snug">
                I believe modern software engineering shouldn&apos;t exist in a vacuum separated from real user emotion and business outcome.
              </p>
              <p>
                As a Computer Science & Artificial Intelligence engineering student at Budge Budge Institute of Technology in Kolkata, my daily work focuses on understanding how systems behave from the network socket all the way to the visual render tree.
              </p>
              <p>
                While many developers stop at writing isolated frontend components, I pair frontend engineering (React 19, Tailwind CSS v4, Next.js) with backend persistence (Node.js, Express, PostgreSQL) and technical SEO. This ensures that what I build isn&apos;t just functional in a development sandbox—it is fast, discoverable, and memorable in production.
              </p>
            </div>

            {/* Core Capability Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors flex flex-col gap-2.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                        <Icon className={`w-4 h-4 ${pillar.accent}`} />
                      </div>
                      <h4 className="text-xs font-mono font-semibold text-white tracking-wide">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-xs text-foreground-muted leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
