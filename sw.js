const CACHE_NAME = 'card-input-v1';
const ASSETS = [
  'index.html',
  'manifest.json'
];

// התקנת ה-Service Worker ושמירת הקבצים ב-Cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// הפעלת ה-Service Worker וניקוי קאש ישן
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// אסטרטגיית Fetch: מנסה להביא מהרשת, אם אין אינטרנט מביא מה-Cache
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
