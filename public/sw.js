const CACHE_VERSION = "godboy-site-v2";
const PAGE_CACHE = `${CACHE_VERSION}-pages`;
const ASSET_CACHE = `${CACHE_VERSION}-assets`;
const CORE_ROUTES = ["/", "/work", "/studio", "/contact"];

const sameOrigin = (request) => new URL(request.url).origin === self.location.origin;

const cacheRequest = async (cacheName, request) => {
  const cache = await caches.open(cacheName);
  const response = await fetch(request);
  if (response && response.ok) {
    await cache.put(request, response.clone());
  }
  return response;
};

const warmCache = async (cacheName, urls) => {
  const cache = await caches.open(cacheName);
  await Promise.allSettled(
    urls.map(async (url) => {
      const request = new Request(url, { cache: "reload" });
      const response = await fetch(request);
      if (response.ok) {
        await cache.put(request, response);
      }
    })
  );
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(PAGE_CACHE).then((cache) => cache.addAll(CORE_ROUTES)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("godboy-site-") && !key.startsWith(CACHE_VERSION))
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type !== "WARM_CACHE") return;

  const routes = event.data.payload?.routes || [];
  const assets = event.data.payload?.assets || [];

  event.waitUntil(
    Promise.all([warmCache(PAGE_CACHE, routes), warmCache(ASSET_CACHE, assets)]).catch(
      () => undefined
    )
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET" || !sameOrigin(request)) return;

  const url = new URL(request.url);

  if (url.pathname.startsWith("/_next/") || url.pathname.startsWith("/media/")) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return cacheRequest(ASSET_CACHE, request);
      })
    );
    return;
  }

  if (request.mode === "navigate" || request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const fresh = cacheRequest(PAGE_CACHE, request).catch(() => cached || caches.match("/"));
        return cached || fresh;
      })
    );
  }
});
