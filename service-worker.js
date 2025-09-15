// Versioned cache name — increment this whenever you update files
const CACHE_NAME = "pwa-cache-v2"; // change v2 each update
const urlsToCache = [
  "/",                        // index.html
  "/index.html",
  "/manifest.json",
  "/style.css",
  "/icon-192.png",
  "/icon-512.png",
  "/background.jpg",
  "/pdfs/Emergency Safety Plan Template Larry Sanchez.pdf"
];

// Install Service Worker and cache files
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing and caching files...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate Service Worker and remove old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...");
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("Service Worker: Removing old cache:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Intercept fetch requests — serve from cache first, then network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
