// Shreeja Learning Academy — offline app shell.
// Precaches the whole learner experience (lessons in all 4 languages, quizzes,
// certificates, and the Firebase SDK itself) so the app opens and works with
// no signal once a device has loaded it at least once. Firestore/Auth network
// calls are deliberately left alone here — the Firebase SDK has its own
// IndexedDB-backed offline queue for those (see firebase-config.js).
const CACHE_VERSION = "v1";
const CACHE_NAME = `shreeja-lms-${CACHE_VERSION}`;

const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./styles.css",
  "./app.js",
  "./admin.js",
  "./api.js",
  "./certificates.js",
  "./progress-client.js",
  "./i18n.js",
  "./data.js",
  "./firebase-config.js",
  "./assets/shreeja-logo.png",
  "./assets/nddb-logo.png",
  "./assets/nddb-dairy-services-logo.png",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/icon-maskable-512.png",
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js",
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js",
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

function isFirebaseSdkRequest(url) {
  return url.origin === "https://www.gstatic.com" && url.pathname.startsWith("/firebasejs/");
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;

  // Only handle our own app shell + the pinned Firebase SDK files. Everything
  // else (Firestore/Auth API calls, any other cross-origin request) passes
  // through untouched so the Firebase SDK's own offline handling applies.
  if (!sameOrigin && !isFirebaseSdkRequest(url)) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      const networkFetch = fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const resClone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          }
          return res;
        })
        .catch(() => null);

      if (cached) {
        // Stale-while-revalidate: serve the cached copy immediately (fast,
        // works offline), refresh the cache for next time in the background.
        event.waitUntil(networkFetch);
        return cached;
      }
      return networkFetch.then((res) => res || new Response("Offline and not cached yet.", { status: 503 }));
    })
  );
});
