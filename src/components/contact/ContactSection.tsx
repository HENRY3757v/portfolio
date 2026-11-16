"use client";

import React, { useState } from "react";
import { profileData } from "@/data/profile";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Download,
  Send,
  CheckCircle,
  AlertCircle,
  Copy,
  ArrowUpRight,
} from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Full-Stack Web Application",
    budget: "$500 – $1,500",
    message: "",
    honeypot: "", // anti-spam
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.contact.email).then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setFeedbackMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFeedbackMessage(data.message);
        setFormData({
          name: "",
          email: "",
          projectType: "Full-Stack Web Application",
          budget: "$500 – $1,500",
          message: "",
          honeypot: "",
        });
      } else {
        setStatus("error");
        setFeedbackMessage(data.error || "Unable to send message at this time.");
      }
    } catch (err) {
      setStatus("error");
      setFeedbackMessage("Network error. Please try again or email directly.");
    }
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 border-t border-white/5 bg-[#07080A]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-16">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-identity-creator" />
            <span className="text-xs font-mono uppercase tracking-widest text-identity-creator">
              06 // INITIATE COLLABORATION
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            {profileData.headlines.contactHeadline}
          </h2>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground-muted">
            {profileData.headlines.contactSubheadline}
          </h3>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Info Panel */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-8 rounded-3xl bg-[#0D1016] border border-white/10 flex flex-col gap-6 shadow-xl">
              <div>
                <h4 className="font-display font-bold text-xl text-white mb-2">
                  Let&apos;s Build Something Memorable
                </h4>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  Whether you have an upcoming full-stack platform, require custom frontend engineering, or want to discuss engineering roles, I respond within 24 hours.
                </p>
              </div>

              {/* Direct Info List */}
              <div className="space-y-3">
                {/* Email with copy button */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-identity-developer" />
                    <div>
                      <span className="text-[10px] font-mono text-foreground-dim uppercase block">Direct Email</span>
                      <a href={`mailto:${profileData.contact.email}`} className="text-xs text-white hover:underline font-mono">
                        {profileData.contact.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-md hover:bg-white/10 text-foreground-muted hover:text-white transition-colors"
                    title="Copy Email to Clipboard"
                  >
                    {copiedEmail ? <CheckCircle className="w-4 h-4 text-identity-builder" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                  <Phone className="w-4 h-4 text-identity-builder" />
                  <div>
                    <span className="text-[10px] font-mono text-foreground-dim uppercase block">Phone / WhatsApp</span>
                    <a href={`tel:${profileData.contact.phone}`} className="text-xs text-white hover:underline font-mono">
                      {profileData.contact.phone}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-identity-designer" />
                  <div>
                    <span className="text-[10px] font-mono text-foreground-dim uppercase block">Location</span>
                    <span className="text-xs text-white font-mono">{profileData.location}</span>
                  </div>
                </div>
              </div>

              {/* Verified Profiles */}
              <div className="pt-4 border-t border-white/5 flex flex-col gap-2">
                <span className="text-[10px] font-mono uppercase text-foreground-dim">Direct Profiles</span>
                <div className="flex items-center gap-3">
                  <a
                    href={profileData.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-2 text-xs font-mono text-white transition-all"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={profileData.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-2 text-xs font-mono text-white transition-all"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-identity-developer" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-8 sm:p-10 rounded-3xl bg-[#0D1016] border border-white/10 flex flex-col gap-5 shadow-2xl"
            >
              {/* Honeypot field (hidden from real users) */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-mono text-foreground-muted">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="e.g. Alex Johnson"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-foreground-dim text-xs font-sans focus:outline-none focus:border-identity-developer transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-mono text-foreground-muted">
                    Your Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-foreground-dim text-xs font-sans focus:outline-none focus:border-identity-developer transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Project Type */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="projectType" className="text-xs font-mono text-foreground-muted">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="px-4 py-3 rounded-xl bg-[#141720] border border-white/10 text-white text-xs font-sans focus:outline-none focus:border-identity-developer transition-colors"
                  >
                    <option value="Full-Stack Web Application">Full-Stack Web Application (React & PostgreSQL)</option>
                    <option value="Frontend Architecture">Frontend Web App (Next.js / Tailwind)</option>
                    <option value="E-Commerce Solution">E-Commerce Web Storefront</option>
                    <option value="Python Scripting & Automation">Python Scripting & Automation</option>
                    <option value="Technical SEO & Speed Audit">Technical SEO & Speed Optimization</option>
                    <option value="Engineering Role / Internship">Full-Time / Internship Opportunity</option>
                  </select>
                </div>

                {/* Budget Range (Optional) */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="budget" className="text-xs font-mono text-foreground-muted">
                    Budget Range (Optional)
                  </label>
                  <select
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="px-4 py-3 rounded-xl bg-[#141720] border border-white/10 text-white text-xs font-sans focus:outline-none focus:border-identity-developer transition-colors"
                  >
                    <option value="Under $500">&lt; $500 (Small sprint / Consultation)</option>
                    <option value="$500 – $1,500">$500 – $1,500 (Standard project build)</option>
                    <option value="$1,500 – $3,000">$1,500 – $3,000 (Complete full-stack platform)</option>
                    <option value="Enterprise / Salaried">Enterprise / Salaried Role</option>
                  </select>
                </div>
              </div>

              {/* Message Description */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-mono text-foreground-muted">
                  Project Description *
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Outline your project scope, core requirements, and timeline..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-foreground-dim text-xs font-sans focus:outline-none focus:border-identity-developer transition-colors"
                />
              </div>

              {/* Feedback Alert */}
              {status === "success" && (
                <div className="p-3.5 rounded-xl bg-identity-builder/10 border border-identity-builder/30 text-identity-builder text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{feedbackMessage}</span>
                </div>
              )}

              {status === "error" && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{feedbackMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3.5 rounded-full bg-white text-black font-mono font-bold text-xs tracking-wider hover:bg-gray-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg hover:scale-[1.01] active:scale-[0.99]"
              >
                {status === "loading" ? (
                  <span>TRANSMITTING MESSAGE...</span>
                ) : (
                  <>
                    <span>SUBMIT COLLABORATION INQUIRY</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <span className="text-[10px] font-mono text-foreground-dim text-center">
                Protected by server-side rate limiting and spam filtering • Direct delivery
              </span>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
