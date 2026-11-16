"use client";

import SignatureHero from "@/components/hero/SignatureHero";
import AboutSection from "@/components/about/AboutSection";
import ExpertiseDashboard from "@/components/expertise/ExpertiseDashboard";
import ProjectsShowroom from "@/components/projects/ProjectsShowroom";
import ServicesSection from "@/components/services/ServicesSection";
import JourneyTimeline from "@/components/timeline/JourneyTimeline";
import ContactSection from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Signature Interactive Hero & Identity Engine */}
      <SignatureHero />

      {/* About Section */}
      <AboutSection />

      {/* Expertise Dashboard */}
      <ExpertiseDashboard />

      {/* Flagship Projects Showroom */}
      <ProjectsShowroom />

      {/* Professional Services */}
      <ServicesSection />

      {/* Journey Timeline */}
      <JourneyTimeline />

      {/* Contact & Collaboration */}
      <ContactSection />
    </div>
  );
}
