"use client";

import React, { useEffect, useState, useRef } from "react";
import { soundFX } from "@/utils/soundEffects";

export default function KatanaCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isSlashing, setIsSlashing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [rotation, setRotation] = useState(-25);

  const prevPosRef = useRef({ x: -100, y: -100 });
  const lastWhooshTime = useRef(0);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      const currentX = e.clientX;
      const currentY = e.clientY;

      const dx = currentX - prevPosRef.current.x;
      const dy = currentY - prevPosRef.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Tilt katana slightly based on movement direction
      if (speed > 2) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        // Blend angle smoothly
        setRotation((prev) => prev * 0.7 + (angle - 45) * 0.3);
      }

      // Play subtle blade whoosh when moving fast in hover state
      if (speed > 28 && Date.now() - lastWhooshTime.current > 400) {
        soundFX.playWhoosh();
        lastWhooshTime.current = Date.now();
      }

      prevPosRef.current = { x: currentX, y: currentY };
      setPos({ x: currentX, y: currentY });

      // Detect hover over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          "button, a, [role='button'], input, textarea, select, .interactive-katana, [data-katana='true']"
        );
        setIsHovered(!!interactive && !interactive.matches("input, textarea, select"));
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const isInteractive = target?.closest(
        "button, a, [role='button'], .interactive-katana, [data-katana='true']"
      );

      if (isInteractive) {
        setIsSlashing(true);
        soundFX.playSlash();

        // Dispatch global katana-slash event with click coordinates
        window.dispatchEvent(
          new CustomEvent("katana-slash", {
            detail: { x: e.clientX, y: e.clientY },
          })
        );

        setTimeout(() => setIsSlashing(false), 240);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-transform duration-75 will-change-transform"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: "translate(-18%, -18%)",
      }}
    >
      {/* State 1: Default Small Zen Sakura Ring Indicator */}
      {!isHovered && (
        <div className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffb7c5] shadow-[0_0_10px_#ffb7c5] animate-pulse" />
          <div className="absolute w-6 h-6 rounded-full border border-[#ffb7c5]/40 animate-ping opacity-30" />
        </div>
      )}

      {/* State 2: Miniature Crafted Katana Hover Weapon */}
      {isHovered && (
        <div
          className={`relative transition-transform ease-out ${
            isSlashing ? "duration-150 rotate-45 scale-125" : "duration-200"
          }`}
          style={{
            transform: `rotate(${isSlashing ? rotation + 65 : rotation}deg) scale(${
              isSlashing ? 1.25 : 1
            })`,
            transformOrigin: "35% 35%",
          }}
        >
          {/* Detailed Miniature Katana Vector SVG */}
          <svg
            width="56"
            height="56"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_2px_8px_rgba(255,183,197,0.35)]"
          >
            {/* Ambient Blade Aura */}
            <path
              d="M12 52 L26 38 L54 10"
              stroke="#05d9e8"
              strokeWidth="5"
              strokeLinecap="round"
              className="opacity-20 blur-[2px]"
            />

            {/* Steel Curved Blade */}
            <path
              d="M26 38 C 34 30, 44 20, 53 10 C 51 13, 40 25, 27 39 Z"
              fill="url(#bladeSteelGradient)"
              stroke="#ffffff"
              strokeWidth="0.75"
            />

            {/* Razor Cutting Edge (Hamon Line) */}
            <path
              d="M27 39 C 37 27, 47 16, 53 10"
              stroke="#ffb7c5"
              strokeWidth="1.2"
              strokeLinecap="round"
              className="drop-shadow-[0_0_4px_#ff2a6d]"
            />

            {/* Golden Habaki (Blade Collar) */}
            <rect
              x="24"
              y="37"
              width="4.5"
              height="3.5"
              rx="0.5"
              fill="url(#goldGradient)"
              transform="rotate(45 24 37)"
            />

            {/* Tsuba (Ornate Golden Handguard) */}
            <ellipse
              cx="23"
              cy="41"
              rx="5.5"
              ry="2.5"
              fill="url(#goldGradient)"
              stroke="#f59e0b"
              strokeWidth="0.6"
              transform="rotate(45 23 41)"
            />

            {/* Wrapped Handle (Tsuka with Diamond Ito) */}
            <path
              d="M21 43 L10 54"
              stroke="#181824"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Diamond Wrap Accents */}
            <path
              d="M19 45 L17 47 M16 48 L14 50 M13 51 L11 53"
              stroke="#ffd1dc"
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* Golden Kashira (Pommel Cap) */}
            <circle cx="9.5" cy="54.5" r="2.2" fill="url(#goldGradient)" />

            {/* Gradients */}
            <defs>
              <linearGradient id="bladeSteelGradient" x1="26" y1="38" x2="53" y2="10" gradientUnits="userSpaceOnUse">
                <stop stopColor="#94a3b8" />
                <stop offset="0.45" stopColor="#f8fafc" />
                <stop offset="1" stopColor="#e2e8f0" />
              </linearGradient>
              <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#fbbf24" />
                <stop offset="1" stopColor="#d97706" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
    </div>
  );
}
