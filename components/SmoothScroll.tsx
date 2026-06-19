"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll({ disabled }: { disabled?: boolean }) {
  useEffect(() => {
    if (disabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.82,
      touchMultiplier: 1.2,
      smoothWheel: true,
    });
    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [disabled]);

  return null;
}
