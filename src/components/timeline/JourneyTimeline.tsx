import React from "react";
import { timelineData } from "@/data/timeline";
import { GraduationCap, Award, Code2, Compass, ArrowUpRight } from "lucide-react";

const CATEGORY_STYLES = {
  Education: {
    icon: GraduationCap,
    badge: "text-identity-developer bg-identity-developer/10 border-identity-developer/20",
  },
  Project: {
    icon: Code2,
    badge: "text-identity-builder bg-identity-builder/10 border-identity-builder/20",
  },
  Milestone: {
    icon: Award,
    badge: "text-identity-designer bg-identity-designer/10 border-identity-designer/20",
  },
  Ambition: {
    icon: Compass,
    badge: "text-identity-explorer bg-identity-explorer/10 border-identity-explorer/20",
  },
};

export default function JourneyTimeline() {
  return (
    <section id="journey" className="relative py-28 px-4 sm:px-6 border-t border-white/5 bg-[#080A0D]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-16">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-identity-explorer" />
            <span className="text-xs font-mono uppercase tracking-widest text-identity-explorer">
              05 // CHRONOLOGICAL EVOLUTION
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            MY JOURNEY
          </h2>
          <p className="text-foreground-muted text-sm sm:text-base max-w-2xl leading-relaxed mt-1">
            Verified milestones tracing the path from core algorithmic thinking to full-stack engineering and cloud architectures.
          </p>
        </div>

        {/* Timeline Stream */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {timelineData.map((item, index) => {
            const style = CATEGORY_STYLES[item.category] || CATEGORY_STYLES.Milestone;
            const Icon = style.icon;

            return (
              <div key={index} className="relative group">
                {/* Node Orb on Connecting Line */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-7 h-7 rounded-full bg-[#0E1117] border border-white/20 group-hover:border-white/50 flex items-center justify-center transition-all group-hover:scale-110 shadow-md">
                  <Icon className="w-3.5 h-3.5 text-white" />
                </div>

                {/* Timeline Card */}
                <div className="p-6 rounded-2xl bg-[#0F1219] border border-white/5 hover:border-white/15 transition-all flex flex-col gap-3 shadow-lg">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-white px-2.5 py-0.5 rounded bg-white/5 border border-white/10">
                      {item.year}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${style.badge}`}>
                      {item.category.toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      {item.title}
                    </h3>
                    <span className="text-xs font-mono text-foreground-dim block mt-0.5">
                      {item.institutionOrContext}
                    </span>
                  </div>

                  <p className="text-xs text-foreground-muted leading-relaxed">
                    {item.description}
                  </p>

                  {/* Skills Tag Row */}
                  <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1.5 mt-1">
                    {item.skillsUsed.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-mono text-foreground-dim px-2 py-0.5 rounded bg-white/[0.02]"
                      >
                        #{skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
