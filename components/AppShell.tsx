"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Loader } from "@/components/Loader";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ClientCache } from "@/components/ClientCache";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const isInitial = useRef(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (loading) return;

    if (isInitial.current) {
      isInitial.current = false;
      // Animate the content entrance on initial page load
      gsap.fromTo(
        "[data-route]",
        { y: 40, opacity: 0, clipPath: "inset(8% 0 0 0)" },
        { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 1.15, ease: "expo.out", delay: 0.2 }
      );
      return;
    }

    // Slide black box UP to reveal new page
    gsap.set(".route-transition", { scaleY: 1, yPercent: 0, transformOrigin: "center center", opacity: 1 });
    gsap.to(".route-transition", { 
      yPercent: -100,
      duration: 1.2, 
      ease: "expo.inOut" 
    });

    gsap.fromTo(
      "[data-route]",
      { y: 60, scale: 0.98, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.1 }
    );
  }, [pathname, loading]);

  useEffect(() => {
    if (loading) return;
    const onClick = (event: MouseEvent) => {
      // Allow meta clicks to open in new tab
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      
      const target = event.target as Element | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;
      
      const url = new URL(anchor.href);
      // Ignore external links or same-page links (like anchors)
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      
      // Stop React / Next.js from handling this click!
      event.preventDefault();
      event.stopPropagation();

      // Expand black box from center vertically
      gsap.set(".route-transition", { 
        yPercent: 0, // Reset any previous yPercent
        scaleY: 0, 
        transformOrigin: "center center",
        opacity: 1
      });
      
      // Animate current page slightly out
      gsap.to("[data-route]", { y: -40, scale: 0.96, opacity: 0.3, duration: 1.2, ease: "expo.inOut" });

      gsap.to(".route-transition", {
        scaleY: 1,
        duration: 1.2,
        ease: "expo.inOut",
        onComplete: () => {
          router.push(url.pathname + url.search + url.hash);
          window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
        },
      });
    };
    
    // Use capture phase so we intercept before React's synthetic event system
    document.addEventListener("click", onClick, { capture: true });
    
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
    };
  }, [loading, router]);

  return (
    <>
      <Loader onDone={() => setLoading(false)} />
      <CustomCursor />
      <ClientCache enabled={!loading} />
      <SmoothScroll disabled={loading} />
      <div className="route-transition" aria-hidden="true"></div>
      <Navigation />
      <div data-route key={pathname}>
        {children}
      </div>
      <Footer />
    </>
  );
}

function CustomCursor() {
  useEffect(() => {
    const dot = document.querySelector<HTMLElement>(".cursor-dot");
    const ring = document.querySelector<HTMLElement>(".cursor-ring");
    if (!dot || !ring || !window.matchMedia("(pointer: fine)").matches) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;
    const move = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    const over = (event: Event) => {
      if ((event.target as Element)?.closest("a,button,label,input,textarea")) document.body.classList.add("cursor-active");
    };
    const out = () => document.body.classList.remove("cursor-active");
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, []);

  return (
    <>
      <span className="cursor-dot" aria-hidden="true" />
      <span className="cursor-ring" aria-hidden="true" />
    </>
  );
}
