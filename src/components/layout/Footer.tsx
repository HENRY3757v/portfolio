import React from "react";
import Link from "next/link";
import { profileData } from "@/data/profile";
import { ArrowUp, Github, Linkedin, Mail, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-[#07080A] pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <Link href="/#hero" className="font-display font-bold text-lg tracking-wider text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-identity-developer" />
              <span>SUVRADIP DEY</span>
            </Link>
            <p className="text-foreground-muted text-sm max-w-md leading-relaxed">
              Creative Developer, Engineer & Designer based in Kolkata. Transforming complex architectural requirements into intuitive, verified digital experiences.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a
                href={profileData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-foreground-muted hover:text-white hover:border-white/30 transition-all"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profileData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-foreground-muted hover:text-white hover:border-white/30 transition-all"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profileData.contact.email}`}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-foreground-muted hover:text-white hover:border-white/30 transition-all"
                aria-label="Email Me"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-foreground-dim mb-2">Sections</span>
            <Link href="/#about" className="text-sm text-foreground-muted hover:text-white transition-colors">About Identity</Link>
            <Link href="/#expertise" className="text-sm text-foreground-muted hover:text-white transition-colors">Expertise Dashboard</Link>
            <Link href="/#projects" className="text-sm text-foreground-muted hover:text-white transition-colors">Selected Projects</Link>
            <Link href="/projects/shopease" className="text-sm text-identity-developer hover:underline transition-colors">ShopEase Case Study</Link>
            <Link href="/#services" className="text-sm text-foreground-muted hover:text-white transition-colors">Services Offered</Link>
            <Link href="/#journey" className="text-sm text-foreground-muted hover:text-white transition-colors">Personal Journey</Link>
          </div>

          {/* Verification & Admin */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-foreground-dim mb-2">System</span>
            <div className="flex items-center gap-1.5 text-xs text-identity-builder">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Facts & Code</span>
            </div>
            <p className="text-xs text-foreground-dim leading-relaxed">
              All listed claims are backed by verifiable GitHub commits and actual repository sources.
            </p>
            <Link
              href="/admin"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-mono text-foreground-muted hover:text-white transition-colors border border-white/5 rounded-md px-2.5 py-1.5 bg-white/[0.02]"
            >
              <span>Private Admin</span>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-foreground-dim">
          <p>© {new Date().getFullYear()} Suvradip Dey. Designed with intention. Built with Next.js & React 19.</p>
          <a
            href="#hero"
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
