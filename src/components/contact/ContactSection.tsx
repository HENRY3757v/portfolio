"use client";

import React, { useState, useEffect } from "react";
import { profileData } from "@/data/profile";
import { soundFX } from "@/utils/soundEffects";
import {
  Mail,
  Phone,
  MessageCircle,
  Github,
  Linkedin,
  Download,
  Send,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
} from "lucide-react";

const SERVICE_OPTIONS = [
  "Website Development",
  "Python Automation",
  "Backend Development",
  "Data Analytics",
  "Other",
];

const BUDGET_OPTIONS = [
  "Under ₹5,000",
  "₹5,000 – ₹10,000",
  "₹10,000 – ₹20,000",
  "₹20,000 – ₹50,000",
  "₹50,000+",
  "Not Sure Yet",
];

const TIMELINE_OPTIONS = [
  "Within 1 week",
  "Within 1 month",
  "Within 3 months",
  "Flexible",
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "Website Development",
    budget: "₹10,000 – ₹20,000",
    timeline: "Within 1 month",
    description: "",
    preferredContact: "Email" as "Email" | "WhatsApp",
    consent: false,
    honeypot: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Listen for preselect-service events triggered from service cards
  useEffect(() => {
    const handlePreselect = (e: Event) => {
      const customEvent = e as CustomEvent<{ service: string }>;
      if (customEvent.detail?.service) {
        setFormData((prev) => ({
          ...prev,
          service: customEvent.detail.service,
        }));
      }
    };

    window.addEventListener("preselect-service", handlePreselect);
    return () => window.removeEventListener("preselect-service", handlePreselect);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.contact.email).then(() => {
      setCopiedEmail(true);
      soundFX.playSakuraChime();
      setTimeout(() => setCopiedEmail(false), 2500);
    });
  };

  const generateWhatsAppUrl = () => {
    const cleanPhone = "916289226874";
    const text = `Hi Suvradip! I visited your portfolio and would like to discuss a project.

Service: ${formData.service}
Budget: ${formData.budget}
Timeline: ${formData.timeline}

Project Details: ${formData.description.trim() || "Let's connect to discuss my requirements."}`;

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      setErrorMessage("Please provide a valid email address.");
      return;
    }

    if (!formData.description.trim() || formData.description.trim().length < 10) {
      setErrorMessage("Please provide at least 10 characters describing your project.");
      return;
    }

    if (!formData.consent) {
      setErrorMessage("Please check the consent box to proceed.");
      return;
    }

    setStatus("loading");
    soundFX.playWhoosh();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          projectType: formData.service,
          budget: formData.budget,
          timeline: formData.timeline,
          message: formData.description,
          preferredContact: formData.preferredContact,
          honeypot: formData.honeypot,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        soundFX.playSlash();
        soundFX.playSakuraChime();
        setFormData({
          name: "",
          email: "",
          company: "",
          service: "Website Development",
          budget: "₹10,000 – ₹20,000",
          timeline: "Within 1 month",
          description: "",
          preferredContact: "Email",
          consent: false,
          honeypot: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Submission failed. Please try again or message directly via WhatsApp.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error occurred. Please message directly via WhatsApp or email.");
    }
  };

  return (
    <section id="inquiry" className="relative py-28 px-4 sm:px-6 border-t border-white/5 bg-[#06070D] overflow-hidden">
      {/* Anchor for contact */}
      <div id="contact" className="absolute -top-20" />

      {/* Background Japanese Watermark Accent */}
      <div className="absolute left-8 bottom-12 pointer-events-none opacity-5 text-9xl font-serif select-none hidden lg:block">
        相談
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-16 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-[#ffb7c5]">
            07 // PROJECT INQUIRY • 案件相談
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            HAVE SOMETHING IN MIND? LET&apos;S BUILD IT.
          </h2>
          <p className="text-foreground-muted text-sm sm:text-base leading-relaxed mt-1">
            Whether you&apos;re starting something new or improving an existing system, I&apos;d love to understand your idea.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact & WhatsApp Fast Track */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-6">
              {/* WhatsApp Fast Conversion Card */}
              <div className="p-7 rounded-3xl bg-gradient-to-br from-[#0c1a17] via-[#09110f] to-[#080d0d] border border-emerald-500/30 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-white">Prefer Fast WhatsApp Chat?</h3>
                    <p className="text-[11px] font-mono text-emerald-400">Direct message to Suvradip</p>
                  </div>
                </div>

                <p className="text-xs text-foreground-muted leading-relaxed mb-5">
                  Have quick questions or prefer direct messaging? Start a conversation on WhatsApp with pre-filled project details.
                </p>

                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFX.playSlash()}
                  className="w-full py-3 px-5 rounded-full text-xs font-mono font-bold tracking-wider text-black bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-teal-300 hover:to-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-950" />
                  <span>CHAT DIRECTLY ON WHATSAPP</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-950" />
                </a>
              </div>

              {/* Direct Credentials Card */}
              <div className="p-7 rounded-3xl bg-[#0C0F17] border border-white/5 flex flex-col gap-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-white/50">
                  VERIFIED DIRECT CONTACT
                </h4>

                {/* Email with copy button */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#ffb7c5]" />
                    <span className="text-xs font-mono text-white/90">{profileData.contact.email}</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="text-[11px] font-mono text-[#00f0ff] hover:text-white px-2.5 py-1 rounded-md bg-white/5 border border-white/10 transition-colors"
                  >
                    {copiedEmail ? "COPIED!" : "COPY"}
                  </button>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                  <Phone className="w-4 h-4 text-[#10b981]" />
                  <span className="text-xs font-mono text-white/90">{profileData.contact.phone}</span>
                </div>

                {/* Location & Status */}
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div className="text-xs font-mono text-white/60">Location: Kolkata, India</div>
                  <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Active for Inquiries</span>
                  </div>
                </div>

                {/* Social Profiles */}
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={profileData.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-2 text-xs font-mono text-white transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={profileData.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-2 text-xs font-mono text-white transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Assurance */}
            <div className="p-5 rounded-2xl bg-white/[0.015] border border-white/5 text-[11px] font-mono text-white/50 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#ffb7c5] flex-shrink-0" />
              <span>Strict Privacy: Your project details and contact information are never shared with third parties.</span>
            </div>
          </div>

          {/* Right Column: Premium Project Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0C0F17] border border-white/10 shadow-2xl relative">
              {status === "success" ? (
                <div className="py-12 flex flex-col items-center text-center gap-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#ffb7c5]/20 border border-[#ffb7c5]/50 flex items-center justify-center text-[#ffb7c5]">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white">Inquiry Received!</h3>
                  <p className="text-sm font-mono text-foreground-muted max-w-md leading-relaxed">
                    Thank you for reaching out! Your project inquiry has been received. I&apos;ll review the details and get back to you soon.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 px-6 py-2.5 rounded-full text-xs font-mono text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all"
                  >
                    SUBMIT ANOTHER INQUIRY
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Honeypot field (hidden) */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {errorMessage && (
                    <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                        Full Name <span className="text-[#ff2a6d]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-[#ffb7c5] focus:outline-none text-xs sm:text-sm text-white placeholder:text-white/25 transition-colors font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                        Email Address <span className="text-[#ff2a6d]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-[#ffb7c5] focus:outline-none text-xs sm:text-sm text-white placeholder:text-white/25 transition-colors font-sans"
                      />
                    </div>
                  </div>

                  {/* Company & Service Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                        Company or Organization <span className="text-white/30 text-[10px]">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Startup / Business name"
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-[#ffb7c5] focus:outline-none text-xs sm:text-sm text-white placeholder:text-white/25 transition-colors font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                        Service Required <span className="text-[#ff2a6d]">*</span>
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-[#ffb7c5] focus:outline-none text-xs sm:text-sm text-white transition-colors font-sans cursor-pointer"
                      >
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#0C0F17] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Budget & Timeline Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                        Estimated Budget Range
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-[#ffb7c5] focus:outline-none text-xs sm:text-sm text-white transition-colors font-sans cursor-pointer"
                      >
                        {BUDGET_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#0C0F17] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                        Target Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-[#ffb7c5] focus:outline-none text-xs sm:text-sm text-white transition-colors font-sans cursor-pointer"
                      >
                        {TIMELINE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#0C0F17] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Project Description Textarea */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                      Project Description <span className="text-[#ff2a6d]">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Explain your requirements, core features, or the specific problem you want solved..."
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-[#ffb7c5] focus:outline-none text-xs sm:text-sm text-white placeholder:text-white/25 transition-colors font-sans resize-none"
                    />
                  </div>

                  {/* Preferred Contact Method */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                      Preferred Response Channel
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label
                        className={`p-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                          formData.preferredContact === "Email"
                            ? "bg-[#ffb7c5]/15 border-[#ffb7c5]/50 text-white"
                            : "bg-white/[0.02] border-white/10 text-white/50 hover:text-white"
                        }`}
                      >
                        <input
                          type="radio"
                          name="preferredContact"
                          value="Email"
                          checked={formData.preferredContact === "Email"}
                          onChange={() => setFormData({ ...formData, preferredContact: "Email" })}
                          className="hidden"
                        />
                        <Mail className="w-3.5 h-3.5" />
                        <span className="text-xs font-mono">Email Response</span>
                      </label>

                      <label
                        className={`p-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                          formData.preferredContact === "WhatsApp"
                            ? "bg-emerald-500/20 border-emerald-500/50 text-white"
                            : "bg-white/[0.02] border-white/10 text-white/50 hover:text-white"
                        }`}
                      >
                        <input
                          type="radio"
                          name="preferredContact"
                          value="WhatsApp"
                          checked={formData.preferredContact === "WhatsApp"}
                          onChange={() => setFormData({ ...formData, preferredContact: "WhatsApp" })}
                          className="hidden"
                        />
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-xs font-mono">WhatsApp Response</span>
                      </label>
                    </div>
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start gap-3 pt-1">
                    <input
                      type="checkbox"
                      id="consent"
                      required
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1 w-4 h-4 rounded bg-black/40 border-white/20 text-[#ff2a6d] focus:ring-0 cursor-pointer"
                    />
                    <label htmlFor="consent" className="text-[11px] font-mono text-white/60 leading-relaxed cursor-pointer">
                      I agree that the submitted details will be used by Suvradip Dey to review and respond to this project inquiry.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-4 rounded-full text-xs font-mono font-bold tracking-wider text-black bg-gradient-to-r from-white via-[#ffd1dc] to-[#ffb7c5] hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,183,197,0.3)] hover:scale-[1.01] active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    {status === "loading" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>PROCESSING INQUIRY...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>SUBMIT PROJECT INQUIRY</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
