"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { selectedProjects } from "@/data/projects";
import { playgroundItems, services, stats } from "@/data/site";
import { Media } from "@/components/Media";
import { WorkRow } from "@/components/WorkRow";
import { FloatingPreview } from "@/components/FloatingPreview";
import { ShowreelModal } from "@/components/ShowreelModal";
import type { Project } from "@/lib/types";

export default function Home() {
  const [showreel, setShowreel] = useState(false);
  const [preview, setPreview] = useState<Project | null>(null);
  const [point, setPoint] = useState({ x: 0, y: 0 });

  return (
    <main>
      <section className="home-hero wrap">
        <h1 className="home-title" aria-label="Godboy">
          <span className="home-letter home-letter-g" aria-hidden="true">g</span>
          <span className="home-letter home-letter-o1" aria-hidden="true">o</span>
          <span className="home-letter home-letter-d" aria-hidden="true">d</span>
          <span className="home-letter home-letter-b" aria-hidden="true">b</span>
          <span className="home-letter home-letter-o2" aria-hidden="true">o</span>
          <span className="home-letter home-letter-y" aria-hidden="true">y</span>
        </h1>
        <button className="showreel" onClick={() => setShowreel(true)}>
          <span><Play size={18} fill="currentColor" /></span>
          Watch Showreel
          <small>2025-26</small>
        </button>
      </section>

      <section className="intro-grid wrap">
        <h2>Work</h2>
        <p>
          I design and build AI systems, agentic infrastructure, protocols, and motion-rich
          frontend surfaces from research and architecture through polished shipped interfaces.
        </p>
        <span>©2026</span>
      </section>

      <section className="home-work wrap">
        {selectedProjects.map((project) => (
          <WorkRow
            key={project.slug}
            project={project}
            onPreview={(item, event) => {
              setPreview(item);
              setPoint({ x: event.clientX, y: event.clientY });
            }}
            onLeave={() => setPreview(null)}
          />
        ))}
      </section>
      <FloatingPreview project={preview} point={point} />

      <section className="studio-summary wrap">
        <div>
          <h2>About Me</h2>
          <p>
            Godboy is my creative engineering lab: part AI systems studio, part protocol workshop,
            part motion-obsessed frontend practice. The goal is simple: build tools that feel
            powerful, strange, and actually usable.
          </p>
        </div>
        <Media src="/media/Godboy.png" alt="Prajwal portrait composition" />
        <div className="list-columns">
          <div>
            <h3>Services:</h3>
            <ul>{services.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <h3>Stats:</h3>
            <ul>{stats.map((item) => <li key={item.label}>{item.label} {item.value}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="playground wrap">
        <h2>Playground G7™</h2>
        <p>
          Experiments in agents, protocols, interfaces, and strange little systems. The point is
          to keep inventing in public until the rough thing becomes the obvious thing.
        </p>
        <ul className="playground-strip">
          {playgroundItems.map((item) => (
            <li key={item.title}>
              <Link href="/work">
                <Media src={item.media} alt={item.title} />
                <span>{item.title} - {item.year}<ArrowUpRight size={16} /></span>
              </Link>
            </li>
          ))}
        </ul>
        <strong className="z15-mark">G7</strong>
      </section>

      <ShowreelModal open={showreel} onClose={() => setShowreel(false)} />
    </main>
  );
}
