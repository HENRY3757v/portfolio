"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { profileData } from "@/data/profile";
import { ArrowLeft, Command, Download, Menu, X, Sparkles } from "lucide-react";

interface ShowcaseHeaderProps {
  onBackToFront: () => void;
  activeSection?: string;
}

const NAV_ITEMS = [
  { label: "ABOUT", href: "#about" },
  { label: "EXPERTISE", href: "#expertise" },
  { label: "PROJECTS", href: "#projects" },
  { label: "SERVICES", href: "#services" },
  { label: "JOURNEY", href: "#journey" },
  { label: "CONTACT", href: "#contact" },
];

export default function ShowcaseHeader({ onBackToFront, activeSection = "about" }: ShowcaseHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openCommandPalette = () => {
    window.dispatchEvent(new CustomEvent("toggle-command-palette"));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-3 pointer-events-none">
      <nav
        className={`pointer-events-auto transition-all duration-300 rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 max-w-5xl w-full ${
          scrolled
            ? "bg-[#0A0C14]/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80"
            : "bg-[#0A0C14]/70 backdrop-blur-md border border-white/10"
        }`}
      >
        {/* Left: Back to Front Face Toggle Button */}
        <button
          onClick={onBackToFront}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#05d9e8] hover:text-white transition-all group cursor-pointer"
          title="Return to Front Face view"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span className="font-semibold tracking-wider">FRONT FACE</span>
        </button>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-xs font-mono tracking-wider transition-colors duration-200 ${
                activeSection === item.href.slice(1)
                  ? "text-[#05d9e8] font-bold"
                  : "text-[#8E929E] hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Resume Download */}
          <a
            href={profileData.contact.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium text-white/90 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <Download className="w-3 h-3 text-[#ff2a6d]" />
            <span>RESUME</span>
          </a>

          {/* Quick Contact CTA */}
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold text-black bg-[#05d9e8] hover:bg-[#05d9e8]/90 transition-all shadow-md shadow-[#05d9e8]/20"
          >
            <span>LET&apos;S TALK</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/5"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="pointer-events-auto absolute top-16 inset-x-4 bg-[#0A0C14]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl md:hidden flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <button
            onClick={() => {
              setMobileOpen(false);
              onBackToFront();
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 text-sm font-mono text-[#05d9e8]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO FRONT FACE</span>
          </button>
          <div className="h-px bg-white/10" />
          <div className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-mono tracking-wider text-muted hover:text-white py-1 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="pt-2 flex flex-col gap-2 border-t border-white/10">
            <a
              href={profileData.contact.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium text-white bg-white/5 border border-white/10"
            >
              <Download className="w-3.5 h-3.5 text-[#ff2a6d]" />
              DOWNLOAD RESUME
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
