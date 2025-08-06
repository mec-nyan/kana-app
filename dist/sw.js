const VERSION = "v0.1.0-16bis";

const CACHE_NAME = `kana-app-${VERSION}`;

const GPATH = "/kana-app";
const ASSETS = `${GPATH}/assets`;

const APP_STATIC_RESOURCES = [
	`${GPATH}/`,
	`${GPATH}/index.html`,
	`${GPATH}/kanaapp.json`,
	`${GPATH}/sw.js`,
	`${GPATH}/icons/kapp.png`,
	`${GPATH}/icons/kapp.svg`,
	`${GPATH}/screenshots/home.png`,
	`${GPATH}/screenshots/home-wide.png`,
	`${GPATH}/sounds/jp_sounds.mp3`,
	`${ASSETS}/HackNerdFontPropo-Regular.ttf`,
	`${ASSETS}/index.css`,
	`${ASSETS}/index.js`,
]

self.addEventListener("install", (e) => {
	e.waitUntil(
		(async () => {
			const cache = await caches.open(CACHE_NAME);
			cache.addAll(APP_STATIC_RESOURCES);
		})(),
	);
})

self.addEventListener("activate", (e) => {
	e.waitUntil(
		(async () => {
			const names = await caches.keys();
			await Promise.all(
				names.map((name) => {
					if (name !== CACHE_NAME) {
						return caches.delete(name);
					}
					return undefined;
				}),
			);
			await clients.claim();
		})(),
	);
});

self.addEventListener("fetch", (e) => {
	if (e.request.mode === "navigate") {
		e.respondWith(caches.match(`${GPATH}/`));
		return;
	}

	e.respondWith(
		(async () => {
			const cache = await caches.open(CACHE_NAME);
			const cachedResponse = await cache.match(e.request.url);
			if (cachedResponse) {
				return cachedResponse;
			}
			try {
				const resp = await fetch(e.request);
				return resp;
			} catch (err) {
				return new Response(null, { status: 404 });
			}
		})(),
	);
});
