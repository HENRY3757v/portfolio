"use client";

import React from "react";
import { soundFX } from "@/utils/soundEffects";
import { CheckCircle2, ArrowRight, ShieldCheck, Clock, FileText, RefreshCw } from "lucide-react";

export default function PricingPhilosophy() {
  const handleScrollToInquiry = (e: React.MouseEvent) => {
    soundFX.playSlash();
    window.dispatchEvent(
      new CustomEvent("katana-slash", {
        detail: { x: e.clientX, y: e.clientY },
      })
    );
    setTimeout(() => {
      const el = document.getElementById("inquiry");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 border-t border-white/5 bg-[#080A12] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-br from-[#0F131D] via-[#0C0F17] to-[#0A0C14] border border-white/10 p-8 sm:p-12 shadow-2xl relative">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#ff2a6d]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00f0ff] mb-2 block">
              TRANSPARENT ENGAGEMENT • 料金方針
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight mb-4">
              EVERY PROJECT IS DIFFERENT. LET&apos;S FIND THE RIGHT SOLUTION.
            </h2>
            <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed mb-8">
              Rather than forcing your requirements into generic one-size-fits-all packages, every engagement is tailored around your specific technical scope, target timeline, and practical business goals.
            </p>

            {/* 4 Pillars of Project Pricing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <FileText className="w-4 h-4 text-[#00f0ff] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-mono font-bold text-white mb-0.5">Scope-Based Estimates</h4>
                  <p className="text-[11px] text-foreground-muted leading-relaxed">
                    Pricing tailored specifically to the complexity, pages, or automation logic needed. Zero arbitrary markups.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <Clock className="w-4 h-4 text-[#ffb7c5] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-mono font-bold text-white mb-0.5">Agreed Timelines &amp; Milestones</h4>
                  <p className="text-[11px] text-foreground-muted leading-relaxed">
                    Clear stage-by-stage milestones from initial architecture draft to production launch.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <RefreshCw className="w-4 h-4 text-[#10b981] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-mono font-bold text-white mb-0.5">Flexible Revisions</h4>
                  <p className="text-[11px] text-foreground-muted leading-relaxed">
                    Iterative review rounds during development ensure the final deliverable matches your exact vision.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <ShieldCheck className="w-4 h-4 text-[#c084fc] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-mono font-bold text-white mb-0.5">Post-Launch Support</h4>
                  <p className="text-[11px] text-foreground-muted leading-relaxed">
                    Deployment walkthroughs, repository handover, and optional ongoing maintenance support.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleScrollToInquiry}
              className="px-6 py-3 rounded-full text-xs font-mono font-bold tracking-wider text-black bg-gradient-to-r from-white via-[#ffd1dc] to-[#ffb7c5] hover:opacity-90 transition-all flex items-center gap-2 shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>REQUEST A PROJECT ESTIMATE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
