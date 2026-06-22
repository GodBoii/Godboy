import { services, stats } from "@/data/site";
import { StudioGallery } from "@/components/StudioGallery";
import { TextReveal } from "@/components/TextReveal";
import { Media } from "@/components/Media";

export default function StudioPage() {
  return (
    <main>
      <section className="studio-hero wrap">
        <TextReveal as="h1" className="mega">{"Prajwal\nGodBoii"}</TextReveal>
        <p>
          I am Prajwal Ghadge, building in public as GodBoii. GitHub, Aetheria, and MTPX are the
          center of the work: AI operating-system experiments, model-tool runtimes, agent backends,
          Python research code, and the web surfaces that make those systems understandable.
        </p>
      </section>
      <StudioGallery />
      <section className="service-ledger wrap">
        <h2>Services</h2>
        {services.map((service, index) => (
          <div key={service}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{service}</strong>
          </div>
        ))}
      </section>
      <section className="editorial-pair wrap">
        <div>
          <h2>Research into runnable things</h2>
          <p>
            The projects move between two modes: low-level experiments like PCA, MTPX, voice
            classifiers, and LLM scripts, and product surfaces like Aetheria AI, AI-OS websites,
            Polymarket dashboards, and Pawsitive Strides.
          </p>
        </div>
        <Media src="/media/prajwal.png" alt="Prajwal portrait" />
        <Media src="/media/image copy 3.png" alt="Team bonding at its finest" />
      </section>
      <section className="manifest wrap">
        <p>
          The throughline is practical autonomy: tools that can browse, call functions, execute
          code, manage context, talk to services, and still be visible enough for a human to steer.
        </p>
        <Media src="/media/image copy 8.png" alt="Working hard or hardly working" />
      </section>
      <section className="people wrap">
        <h2>Public, specific, verifiable</h2>
        <p>
          The project archive includes polished systems and early learning repos. They are shown
          together on purpose: the site explains what each repo actually is, without inflating
          small utilities into fake case studies.
        </p>
      </section>
      <section className="stats-row wrap">
        {stats.map((item) => (
          <div key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>
    </main>
  );
}
