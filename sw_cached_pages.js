/* -------------------------------------------------------------------------- */
/*                      SERVICE WORKER LIFECYCLE & EVENTS                     */
/* -------------------------------------------------------------------------- */

// !LIFECYCLE
// 1. Installing - start of registration - setup offline cache resources
// 2. Installed - setup complete, waiting for other SWs to close
// 3. Activating - Remove old caches
// 4. Activated - The SW can handle fetch events
// 5. Redundant - The SW is being replaced by a new one

// !EVENTS:
// install - when the service worker is first installed
// activate - when the service worker is first activated
// message - when a message is sent to the service worker
// fetch - when a fetch event is fired
// sync - when a sync event is fired
// push - when a push event is fired

// !SERVICE WORKERS
// It is used to cache the pages that are loaded by the app
// So if the app is offline, the app will load the cached pages and still work -- similar to mobile apps.

// Cache Data
// Name the cache,v1,v2 etc to represent the different cache instances you may have.
const cacheName = "v2";

// Create a variable of cache assets(files/elements you want to be saved in scached)
// Keep in mind that this method works because we only have a few small files to be cached.
// If you have a lot of files, you may want to use the "cacheAll" method.
const cacheAssets = ["/", "about.html", "style.css", "app.js"];

/* ----------------- STEP TWO(2): INSTALL THE SERVICE WORKER ---------------- */


// Call Install EventListener
// This event is where we handle caching of the assets
self.addEventListener("install", (event) => {
	console.log("Service Worker: Installed");

	// wait until tells the browser to keep the service worker open until the promise is resolved
	// .open returns a promise
	event.waitUntil(
		caches
			.open(cacheName) // open the cache using the cacheName defined above
			.then((cache) => {
				console.log("Service Worker: Caching Files");
				cache.addAll(cacheAssets); // add the cacheAssets to the cache
			})
			.then(() => self.skipWaiting()) // tells the browser to activate the service worker immediately
	);
});

/* ----------------- STEP THREE(3): ACTIVATE EVENT LISTENER ----------------- */


// now activate that thang, Call Activate EventListener
// activate event gets rid of any unwanted caches so that we can serve up the right cache. old cache begone
self.addEventListener("activate", (event) => {
    console.log("Service Worker: Activated");
    // remove unwanted caches
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== cacheName) {
                        console.log("Service Worker: Clearing Old Cache");
                        return caches.delete(cache);
                    }
                })
            );
        })
    )
});


/* ------------------------ Call Fetch EventListener ------------------------ */
// This is how you serve up the cached pages
self.addEventListener("fetch", (event) => {
    console.log("Service Worker: Fetching");
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});