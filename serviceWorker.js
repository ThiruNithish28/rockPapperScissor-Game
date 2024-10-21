// There are tottaly 5 step as to follow for create the service Work 

//step1 : create the cach name
const staticRockPaperSisscors = "rock-paper-sissors-v1";
//step2 : assign the assets
const assets =[
    "/",
    "/index.html",
    "/style.css",
    "/script.js",
    "/assest/images/win.png",
    "/assest/images/tie.png",
    "/assest/images/loss.png"
]

//step3: create the self event listener

self.addEventListener("install", installEvent =>{
    installEvent.waitUntil( // waitUntil -> waits for the action to finish.
        caches.open(staticRockPaperSisscors).then(cache =>{
            cache.addAll(assets); //adding the assets to cache which we created 
        })
    )
})

//step4: fetch the cache
self.addEventListener("fetch",fetchEvent=>{
    fetchEvent.respondWith( // "respondWith()" -> This method tells the browser to respond to the network request with the result of a custom action
        caches.match(fetchEvent.request).then(res=>{
            return res || fetch(fetchEvent.request)
        })
        // cache.match()-> This line checks if the resource being requested (fetchEvent.request) is already available in the cache.
    )
})

//step 5:
/* Register the service work in app.js or index.js */


/* --------------------------- */
//Fetch:
/*The fetch event triggers every time the browser makes a network request. By intercepting the fetch event, you can control how the request is handled, allowing you to serve cached content or perform other actions.
eg: 
 Imagine you're a restaurant server, and every time a customer orders food (a network request), you intercept that order. If the kitchen (the network) is too slow or unavailable, you can offer some pre-cooked food you have stored (cached resources) instead.
 */

 //.then(res => { return res || fetch(fetchEvent.request); })
 /*
 What it is: This then block is a promise that handles the result of cache.match. If the resource (res) is found in the cache, it returns that cached resource. If not, it proceeds to fetch the resource from the network.
res: The cached resource (if found).
fetch(fetchEvent.request): If the cache doesn’t have the requested file, this will attempt to fetch it from the network.
 */

//note: 
/* 
    * When a fetch event (i.e., a network request) occurs, the service worker tries to serve content from the cache.
    *If the requested file is found in the cache, it is served from there (which is faster and works offline).
   *If the file is not cached, the service worker will fetch it from the network, and you could also cache that file after fetching for future offline access. 
*/
// Q1:What if the request to cache is not found when user is in offline ?
/*
If the user is offline and requests a resource that is not present in the cache, the service worker won’t be able to fetch the resource from the network because the device is offline. As a result, the request will fail. In this scenario, the service worker can handle the failure gracefully by either:

Returning a fallback response, such as a custom offline page or message.
Notifying the user that the requested resource is unavailable due to a lack of internet connection.
Here's how you can modify the service worker to provide a fallback response when the user is offline and a requested resource isn’t cached:
code:
self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(cachedResponse => {
      // If the resource is found in cache, return it
      if (cachedResponse) {
        return cachedResponse;
      }

      // If the resource is not in cache, try to fetch it from the network
      return fetch(fetchEvent.request).catch(() => {
        // If the user is offline and the resource isn't in cache, return a fallback page or message
        return caches.match('/offline.html');  // Serve an offline fallback page
      });
    })
  );
});

*/
