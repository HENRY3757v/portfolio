"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Command, Search, ExternalLink, Download, FileText, X, ArrowRight } from "lucide-react";
import { profileData } from "@/data/profile";

interface CommandItem {
  id: string;
  category: string;
  title: string;
  shortcut?: string;
  action: () => void;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };

    const handleCustomToggle = () => setOpen((prev) => !prev);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("toggle-command-palette", handleCustomToggle);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("toggle-command-palette", handleCustomToggle);
    };
  }, []);

  const commands: CommandItem[] = [
    {
      id: "shopease-case-study",
      category: "Case Studies",
      title: "View ShopEase Flagship Case Study",
      action: () => router.push("/projects/shopease"),
    },
    {
      id: "shopease-live",
      category: "Live Deployment",
      title: "Open ShopEase Live Demo (theshopease-five.vercel.app)",
      action: () => window.open("https://theshopease-five.vercel.app/", "_blank"),
    },
    {
      id: "go-hero",
      category: "Navigation",
      title: "Go to Home / Hero",
      action: () => router.push("/#hero"),
    },
    {
      id: "go-about",
      category: "Navigation",
      title: "Go to About Me",
      action: () => router.push("/#about"),
    },
    {
      id: "go-expertise",
      category: "Navigation",
      title: "Go to Expertise Dashboard",
      action: () => router.push("/#expertise"),
    },
    {
      id: "go-projects",
      category: "Navigation",
      title: "Go to Selected Work",
      action: () => router.push("/#projects"),
    },
    {
      id: "go-services",
      category: "Navigation",
      title: "Go to Professional Services",
      action: () => router.push("/#services"),
    },
    {
      id: "go-journey",
      category: "Navigation",
      title: "Go to Career Timeline",
      action: () => router.push("/#journey"),
    },
    {
      id: "go-contact",
      category: "Navigation",
      title: "Contact / Inquire",
      action: () => router.push("/#contact"),
    },
    {
      id: "download-resume",
      category: "Actions",
      title: "Download Resume / CV (PDF)",
      action: () => {
        window.open(profileData.contact.resumeUrl, "_blank");
      },
    },
    {
      id: "github",
      category: "External",
      title: "Visit GitHub Profile (github.com/HENRY3757v)",
      action: () => window.open(profileData.contact.github, "_blank"),
    },
    {
      id: "admin",
      category: "System",
      title: "Access Private Content Dashboard (/admin)",
      action: () => router.push("/admin"),
    },
  ];

  const filtered = commands.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-md">
      <div
        className="relative w-full max-w-xl bg-[#0D0F14] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-white/[0.02]">
          <Search className="w-5 h-5 text-foreground-muted" />
          <input
            type="text"
            placeholder="Type a command or search sections..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-white placeholder-foreground-dim focus:outline-none font-sans"
          />
          <button
            onClick={() => setOpen(false)}
            className="p-1 text-foreground-dim hover:text-white rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-white/5">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-foreground-dim font-mono">
              No matching commands found.
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  item.action();
                  setOpen(false);
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-left text-xs hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/5 text-foreground-dim">
                    {item.category}
                  </span>
                  <span className="text-foreground group-hover:text-white font-medium">
                    {item.title}
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-foreground-dim group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </button>
            ))
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-4 py-2 bg-white/[0.01] border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-foreground-dim">
          <span>Navigation Shortcuts</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}
