"use client";

import { useState } from "react";
import { FloatingPreview } from "@/components/FloatingPreview";
import { WorkRow } from "@/components/WorkRow";
import { projects } from "@/data/projects";
import type { Project } from "@/lib/types";

export default function WorkPage() {
  const [preview, setPreview] = useState<Project | null>(null);
  const [point, setPoint] = useState({ x: 0, y: 0 });

  return (
    <main className="work-page wrap">
      <section className="work-top">
        <p className="eyebrow">projects</p>
        <h1>Select work<br />2024/current</h1>
      </section>
      <div className="work-table-head">
        <span>projects</span>
        <span>client</span>
        <span>work type</span>
        <span>year</span>
      </div>
      <section>
        {projects.map((project) => (
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
    </main>
  );
}
