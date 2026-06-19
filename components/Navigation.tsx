"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Instagram, Twitter, Linkedin, Github } from "lucide-react";
import { navLinks, socials } from "@/data/site";
import { cx } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-nav">
      <div className="wrap nav-grid">
        <Link href="/" className="brand" onClick={() => setOpen(false)} aria-label="Studio home">
          Prajwal®
        </Link>
        <span className="nav-label">7.15.4.2.15.25</span>
        <nav className={cx("nav-links", open && "is-open")} aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cx(pathname === link.href && "active")}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <nav className="nav-social" aria-label="Social links">
          <a href="https://www.instagram.com/7.15.4.2.15.25/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
          <a href="https://x.com/Godboiiiiii" target="_blank" rel="noreferrer" aria-label="Twitter"><Twitter size={18} /></a>
          <a href="https://www.threads.com/@7.15.4.2.15.25" target="_blank" rel="noreferrer" aria-label="Threads">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 12a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"/><path d="M12 18c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6c0 1.1-.9 2-2 2s-2-.9-2-2v-4"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/prajwal-ghadge-44a1a1242/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
          <a href="https://github.com/GodBoii" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
        </nav>
        <span className="nav-location">india / remote</span>
        <button className="menu-button" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
    </header>
  );
}
