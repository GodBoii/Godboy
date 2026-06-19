"use client";

import { useEffect, useRef, useState } from "react";

export function Loader({ onDone }: { onDone: () => void }) {
  const [value, setValue] = useState(0);
  const [hidden, setHidden] = useState(false);
  const doneRef = useRef(onDone);

  useEffect(() => {
    doneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    const start = Date.now();
    const duration = 1150;
    const interval = window.setInterval(() => {
      const progress = Math.min(1, (Date.now() - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.min(100, Math.round(eased * 100)));
    }, 32);
    const finish = window.setTimeout(() => {
      window.clearInterval(interval);
      setValue(100);
      document.querySelector(".loader")?.classList.add("is-leaving");
      window.setTimeout(() => {
        setHidden(true);
        doneRef.current();
      }, 520);
    }, duration + 120);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(finish);
    };
  }, []);

  if (hidden) return null;

  return (
    <div className="loader" aria-live="polite" aria-label="Loading site">
      <div className="loader-window">
        <span className="loader-number">{value}</span>
      </div>
    </div>
  );
}
