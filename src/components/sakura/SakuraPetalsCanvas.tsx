"use client";

import React, { useEffect, useRef } from "react";

interface SakuraCanvasProps {
  layer?: "background" | "foreground";
  petalCount?: number;
  className?: string;
  enableWindRepulsion?: boolean;
}

interface Petal {
  x: number;
  y: number;
  z: number; // Depth factor (0.3 to 1.5)
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  color: string;
  opacity: number;
  vx: number; // velocity impulse from cursor
  vy: number;
}

const SAKURA_COLORS = [
  "rgba(255, 183, 197, ", // Classic Sakura Pink
  "rgba(255, 209, 220, ", // Soft Blush
  "rgba(244, 164, 180, ", // Muted Rose
  "rgba(255, 228, 225, ", // Mist Pink
  "rgba(255, 240, 245, ", // Lavender Blush
];

export default function SakuraPetalsCanvas({
  layer = "background",
  petalCount,
  className = "",
  enableWindRepulsion = true,
}: SakuraCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, prevX: -1000, prevY: -1000, speed: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Reduced motion check
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Density calculation based on layer and device width
    const isMobile = width < 768;
    const defaultCount = layer === "foreground" 
      ? (isMobile ? 10 : 20) 
      : (isMobile ? 18 : 36);
    const count = petalCount ?? defaultCount;

    const petals: Petal[] = [];

    const createPetal = (initialY?: number): Petal => {
      const z = layer === "foreground" 
        ? 1.1 + Math.random() * 0.6 // Larger, closer to camera
        : 0.35 + Math.random() * 0.65; // Smaller, behind subject
      
      const baseSize = layer === "foreground" ? 14 : 9;

      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : Math.random() * height,
        z,
        size: (baseSize + Math.random() * 6) * z,
        speedX: (Math.random() * 1.2 - 0.4) * z,
        speedY: (0.8 + Math.random() * 1.2) * z,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() * 1.5 - 0.75) * 0.02,
        flip: Math.random() * Math.PI,
        flipSpeed: (Math.random() * 0.03 + 0.01),
        color: SAKURA_COLORS[Math.floor(Math.random() * SAKURA_COLORS.length)],
        opacity: (0.45 + Math.random() * 0.45) * (layer === "foreground" ? 0.9 : 0.75),
        vx: 0,
        vy: 0,
      };
    };

    // Populate petals with random initial Y distribution
    for (let i = 0; i < count; i++) {
      petals.push(createPetal(Math.random() * height));
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - mouseRef.current.prevX;
      const dy = e.clientY - mouseRef.current.prevY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      mouseRef.current.speed = Math.min(dist, 40);
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    if (enableWindRepulsion) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Global simulated breeze
      const globalWind = Math.sin(time * 0.8) * 0.6 + 0.3;

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        if (!prefersReducedMotion) {
          // Physics: wind & gravity
          p.x += (p.speedX + globalWind * p.z) + p.vx;
          p.y += p.speedY + p.vy;
          p.rotation += p.rotationSpeed;
          p.flip += p.flipSpeed;

          // Friction on cursor impulse
          p.vx *= 0.92;
          p.vy *= 0.92;

          // Katana / Cursor wind repulsion
          if (enableWindRepulsion && mouseRef.current.speed > 3) {
            const dx = p.x - mouseRef.current.x;
            const dy = p.y - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const radius = layer === "foreground" ? 140 : 90;

            if (dist < radius && dist > 0) {
              const force = (1 - dist / radius) * (mouseRef.current.speed * 0.25);
              p.vx += (dx / dist) * force;
              p.vy += (dy / dist) * force * 0.6;
            }
          }

          // Respawn at top or side when out of bounds
          if (p.y > height + 40) {
            petals[i] = createPetal(-20);
          } else if (p.x > width + 40) {
            petals[i].x = -20;
          } else if (p.x < -40) {
            petals[i].x = width + 20;
          }
        }

        // Render natural cherry petal curved geometry
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        // 3D tumble flip effect by scaling along Y
        const scaleY = Math.sin(p.flip);
        ctx.scale(1, scaleY);

        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.beginPath();

        // Organic curved sakura petal silhouette
        const w = p.size;
        const h = p.size * 1.35;
        ctx.moveTo(0, -h * 0.5);
        ctx.bezierCurveTo(w * 0.5, -h * 0.4, w * 0.6, h * 0.2, 0, h * 0.5);
        ctx.bezierCurveTo(-w * 0.6, h * 0.2, -w * 0.5, -h * 0.4, 0, -h * 0.5);
        ctx.closePath();
        ctx.fill();

        // Subtle petal spine / vein highlight
        if (layer === "foreground" && p.z > 1.2) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${p.opacity * 0.35})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(0, -h * 0.4);
          ctx.lineTo(0, h * 0.35);
          ctx.stroke();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Pause rendering when tab is not visible to save CPU/battery
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (enableWindRepulsion) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [layer, petalCount, enableWindRepulsion]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none select-none ${className}`}
      aria-hidden="true"
    />
  );
}
