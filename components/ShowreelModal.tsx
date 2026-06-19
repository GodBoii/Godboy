"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

export function ShowreelModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="video-overlay" role="dialog" aria-modal="true" aria-label="Showreel">
      <button className="video-close" onClick={onClose} aria-label="Close showreel">
        <X size={18} />
      </button>
      <video src="/media/aehteriaai-website.mp4" autoPlay muted loop playsInline controls />
    </div>
  );
}
