"use client";

import React, { useState } from "react";
import SignatureHero from "@/components/hero/SignatureHero";
import ShowcaseHeader from "@/components/layout/ShowcaseHeader";
import ServicesSection from "@/components/services/ServicesSection";
import ProjectsShowroom from "@/components/projects/ProjectsShowroom";
import ExpertiseDashboard from "@/components/expertise/ExpertiseDashboard";
import WhyWorkWithMe from "@/components/trust/WhyWorkWithMe";
import PricingPhilosophy from "@/components/pricing/PricingPhilosophy";
import FAQSection from "@/components/faq/FAQSection";
import AboutSection from "@/components/about/AboutSection";
import JourneyTimeline from "@/components/timeline/JourneyTimeline";
import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/layout/Footer";
import SakuraPetalsCanvas from "@/components/sakura/SakuraPetalsCanvas";
import SumieBackground from "@/components/sakura/SumieBackground";

export default function Home() {
  const [showcaseOpen, setShowcaseOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("services");

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
        /* Front Face (State 1) - Pure Japanese Sumi-e & Living Portrait Landing Screen */
        <SignatureHero onEnterShowcase={handleEnterShowcase} />
      ) : (
        /* Full Portfolio Showcase (State 2) with Continuous Ambient Sakura & Sumi-e Art */
        <div className="flex flex-col w-full animate-in fade-in duration-500 relative">
          {/* Ambient Sumi-e Sakura Weeping Branch Background */}
          <SumieBackground variant="ambient" className="fixed inset-0 pointer-events-none opacity-40" />

          {/* Continuous Ambient Sakura Petals Floating Softly */}
          <SakuraPetalsCanvas layer="background" petalCount={16} className="fixed inset-0 z-0 opacity-40 pointer-events-none" />

          <ShowcaseHeader onBackToFront={handleBackToFront} activeSection={activeSection} />
          
          <main className="pt-20 flex flex-col w-full relative z-10">
            {/* 1. Services Section: What I Can Build For You */}
            <ServicesSection />

            {/* 2. Flagship Projects Showroom: ShopEase & Verifiable Code */}
            <ProjectsShowroom />

            {/* 3. Expertise Dashboard: Technology Stack */}
            <ExpertiseDashboard />

            {/* 4. Professional Credibility: Why Work With Me */}
            <div id="why-me">
              <WhyWorkWithMe />
            </div>

            {/* 5. Transparent Pricing Philosophy */}
            <div id="pricing">
              <PricingPhilosophy />
            </div>

            {/* 6. Frequently Asked Questions */}
            <div id="faq">
              <FAQSection />
            </div>

            {/* 7. About Suvradip & Educational Background (BBIT) */}
            <AboutSection />

            {/* 8. Engineering Journey Timeline */}
            <JourneyTimeline />

            {/* 9. High-Conversion Project Inquiry & WhatsApp System */}
            <ContactSection />
          </main>

          <Footer />
        </div>
      )}
    </div>
  );
}
