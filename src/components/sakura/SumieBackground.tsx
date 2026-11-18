"use client";

import React from "react";
import Image from "next/image";

interface SumieBackgroundProps {
  className?: string;
  variant?: "hero" | "ambient";
}

export default function SumieBackground({ className = "", variant = "hero" }: SumieBackgroundProps) {
  return (
    <div
      className={`pointer-events-none select-none overflow-hidden z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Primary Weeping Sakura Branch Descending from Top-Left */}
      <div className="absolute -top-6 -left-6 sm:-top-10 sm:-left-10 w-[340px] sm:w-[480px] lg:w-[620px] aspect-square transition-all duration-1000 opacity-60 sm:opacity-85 mix-blend-screen filter drop-shadow-[0_0_25px_rgba(255,163,199,0.25)]">
        <Image
          src="/images/sumie-sakura-dark.png"
          alt="Traditional Japanese Sumi-e Weeping Sakura Branch"
          fill
          priority={variant === "hero"}
          className="object-contain object-top-left transform -rotate-2 hover:rotate-0 transition-transform duration-700"
        />
      </div>

      {/* Subtle Secondary Ambient Branch Echo on the Right */}
      {variant === "ambient" && (
        <div className="absolute top-1/3 -right-20 w-[380px] lg:w-[500px] aspect-square opacity-20 mix-blend-screen transform scale-x-[-1] rotate-12 pointer-events-none hidden md:block">
          <Image
            src="/images/sumie-sakura-dark.png"
            alt="Ambient Sumi-e Sakura Silhouette"
            fill
            className="object-contain object-top-right"
          />
        </div>
      )}

      {/* Traditional Japanese Red Artist Seal (Hanko / 印鑑) */}
      <div className="absolute top-36 left-4 sm:top-52 sm:left-8 w-6 h-6 sm:w-8 sm:h-8 rounded-sm border border-[#ff2a6d]/60 bg-[#ff2a6d]/20 flex items-center justify-center text-[10px] sm:text-xs font-serif text-[#ffd1dc] shadow-[0_0_12px_rgba(255,42,109,0.4)] opacity-70">
        燈
      </div>
    </div>
  );
}
