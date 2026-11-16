"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { profileData } from "@/data/profile";
import { Command, Download, Menu, X, ArrowUpRight } from "lucide-react";

const NAV_ITEMS = [
  { label: "HOME", href: "/#hero" },
  { label: "ABOUT", href: "/#about" },
  { label: "EXPERTISE", href: "/#expertise" },
  { label: "PROJECTS", href: "/#projects" },
  { label: "SERVICES", href: "/#services" },
  { label: "JOURNEY", href: "/#journey" },
  { label: "CONTACT", href: "/#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ["hero", "about", "expertise", "projects", "services", "journey", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openCommandPalette = () => {
    window.dispatchEvent(new CustomEvent("toggle-command-palette"));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-4 pointer-events-none">
      <nav
        className={`pointer-events-auto transition-all duration-300 rounded-full px-5 py-2.5 flex items-center justify-between gap-6 max-w-5xl w-full ${
          scrolled
            ? "bg-[#0E1015]/85 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80"
            : "bg-[#0E1015]/50 backdrop-blur-md border border-white/5"
        }`}
      >
        {/* Logo / Monogram */}
        <Link
          href="/#hero"
          className="font-display font-bold text-sm tracking-widest text-foreground hover:text-identity-developer transition-colors flex items-center gap-2 group"
        >
          <span className="w-2 h-2 rounded-full bg-identity-developer animate-pulse" />
          <span>SUVRADIP DEY</span>
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.replace("/#", "");
            const isActive = activeSection === sectionId;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative px-3 py-1.5 text-xs font-mono tracking-wider transition-colors rounded-full ${
                  isActive
                    ? "text-white font-medium bg-white/10"
                    : "text-foreground-muted hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Command Palette Trigger */}
          <button
            onClick={openCommandPalette}
            title="Open Command Palette (Cmd/Ctrl + K)"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-foreground-muted bg-white/5 hover:bg-white/10 hover:text-white rounded-md border border-white/5 transition-all"
          >
            <Command className="w-3 h-3" />
            <span>K</span>
          </button>

          {/* Resume Link */}
          <a
            href={profileData.contact.resumeUrl}
            download="Suvradip_Dey_CV.pdf"
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-foreground bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all"
          >
            <Download className="w-3 h-3 text-identity-developer" />
            <span>CV</span>
          </a>

          {/* Quick Contact CTA */}
          <Link
            href="/#contact"
            className="inline-flex items-center gap-1 px-3.5 py-1 text-xs font-semibold bg-white text-black hover:bg-gray-200 rounded-full transition-all shadow-sm"
          >
            <span>TALK</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1.5 text-foreground-muted hover:text-white rounded-md hover:bg-white/5"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="pointer-events-auto fixed inset-x-4 top-20 bg-[#0E1015]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 md:hidden z-50">
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-mono tracking-wider text-foreground-muted hover:text-white hover:bg-white/5 transition-all"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <a
              href={profileData.contact.resumeUrl}
              download="Suvradip_Dey_CV.pdf"
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium bg-white/5 border border-white/10 text-white"
            >
              <Download className="w-4 h-4 text-identity-developer" />
              <span>Download CV (PDF)</span>
            </a>
            <button
              onClick={() => {
                setMobileOpen(false);
                openCommandPalette();
              }}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-mono bg-white/5 border border-white/10 text-foreground-muted"
            >
              <Command className="w-4 h-4" />
              <span>Command Palette (⌘K)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
