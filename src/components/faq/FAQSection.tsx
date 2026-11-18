"use client";

import React, { useState } from "react";
import { soundFX } from "@/utils/soundEffects";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: "What types of projects do you work on?",
    a: "I work on modern frontend websites (portfolio showcases, landing pages, business web applications using React & Next.js), Python automation utilities (data cleaning, CSV/Excel batch processing, file automation), and backend web APIs with Python Flask, PostgreSQL, and MySQL.",
  },
  {
    q: "Can you build a website for my small business?",
    a: "Yes. I build fast, fully responsive, and SEO-friendly websites tailored to your business needs, brand colors, and target audience. From initial design to production deployment on platforms like Vercel or Netlify with custom domain configuration.",
  },
  {
    q: "Can you automate repetitive tasks using Python?",
    a: "Absolutely. If you or your team spend hours manually copy-pasting data between spreadsheets, downloading reports, scraping permitted datasets, or cleaning unstructured files, I can build custom Python scripts that turn those tasks into one-click automated routines.",
  },
  {
    q: "How does the project development process work?",
    a: "The process begins with an initial inquiry and requirement alignment, followed by a detailed scope and architecture proposal. Once agreed upon, I build in iterative milestones, providing you with preview links to test before final testing, deployment, and code handover.",
  },
  {
    q: "How do I receive a project estimate?",
    a: "Simply fill out the project inquiry form below with your project goals, desired features, timeline, and estimated budget range. I will review the technical requirements and get back to you with a transparent scope and estimate.",
  },
  {
    q: "Can we discuss requirements before starting?",
    a: "Yes! Clear communication before writing code is essential. We can discuss your requirements directly via email or on WhatsApp to clarify technical choices, timelines, and deliverables before any commitment.",
  },
  {
    q: "Do you provide post-launch support?",
    a: "Yes. I provide a post-launch warranty period to fix any unexpected bugs or edge-case layout issues, along with documentation on how to update content or manage your code. Extended maintenance arrangements are also available.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    soundFX.playSakuraChime();
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 border-t border-white/5 bg-[#07080E] overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-14 text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-[#ffb7c5]">
            06 // QUESTIONS &amp; ANSWERS • 質疑応答
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            FREQUENTLY ASKED QUESTIONS.
          </h2>
          <p className="text-foreground-muted text-xs sm:text-sm max-w-xl mx-auto leading-relaxed mt-1">
            Common questions about technical scope, collaboration timelines, and working together.
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                data-katana="true"
                className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                  isOpen
                    ? "bg-[#0E121B] border-[#ffb7c5]/30 shadow-lg"
                    : "bg-[#0A0C13] border-white/5 hover:border-white/15"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-display font-semibold text-sm sm:text-base text-white/90 hover:text-white">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border transition-transform duration-300 ${
                      isOpen
                        ? "bg-[#ffb7c5]/20 border-[#ffb7c5]/40 text-[#ffb7c5] rotate-180"
                        : "bg-white/5 border-white/10 text-white/40"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-foreground-muted leading-relaxed border-t border-white/5 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
