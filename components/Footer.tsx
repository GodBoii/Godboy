import Link from "next/link";
import { footerSocials } from "@/data/site";

export function Footer() {
  return (
    <footer className="footer wrap">
      <Link href="/" className="footer-mark" aria-label="Home" />
      <nav className="footer-links" aria-label="Footer navigation">
        <Link href="/work">Work</Link>
        <Link href="/studio">Studio</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <span>©Godboy 2026</span>
      <nav className="footer-social" aria-label="Social links">
        {footerSocials.map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
