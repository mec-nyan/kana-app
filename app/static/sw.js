const VERSION = "v0.1.0";

const CACHE_NAME = `kana-app-${VERSION}`;

const APP_STATIC_RESOURCES = [
	"/",
	"/index.html",
	"/styles.css",
	"/main.js",
	"/fonts/HackNerdFont-Regular.ttf",
	"/fonts/HackNerdFontPropo-Regular.ttf",
	"/icons/kapp.png",
	"/icons/kapp.svg"
]

self.addEventListener("install", (e) => {
	e.waitUntil(
		(async () => {
			const cache = await caches.open(CACHE_NAME);
			cache.addAll(APP_STATIC_RESOURCES);
		})
	)
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
				})
			);
			await clients.claim();
		})
	)
})
