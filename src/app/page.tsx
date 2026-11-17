"use client";

import React, { useState } from "react";
import SignatureHero from "@/components/hero/SignatureHero";
import ShowcaseHeader from "@/components/layout/ShowcaseHeader";
import AboutSection from "@/components/about/AboutSection";
import ExpertiseDashboard from "@/components/expertise/ExpertiseDashboard";
import ProjectsShowroom from "@/components/projects/ProjectsShowroom";
import ServicesSection from "@/components/services/ServicesSection";
import JourneyTimeline from "@/components/timeline/JourneyTimeline";
import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const [showcaseOpen, setShowcaseOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  const handleEnterShowcase = (targetSectionId?: string) => {
    setShowcaseOpen(true);
    if (targetSectionId) {
      setActiveSection(targetSectionId);
      setTimeout(() => {
        const el = document.getElementById(targetSectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    }
  };

  const handleBackToFront = () => {
    setShowcaseOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full min-h-screen bg-[#07080B] text-foreground">
      {!showcaseOpen ? (
        /* Front Face (State 1) - Pure Tony Gines landing screen */
        <SignatureHero onEnterShowcase={handleEnterShowcase} />
      ) : (
        /* Full Portfolio Showcase (State 2) */
        <div className="flex flex-col w-full animate-in fade-in duration-500">
          <ShowcaseHeader onBackToFront={handleBackToFront} activeSection={activeSection} />
          
          <main className="pt-20 flex flex-col w-full">
            <AboutSection />
            <ExpertiseDashboard />
            <ProjectsShowroom />
            <ServicesSection />
            <JourneyTimeline />
            <ContactSection />
          </main>

          <Footer />
        </div>
      )}
    </div>
  );
}
