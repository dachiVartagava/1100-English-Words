// ⚠️ v3: index.html ახლა network-first-ია.
//
//    ადრე ყველაფერი cache-first იყო (`return cached || network`), მათ შორის
//    index.html. რადგან index.html ახალი ბილდის ჰეშირებულ ფაილებზე მიუთითებს,
//    ქეშირებული ძველი index.html სამუდამოდ ძველ JS-ს ტვირთავდა — ანუ ახალი
//    დეპლოი მომხმარებლამდე საერთოდ არ აღწევდა, სანამ ქეშის ვერსიას არ შეცვლი.
//
//    ახლა: HTML — ქსელიდან (ოფლაინში კეშიდან), ჰეშირებული ასეტები — კეშიდან
//    (მათი სახელი ბილდზე იცვლება, ამიტომ ძველი ვერსია ვერ "გაიჭედება").
const CACHE = "english-words-v3";
const BASE = "/1100-English-Words";

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      cache.addAll([
        BASE + "/",
        BASE + "/index.html",
        BASE + "/manifest.json",
      ]).catch(() => {})
    )
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // მხოლოდ იმავე ორიგინის GET (Supabase API, PayPal და ა.შ. ხელუხლებელი რჩება)
  if (req.method !== "GET" || url.origin !== self.location.origin) return;

  const isHTML =
    req.mode === "navigate" ||
    (req.headers.get("accept") || "").includes("text/html");

  if (isHTML) {
    // ── network-first: ახალი დეპლოი მაშინვე მიდის მომხმარებელთან ──
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.status === 200 && res.type === "basic") {
            const clone = res.clone();
            caches.open(CACHE).then((cache) => cache.put(req, clone));
          }
          return res;
        })
        .catch(() => caches.match(req).then((c) => c || caches.match(BASE + "/index.html")))
    );
    return;
  }

  // ── ასეტები: cache-first (სახელი ჰეშიანია, ძველი ვერსია ვერ გაიჭედება) ──
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        if (res && res.status === 200 && res.type === "basic") {
          const clone = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, clone));
        }
        return res;
      });
    })
  );
});
