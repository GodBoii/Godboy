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
          <div><span>Stack / signals</span><strong>{project.awards.join(" / ")}</strong></div>
          <div>
            <span>Links</span>
            <strong>
              {project.repoUrl ? <a href={project.repoUrl} target="_blank" rel="noreferrer">GitHub</a> : "Public metadata"}
              {project.liveUrl ? <> / <a href={project.liveUrl} target="_blank" rel="noreferrer">Live</a></> : null}
            </strong>
          </div>
        </div>
        <p>{project.excerpt}</p>
        <ul className="tag-list">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
        <Media src={project.video || project.media} alt={`${project.title} case-study hero`} className="case-hero-media" />
      </section>
      <section className="case-info wrap">
        <span>01</span>
        <p>
          {project.title} is listed from public GitHub metadata, README content where available,
          and deployed links where the repository exposes one. The description stays narrow when
          a repo has limited public documentation.
        </p>
        <ul>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
      </section>
      <CaseModules modules={caseModules} nextProject={nextProject} />
    </main>
  );
}
