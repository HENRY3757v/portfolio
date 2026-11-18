import type { Metadata, Viewport } from "next";
import "./globals.css";
import { profileData } from "@/data/profile";
import CommandPalette from "@/components/ui/CommandPalette";
import KatanaCursor from "@/components/cursor/KatanaCursor";
import KatanaSlashOverlay from "@/components/cursor/KatanaSlashOverlay";
import ZenControls from "@/components/ui/ZenControls";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-theshopease.vercel.app"),
  alternates: {
    canonical: "https://portfolio-theshopease.vercel.app",
  },
  title: `${profileData.name} | Creative Developer, Python Engineer & UI/UX Specialist`,
  description: "I build digital experiences that work as beautifully as they look. Modern websites, Python-powered automation, backend systems, and data-driven solutions by Suvradip Dey.",
  keywords: [
    "Suvradip Dey",
    "Creative Developer",
    "Frontend Engineer",
    "Python Automation",
    "Full-Stack Developer",
    "React 19",
    "Next.js",
    "ShopEase",
    "Data Analytics",
    "Flask Backend",
    "Tailwind CSS",
    "BBIT",
    "Kolkata Web Developer"
  ],
  authors: [{ name: profileData.name, url: profileData.contact.github }],
  creator: profileData.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-theshopease.vercel.app",
    title: `${profileData.name} | Creative Developer & Full-Stack Solutions`,
    description: "I build digital experiences that work as beautifully as they look. Explore services, live flagship case studies, and project inquiries.",
    siteName: `${profileData.name} Portfolio`,
    images: [
      {
        url: "/images/suvradip-portrait.jpg",
        width: 1200,
        height: 630,
        alt: `${profileData.name} - Portrait`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profileData.name} | Creative Developer & Full-Stack Solutions`,
    description: "I build digital experiences that work as beautifully as they look.",
    images: ["/images/suvradip-portrait.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://portfolio-theshopease.vercel.app/#person",
      "name": "Suvradip Dey",
      "url": "https://portfolio-theshopease.vercel.app",
      "image": "https://portfolio-theshopease.vercel.app/images/suvradip-portrait.jpg",
      "jobTitle": "Creative Developer & Full-Stack Engineer",
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Budge Budge Institute of Technology"
      },
      "sameAs": [
        "https://github.com/HENRY3757v",
        "https://linkedin.com/in/suvradip-dey-1a659728b"
      ],
      "knowsAbout": [
        "Website Development",
        "Python Automation",
        "Backend Development",
        "Data Analytics",
        "React",
        "Next.js",
        "Flask",
        "MySQL"
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://portfolio-theshopease.vercel.app/#service",
      "name": "Suvradip Dey — Digital Solutions & Web Development",
      "url": "https://portfolio-theshopease.vercel.app",
      "provider": {
        "@id": "https://portfolio-theshopease.vercel.app/#person"
      },
      "priceRange": "$$",
      "areaServed": {
        "@type": "Country",
        "name": "Worldwide"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Development & Engineering Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Website Development",
              "description": "Modern, responsive websites designed to establish a strong digital presence and convert visitors into customers."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Python Automation",
              "description": "Custom Python solutions that reduce repetitive manual work and improve workflow efficiency."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Backend Development",
              "description": "Reliable backend functionality for web applications, databases, and custom software workflows."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Data Analytics",
              "description": "Transform raw datasets into useful insights through cleaning, analysis, and visualization."
            }
          }
        ]
      }
    }
  ]
};

export const viewport: Viewport = {
  themeColor: "#08090B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground antialiased selection:bg-identity-developer/30 selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="relative min-h-screen flex flex-col editorial-grid-bg">
          <KatanaCursor />
          <KatanaSlashOverlay />
          <ZenControls />
          <CommandPalette />
          <main className="flex-1 relative z-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
