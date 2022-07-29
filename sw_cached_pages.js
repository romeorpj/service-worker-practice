// The lifecycle of a service worker is as follows:
// 1. The service worker is registered
// 2. The service worker is installed
// 3. The service worker is activated

// This is the service worker with the "cache" functionality
// It is used to cache the pages that are loaded by the app
// So if the app is offline, the app will load the cached pages and still work -- similar to mobile apps.

// Cache Data
// Name the cache,v1,v2 etc to represent the different cache instances you may have.
const cacheName = "v2";

// Create a variable of cache assets(files/elements you want to be saved in scached)
// Keep in mind that this method works because we only have a few small files to be cached.
// If you have a lot of files, you may want to use the "cacheAll" method.
const cacheAssets = ["/", "about.html", "style.css", "app.js"];

/* ----------------- STEP TWO(2): Install the service worker ---------------- */


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
