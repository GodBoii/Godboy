"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { cacheManifest } from "@/lib/cacheManifest";

export function ClientCache({ enabled }: { enabled: boolean }) {
  const router = useRouter();

  useEffect(() => {
    if (!enabled) return;

    cacheManifest.routes.forEach((route) => {
      router.prefetch(route);
    });
  }, [enabled, router]);

  useEffect(() => {
    if (!enabled || !("serviceWorker" in navigator)) return;

    let cancelled = false;

    const warmClientCache = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js");
        const readyRegistration = await navigator.serviceWorker.ready;
        const worker =
          readyRegistration.active ||
          readyRegistration.waiting ||
          readyRegistration.installing ||
          registration.active;

        if (cancelled || !worker) return;

        worker.postMessage({
          type: "WARM_CACHE",
          payload: cacheManifest,
        });
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.warn("Client cache registration failed", error);
        }
      }
    };

    void warmClientCache();

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return null;
}

