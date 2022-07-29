// Always start by  making sure service workers are supported
// Alternatively you can do if navigator.serviceworker

/* ---------------- STEP ONE(1): REGISTER THE SERVICE WORKER ---------------- */

// STEP ONE(1)
if ("serviceWorker" in navigator) {
	// you want the service worker to load on page load
	window.addEventListener("load", () => {
		// register the service worker (returns a promise)
		navigator.serviceWorker
			.register("./sw_cached_pages.js")
			.then((reg) => console.log("Service Worker: Registered"))
			.catch((err) => console.log("Service Worker: Error: ", err));
	});
}

