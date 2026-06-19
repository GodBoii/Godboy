import Link from "next/link";
import { X } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="contact-overlay-page">
      <Link href="/" className="contact-close" aria-label="Close contact">
        <X size={22} />
      </Link>
      <section className="contact-hero wrap">
        <p className="eyebrow">start a project</p>
        <h1>Let&apos;s collaborate!</h1>
      </section>
      <div className="wrap"><ContactForm /></div>
    </main>
  );
}
