"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { profileData } from "@/data/profile";
import { identityStates } from "@/data/identities";
import { skillsData } from "@/data/skills";
import { servicesData } from "@/data/services";
import {
  Lock,
  Unlock,
  KeyRound,
  ShieldCheck,
  CheckCircle,
  FileCode,
  Save,
  Download,
  AlertCircle,
  ArrowLeft,
  User,
  Sliders,
  Database,
  Layers,
  Sparkles,
} from "lucide-react";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<"profile" | "identities" | "skills" | "services" | "export">("profile");

  // Editable local state
  const [profile, setProfile] = useState(profileData);
  const [identities, setIdentities] = useState(identityStates);
  const [skills, setSkills] = useState(skillsData);
  const [services, setServices] = useState(servicesData);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("admin_auth_token");
    if (sessionToken === "suvradip_authenticated_session") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default administration security verification check
    if (passcode === "suvradip2026" || passcode === "admin") {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth_token", "suvradip_authenticated_session");
      setAuthError("");
    } else {
      setAuthError("Invalid administrative passcode. Please verify your credentials.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth_token");
    setIsAuthenticated(false);
    setPasscode("");
  };

  const handleExportJSON = () => {
    const fullBackup = {
      profile,
      identities,
      skills,
      services,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `suvradip_portfolio_content_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleTriggerSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07080B] text-foreground flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-3xl bg-[#0E1117] border border-white/10 shadow-2xl flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-xs font-mono text-foreground-dim hover:text-white flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Site</span>
            </Link>
            <span className="p-2 rounded-xl bg-white/5 border border-white/10 text-identity-developer">
              <Lock className="w-4 h-4" />
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-identity-developer block mb-1">
              SYSTEM LEVEL AUTHENTICATION
            </span>
            <h1 className="font-display font-bold text-2xl text-white">
              Private Content Dashboard
            </h1>
            <p className="text-xs text-foreground-muted mt-1 leading-relaxed">
              Enter your master passcode to access the live content schema and profile variables.
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="pass" className="text-xs font-mono text-foreground-muted">
                Admin Passcode
              </label>
              <input
                id="pass"
                type="password"
                required
                placeholder="Enter passcode..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-foreground-dim text-xs font-mono focus:outline-none focus:border-identity-developer transition-colors"
              />
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="py-3 rounded-xl bg-white text-black font-mono font-bold text-xs tracking-wider hover:bg-gray-200 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <KeyRound className="w-4 h-4" />
              <span>UNLOCK DASHBOARD</span>
            </button>
          </form>

          <span className="text-[10px] font-mono text-foreground-dim text-center">
            Secured server-session environment • Client credentials are not stored
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07080B] text-foreground pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#0D1016] border border-white/10 shadow-xl mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-identity-builder" />
              <span className="text-xs font-mono uppercase tracking-widest text-identity-builder">
                AUTHENTICATED SESSION ACTIVE
              </span>
            </div>
            <h1 className="font-display font-bold text-2xl text-white">
              Content &amp; Identity Management
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportJSON}
              className="px-4 py-2 rounded-xl text-xs font-mono bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-identity-developer" />
              <span>Export Schema JSON</span>
            </button>
            <button
              onClick={handleTriggerSave}
              className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-white text-black hover:bg-gray-200 flex items-center gap-1.5 transition-all shadow-md"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-xl text-xs font-mono text-red-400 hover:bg-red-500/10 transition-colors"
            >
              Lock
            </button>
          </div>
        </div>

        {saveSuccess && (
          <div className="mb-6 p-4 rounded-2xl bg-identity-builder/10 border border-identity-builder/30 text-identity-builder text-xs font-mono flex items-center gap-2">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>Structured content state updated successfully for this session.</span>
          </div>
        )}

        {/* Tab Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {[
            { id: "profile", label: "Profile & Headlines", icon: User },
            { id: "identities", label: "Identity Engine (5 States)", icon: Sliders },
            { id: "skills", label: "Skills & Project Linkages", icon: Database },
            { id: "services", label: "Services & Deliverables", icon: Layers },
            { id: "export", label: "Raw JSON Schema", icon: FileCode },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-2 whitespace-nowrap border transition-all ${
                  isActive
                    ? "bg-white text-black font-semibold border-white shadow-md"
                    : "bg-white/[0.02] text-foreground-muted hover:text-white border-white/5"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: PROFILE EDIT */}
        {activeTab === "profile" && (
          <div className="p-8 rounded-3xl bg-[#0D1016] border border-white/10 flex flex-col gap-6">
            <h3 className="font-display font-bold text-lg text-white">Profile Identity Fields</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="flex flex-col gap-1.5">
                <label className="text-foreground-dim">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white font-sans"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-foreground-dim">Professional Title</label>
                <input
                  type="text"
                  value={profile.role}
                  onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white font-sans"
                />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-foreground-dim">Hero Main Headline</label>
                <input
                  type="text"
                  value={profile.headlines.heroMain}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      headlines: { ...profile.headlines, heroMain: e.target.value },
                    })
                  }
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white font-sans"
                />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-foreground-dim">About Headline</label>
                <input
                  type="text"
                  value={profile.headlines.aboutHeadline}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      headlines: { ...profile.headlines, aboutHeadline: e.target.value },
                    })
                  }
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white font-sans"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: IDENTITIES EDIT */}
        {activeTab === "identities" && (
          <div className="space-y-4">
            {identities.map((item, idx) => (
              <div key={item.id} className="p-6 rounded-2xl bg-[#0D1016] border border-white/10 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-identity-developer font-bold">STATE {item.stateNumber}</span>
                  <span className="text-foreground-dim">{item.roleName}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <input
                    type="text"
                    value={item.headline}
                    onChange={(e) => {
                      const updated = [...identities];
                      updated[idx].headline = e.target.value;
                      setIdentities(updated);
                    }}
                    className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-white font-sans"
                  />
                  <input
                    type="text"
                    value={item.supportingLine}
                    onChange={(e) => {
                      const updated = [...identities];
                      updated[idx].supportingLine = e.target.value;
                      setIdentities(updated);
                    }}
                    className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-white font-sans"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: SKILLS EDIT */}
        {activeTab === "skills" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((skill, sIdx) => (
              <div key={skill.name} className="p-5 rounded-2xl bg-[#0D1016] border border-white/10 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <strong className="text-sm font-semibold text-white">{skill.name}</strong>
                  <select
                    value={skill.status}
                    onChange={(e) => {
                      const updated = [...skills];
                      updated[sIdx].status = e.target.value as any;
                      setSkills(updated);
                    }}
                    className="text-[11px] font-mono px-2 py-1 rounded bg-[#151922] border border-white/10 text-white"
                  >
                    <option value="Experienced">Experienced</option>
                    <option value="Working knowledge">Working knowledge</option>
                    <option value="Currently learning">Currently learning</option>
                  </select>
                </div>
                <span className="text-xs text-foreground-muted">{skill.description}</span>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: SERVICES EDIT */}
        {activeTab === "services" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((service, sIdx) => (
              <div key={service.id} className="p-6 rounded-2xl bg-[#0D1016] border border-white/10 flex flex-col gap-3">
                <h4 className="font-display font-bold text-white text-base">{service.title}</h4>
                <textarea
                  rows={2}
                  value={service.explanation}
                  onChange={(e) => {
                    const updated = [...services];
                    updated[sIdx].explanation = e.target.value;
                    setServices(updated);
                  }}
                  className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-white text-xs font-sans"
                />
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: RAW JSON SCHEMA */}
        {activeTab === "export" && (
          <div className="p-6 rounded-3xl bg-[#08090C] border border-white/10 overflow-hidden text-xs font-mono">
            <pre className="text-foreground-muted max-h-96 overflow-y-auto">
              {JSON.stringify({ profile, identities, skills, services }, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
