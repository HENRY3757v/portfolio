"use client";

import React, { useEffect, useState } from "react";

interface SlashInstance {
  id: number;
  x: number;
  y: number;
  angle: number;
}

export default function KatanaSlashOverlay() {
  const [slashes, setSlashes] = useState<SlashInstance[]>([]);

  useEffect(() => {
    const handleSlash = (e: Event) => {
      const customEvent = e as CustomEvent<{ x: number; y: number }>;
      const { x, y } = customEvent.detail || {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };

      const newSlash: SlashInstance = {
        id: Date.now() + Math.random(),
        x,
        y,
        angle: -35 + (Math.random() * 20 - 10), // Dramatic diagonal angle
      };

      setSlashes((prev) => [...prev, newSlash]);

      // Remove after slash animation completes
      setTimeout(() => {
        setSlashes((prev) => prev.filter((s) => s.id !== newSlash.id));
      }, 450);
    };

    window.addEventListener("katana-slash", handleSlash);
    return () => window.removeEventListener("katana-slash", handleSlash);
  }, []);

  if (slashes.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9990] overflow-hidden">
      {slashes.map((s) => (
        <div
          key={s.id}
          className="absolute inset-0"
          style={{
            transformOrigin: `${s.x}px ${s.y}px`,
          }}
        >
          {/* Razor-sharp Laser Slash Light Cut */}
          <div
            className="absolute h-[3px] w-[200vw] -left-[50vw] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_20px_#ffb7c5,0_0_35px_#ff2a6d] animate-slash-streak"
            style={{
              top: `${s.y}px`,
              transform: `rotate(${s.angle}deg)`,
            }}
          />

          {/* Sliced Blade Light Flash */}
          <div
            className="absolute w-24 h-24 rounded-full bg-white/70 blur-md -translate-x-1/2 -translate-y-1/2 animate-ping"
            style={{
              left: `${s.x}px`,
              top: `${s.y}px`,
              animationDuration: "300ms",
            }}
          />

          {/* Burst of Sakura Sparks / Petals radiating outward */}
          {[...Array(12)].map((_, idx) => {
            const rad = (idx / 12) * Math.PI * 2 + (Math.random() * 0.4 - 0.2);
            const dist = 60 + Math.random() * 90;
            const px = Math.cos(rad) * dist;
            const py = Math.sin(rad) * dist;
            return (
              <div
                key={idx}
                className="absolute w-2 h-2 rounded-full bg-[#ffb7c5] shadow-[0_0_8px_#ff2a6d] transition-all duration-300 ease-out"
                style={{
                  left: `${s.x}px`,
                  top: `${s.y}px`,
                  transform: `translate(${px}px, ${py}px) scale(0)`,
                  opacity: 0,
                  animation: `sparkScatter 380ms ease-out forwards`,
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
