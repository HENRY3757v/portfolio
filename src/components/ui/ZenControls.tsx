"use client";

import React, { useState, useEffect } from "react";
import { soundFX } from "@/utils/soundEffects";
import { Volume2, VolumeX, Sparkles } from "lucide-react";

export default function ZenControls() {
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    setSoundActive(soundFX.getEnabled());
  }, []);

  const handleToggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = soundFX.toggle();
    setSoundActive(nextState);
    if (nextState) {
      soundFX.playSlash();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 pointer-events-auto">
      {/* Sound Toggle Button */}
      <button
        onClick={handleToggleSound}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono tracking-wider transition-all duration-300 shadow-xl backdrop-blur-md cursor-pointer ${
          soundActive
            ? "bg-[#ff2a6d]/20 border-[#ff2a6d]/60 text-[#ffb7c5] shadow-[#ff2a6d]/20"
            : "bg-[#0b0e1a]/80 border-white/10 text-white/60 hover:text-white hover:border-white/20"
        }`}
        title={soundActive ? "Mute Katana & Zen Audio" : "Enable Katana & Zen Sound FX"}
        aria-label="Toggle Audio"
      >
        {soundActive ? (
          <>
            <Volume2 className="w-3.5 h-3.5 text-[#ff2a6d] animate-pulse" />
            <span className="text-[11px] font-semibold">音 KATANA AUDIO ON</span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[11px]">音 AUDIO OFF</span>
          </>
        )}
      </button>
    </div>
  );
}
