import React from "react";
import Link from "next/link";
import { servicesData } from "@/data/services";
import {
  Globe,
  Layout,
  Layers,
  Terminal,
  Database,
  BarChart2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Layout,
  Layers,
  Terminal,
  Database,
  BarChart2,
};

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-28 px-4 sm:px-6 border-t border-white/5 bg-[#090B0E]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-16">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-identity-designer" />
            <span className="text-xs font-mono uppercase tracking-widest text-identity-designer">
              04 // PROFESSIONAL SERVICES
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            WHAT CAN I BUILD FOR YOU?
          </h2>
          <p className="text-foreground-muted text-sm sm:text-base max-w-2xl leading-relaxed mt-1">
            &ldquo;From the first sketch to the final deployment.&rdquo; End-to-end engineering, interface design, and data integrations.
          </p>
        </div>

        {/* Services 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => {
            const Icon = ICON_MAP[service.icon] || Globe;
            return (
              <div
                key={service.id}
                className="p-7 rounded-3xl bg-[#10131A] border border-white/5 hover:border-white/20 transition-all flex flex-col justify-between group hover:-translate-y-1 shadow-lg"
              >
                <div className="flex flex-col gap-4">
                  {/* Service Header: Icon & Number */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:border-identity-developer transition-colors">
                      <Icon className="w-5 h-5 text-identity-developer" />
                    </div>
                    <span className="text-xs font-mono text-foreground-dim">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title & Explanation */}
                  <div>
                    <h3 className="font-display font-bold text-xl text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-xs text-foreground-muted leading-relaxed">
                      {service.explanation}
                    </p>
                  </div>

                  {/* Typical Deliverables */}
                  <div className="pt-3 border-t border-white/5 flex flex-col gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-foreground-dim">
                      Typical Deliverables
                    </span>
                    <ul className="space-y-1.5">
                      {service.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2 text-xs text-foreground-muted">
                          <CheckCircle2 className="w-3.5 h-3.5 text-identity-builder mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer: Tech badges & Inquire CTA */}
                <div className="mt-6 pt-4 border-t border-white/5 flex flex-col gap-3">
                  <div className="flex flex-wrap gap-1">
                    {service.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] text-foreground-dim"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/#contact?service=${encodeURIComponent(service.title)}`}
                    className="inline-flex items-center justify-between text-xs font-mono font-semibold text-identity-developer hover:text-white transition-colors group/link pt-1"
                  >
                    <span>Inquire About This Service</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
