import Link from "next/link";
import type { CaseModule, Project } from "@/lib/types";
import { Media } from "@/components/Media";

export function CaseModules({
  modules,
  nextProject,
}: {
  modules: CaseModule[];
  nextProject: Project;
}) {
  return (
    <>
      {modules.map((module, index) => {
        if (module.type === "full") {
          return (
            <section className="case-module wrap" key={index}>
              <Media src={module.media} alt={module.caption} className="case-full" />
              <p className="module-caption">01 / {module.caption}</p>
            </section>
          );
        }
        if (module.type === "pair") {
          return (
            <section className="case-pair wrap" key={index}>
              <Media src={module.left} alt={module.caption} />
              <Media src={module.right} alt={module.caption} />
              <p className="module-caption">02 03 / {module.caption}</p>
            </section>
          );
        }
        if (module.type === "textMedia") {
          return (
            <section className={`case-text-media wrap ${module.align}`} key={index}>
              <div>
                <p className="eyebrow">process</p>
                <h2>{module.title}</h2>
                <p>{module.body}</p>
              </div>
              <Media src={module.media} alt={module.title} />
            </section>
          );
        }
        if (module.type === "quote") {
          return (
            <section className="case-quote wrap" key={index}>
              <blockquote>{module.quote}</blockquote>
            </section>
          );
        }
        return (
          <section className="case-stats wrap" key={index}>
            {module.items.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </section>
        );
      })}
      <section className="case-cta wrap">
        <Link href="/contact">Let&apos;s collaborate</Link>
      </section>
      <section className="next-project wrap">
        <span>Next Project</span>
        <Link href={`/work/${nextProject.slug}`}>{nextProject.title}</Link>
      </section>
    </>
  );
}
