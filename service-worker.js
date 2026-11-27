const SHELL_CACHE = 'taxinfo-shell-v20261127';
const ASSET_CACHE = 'taxinfo-assets-v20261127';
const APP_SHELL_PATHS = [
  '/',
  '/index.html',
  '/cyprus-tax-guide-2026.html',
  '/about.html',
  '/privacy.html',
  '/terms.html',
  '/cookies.html',
  '/offline.html',
  '/manifest.webmanifest',
  '/images/icon-192.png',
  '/images/icon-512.png',
  '/images/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then(cache => cache.addAll(APP_SHELL_PATHS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames
        .filter(name => name.startsWith('taxinfo-') && name !== SHELL_CACHE && name !== ASSET_CACHE)
        .map(name => caches.delete(name))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  if (isStaticAsset(request, url)) {
    const refresh = refreshAsset(request);
    event.waitUntil(refresh);
    event.respondWith(cachedAsset(request, refresh));
  }
});

function isStaticAsset(request, url) {
  if (request.destination === 'style' || request.destination === 'script') return true;
  if (request.destination === 'image' || request.destination === 'font') return true;
  return /\.(?:css|js|png|jpg|jpeg|svg|webp|ico|woff2?)$/i.test(url.pathname);
}

async function networkFirst(request) {
  const cache = await caches.open(SHELL_CACHE).catch(() => null);

  try {
    const response = await fetch(request, { cache: 'no-cache' });
    if (response.ok && cache) {
      await cache.put(request, response.clone()).catch(() => {});
    }
    return response;
  } catch (_) {
    const cached = await cache?.match(request).catch(() => undefined);
    if (cached) {
      const html = await cached.text();
      const notice = '<aside role="status" style="position:relative;z-index:10000;padding:1rem;background:#fff3cd;color:#332701">Offline copy: rates and deadlines may have changed. Reconnect and reload before relying on this information.</aside>';
      return new Response(html.replace(/<body([^>]*)>/i, '<body$1>' + notice), {
        headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' }
      });
    }
    return (await cache?.match('/offline.html').catch(() => undefined)) || new Response('Offline. Reconnect to view this page.', { status: 503 });
  }
}

async function refreshAsset(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      await caches.open(ASSET_CACHE)
        .then(cache => cache.put(request, response.clone()))
        .catch(() => {});
    }
    return response;
  } catch (_) {
    return Response.error();
  }
}

async function cachedAsset(request, refresh) {
  const cached = await caches.match(request, { cacheName: ASSET_CACHE }).catch(() => undefined);
  return cached || refresh;
}
