import { services, stats } from "@/data/site";
import { StudioGallery } from "@/components/StudioGallery";
import { TextReveal } from "@/components/TextReveal";
import { Media } from "@/components/Media";

export default function StudioPage() {
  return (
    <main>
      <section className="studio-hero wrap">
        <TextReveal as="h1" className="mega">{"Studio\n2026©"}</TextReveal>
        <p>
          I am Prajwal, building under Godboy: AI systems, protocols, agent tooling, and expressive
          frontend surfaces. The work lives between research and interface, where abstract systems
          become something a person can actually use.
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
          <h2>Fun is the key to happiness</h2>
          <p>
            The best technical work still needs play. Protocols, agents, and runtimes become more
            useful when the interface has rhythm, clarity, and a little nerve.
          </p>
        </div>
        <Media src="/media/prajwal.png" alt="Prajwal portrait" />
        <Media src="/media/image copy 3.png" alt="Team bonding at its finest" />
      </section>
      <section className="manifest wrap">
        <p>
          Build the thing with a little danger in it. Make the code dependable. Make the surface
          alive. Let research, tooling, and design sit at the same table.
        </p>
        <Media src="/media/image copy 8.png" alt="Working hard or hardly working" />
      </section>
      <section className="people wrap">
        <h2>People over profit</h2>
        <p>
          I value transparency, care, learning, and craft. The best digital work is not a pile of
          effects; it is trust made visible through every detail.
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
