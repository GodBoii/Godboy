import { notFound } from "next/navigation";
import { caseModules } from "@/data/caseModules";
import { projects } from "@/data/projects";
import { getNextProject, getProject } from "@/lib/utils";
import { Media } from "@/components/Media";
import { TextReveal } from "@/components/TextReveal";
import { CaseModules } from "@/components/case-study/CaseModules";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const nextProject = getNextProject(project.slug);

  return (
    <main>
      <section className="case-hero wrap">
        <TextReveal as="h1" className="case-title">{project.title}</TextReveal>
        <div className="case-meta">
          <div><span>Timeframe</span><strong>{project.timeframe}</strong></div>
          <div><span>Godboy role</span><strong>{project.role}</strong></div>
          <div><span>Accolades</span><strong>{project.awards.join(" / ")}</strong></div>
          <div><span>Link</span><strong>Visit Site</strong></div>
        </div>
        <p>{project.excerpt}</p>
        <ul className="tag-list">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
        <Media src={project.video || project.media} alt={`${project.title} case-study hero`} className="case-hero-media" />
      </section>
      <section className="case-info wrap">
        <span>01</span>
        <p>
          {project.title} is presented as a complete digital system: architecture, interface rhythm,
          product storytelling, motion, and a frontend foundation that can keep expanding.
        </p>
        <ul>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
      </section>
      <CaseModules modules={caseModules} nextProject={nextProject} />
    </main>
  );
}
