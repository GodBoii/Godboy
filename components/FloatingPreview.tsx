"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { Project } from "@/lib/types";
import { Media } from "@/components/Media";

export function FloatingPreview({
  project,
  point,
}: {
  project: Project | null;
  point: { x: number; y: number };
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: point.x,
      y: point.y,
      xPercent: -50,
      yPercent: -50,
      opacity: project ? 1 : 0,
      clipPath: project ? "inset(0% 0% 0% 0%)" : "inset(48% 0% 48% 0%)",
      duration: 0.45,
      ease: "expo.out",
    });
  }, [point, project]);

  return (
    <div className="floating-preview" ref={ref} aria-hidden="true">
      {project && <Media src={project.media} alt="" />}
      <span>{project?.title}</span>
    </div>
  );
}
