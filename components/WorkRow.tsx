"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/lib/types";

export function WorkRow({
  project,
  onPreview,
  onLeave,
}: {
  project: Project;
  onPreview?: (project: Project, event: React.MouseEvent) => void;
  onLeave?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      ref.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 95%",
        },
      }
    );
  }, []);

  return (
    <Link
      ref={ref}
      href={`/work/${project.slug}`}
      className="work-row"
      onMouseEnter={(event) => onPreview?.(project, event)}
      onMouseMove={(event) => onPreview?.(project, event)}
      onMouseLeave={onLeave}
    >
      <span className="work-cell work-number">{project.number}</span>
      <span className="work-cell work-title">
        <span>{project.title}</span>
        <small>{project.category}</small>
      </span>
      <span className="work-cell work-client">{project.client}</span>
      <span className="work-cell work-type">
        {project.type}
        <small>{project.awards.join(" / ")}</small>
      </span>
      <span className="work-cell work-year">{project.year}</span>
    </Link>
  );
}
