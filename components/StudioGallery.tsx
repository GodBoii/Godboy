"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { studioGallery } from "@/data/site";
import { Media } from "@/components/Media";

export function StudioGallery() {
  const [index, setIndex] = useState(0);
  const active = studioGallery[index];
  const next = () => setIndex((value) => (value + 1) % studioGallery.length);
  const prev = () => setIndex((value) => (value - 1 + studioGallery.length) % studioGallery.length);

  return (
    <section className="studio-slider wrap">
      <div className="slider-meta">
        <span>{String(index + 1).padStart(2, "0")} / {String(studioGallery.length).padStart(2, "0")}</span>
        <p>{active.caption}</p>
      </div>
      <Media key={active.src} src={active.src} alt={active.caption} className="slider-media" />
      <div className="slider-controls">
        <button onClick={prev} disabled={index === 0} aria-label="Previous image"><ArrowLeft size={18} /></button>
        <button onClick={next} aria-label="Next image"><ArrowRight size={18} /></button>
      </div>
    </section>
  );
}
