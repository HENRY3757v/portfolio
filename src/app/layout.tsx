import type { Metadata, Viewport } from "next";
import "./globals.css";
import { profileData } from "@/data/profile";
import CommandPalette from "@/components/ui/CommandPalette";
import KatanaCursor from "@/components/cursor/KatanaCursor";
import KatanaSlashOverlay from "@/components/cursor/KatanaSlashOverlay";
import ZenControls from "@/components/ui/ZenControls";

export const metadata: Metadata = {
  metadataBase: new URL("https://github.com/HENRY3757v"),
  title: `${profileData.name} | Creative Developer, Engineer & Designer`,
  description: `${profileData.headlines.heroMain} - ${profileData.headlines.heroSupporting} Portfolio of Suvradip Dey, Computer Science & AI student at BBIT.`,
  keywords: [
    "Suvradip Dey",
    "Creative Developer",
    "Frontend Engineer",
    "React 19",
    "ShopEase",
    "Full-Stack Developer",
    "Next.js",
    "Tailwind CSS",
    "Python",
    "BBIT",
    "Kolkata"
  ],
  authors: [{ name: profileData.name, url: profileData.contact.github }],
  creator: profileData.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/HENRY3757v",
    title: `${profileData.name} | The Interactive Digital Identity`,
    description: profileData.headlines.heroSupporting,
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
    title: `${profileData.name} | Creative Developer`,
    description: profileData.headlines.heroSupporting,
    images: ["/images/suvradip-portrait.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
