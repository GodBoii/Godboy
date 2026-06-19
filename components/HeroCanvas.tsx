"use client";

import { useEffect, useRef } from "react";

export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let time = 0;
    const resize = () => {
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = Math.min(window.innerHeight * 0.72, 760) * devicePixelRatio;
    };
    const draw = () => {
      time += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 0.78;
      for (let i = 0; i < 16; i += 1) {
        const x = canvas.width * (0.18 + i * 0.048 + Math.sin(time + i) * 0.012);
        const y = canvas.height * (0.42 + Math.cos(time * 1.4 + i) * 0.16);
        ctx.strokeStyle = i % 4 === 0 ? "#ff3928" : "#1a1a1a";
        ctx.lineWidth = devicePixelRatio;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + canvas.width * 0.12, y + Math.sin(time * 2 + i) * 90);
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas className="hero-canvas" ref={ref} aria-hidden="true" />;
}
