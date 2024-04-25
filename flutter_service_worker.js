'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "19ca424ca52931f6a5f9654a4343107c",
"assets/AssetManifest.bin.json": "c7d4256303c7bef652e06f6c738c9f8e",
"assets/AssetManifest.json": "1515ce3ebe056a20a299e03802bc2339",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/fonts/MaterialIcons-Regular.otf": "4a7584585b1e1c083d64a0ffd13458c4",
"assets/lib/assets/1.jpg": "8ab9fbbc859ba530fcd9a84042100e04",
"assets/lib/assets/10.jpg": "471c663d6bb009476aebf76d0e4e7d28",
"assets/lib/assets/11.jpg": "3d3b5ae9e72e8de77e1c7e2fbf36c7bf",
"assets/lib/assets/12.jpeg": "f3dc69d35688d9803dfa684089141b58",
"assets/lib/assets/13.jpeg": "13c2ade1fce735e7c528d175541ba01d",
"assets/lib/assets/14.jpeg": "c7ee1cf0a7c81fb417538195f338d152",
"assets/lib/assets/15.jpeg": "2d7f1bf8f16913cc5fe1bb2c0dc6d6b7",
"assets/lib/assets/16.jpeg": "4994d16b4c28ca85e3f20746b8d0d391",
"assets/lib/assets/17.jpeg": "119bde73d7a15ec0fddb1d55b9f03167",
"assets/lib/assets/18.jpeg": "b216697cb5e22973d5e376db75740959",
"assets/lib/assets/19.jpeg": "998ac9ff46dbf6f90641d942d3a8ccae",
"assets/lib/assets/2.jpg": "92e60eba7ee2f0b8bb0e0f4275dd88f9",
"assets/lib/assets/20.jpeg": "dfbd767e99149294e94682fea1582eb4",
"assets/lib/assets/21.jpeg": "c54c9ad99446b0ff24f7d51130df076a",
"assets/lib/assets/22.jpeg": "8f1bc5a58fe7c7f21b79eebac9ff76f9",
"assets/lib/assets/23.jpeg": "fcf81a5e9f00ca9e1cf2b47a2b4c8dd1",
"assets/lib/assets/24.jpeg": "df1070a1a1a26ec5614e6552d14eac50",
"assets/lib/assets/25.jpeg": "b5a112a25c673a10b2f123445b9e1f16",
"assets/lib/assets/3.jpg": "a5d07d1cdccfb2b3b27e3db0dd211369",
"assets/lib/assets/4.jpg": "c7fc005d1ca65618e97ba16cbf43a777",
"assets/lib/assets/5.jpg": "c3eb13ce30b954ec5ade8f82dece385f",
"assets/lib/assets/6.jpg": "a24524c60d6ea16adf8cf6aad6b45e77",
"assets/lib/assets/7.jpg": "b442ce3d0465497eb5bd9f2a4df1daf6",
"assets/lib/assets/8.jpg": "c3b1e223756812bfa76920b239d8a3e2",
"assets/lib/assets/9.jpg": "82eb8c5ff69aed72b6f3196993e88cee",
"assets/NOTICES": "12aba17fb20f1eb557e50c640aeab8b6",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "c86fbd9e7b17accae76e5ad116583dc4",
"canvaskit/canvaskit.js.symbols": "38cba9233b92472a36ff011dc21c2c9f",
"canvaskit/canvaskit.wasm": "3d2a2d663e8c5111ac61a46367f751ac",
"canvaskit/chromium/canvaskit.js": "43787ac5098c648979c27c13c6f804c3",
"canvaskit/chromium/canvaskit.js.symbols": "4525682ef039faeb11f24f37436dca06",
"canvaskit/chromium/canvaskit.wasm": "f5934e694f12929ed56a671617acd254",
"canvaskit/skwasm.js": "445e9e400085faead4493be2224d95aa",
"canvaskit/skwasm.js.symbols": "741d50ffba71f89345996b0aa8426af8",
"canvaskit/skwasm.wasm": "e42815763c5d05bba43f9d0337fa7d84",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "c71a09214cb6f5f8996a531350400a9a",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "ee3062d335d0d63e3402c6902701dc5c",
"/": "ee3062d335d0d63e3402c6902701dc5c",
"main.dart.js": "1ba4db274977e22a807a1d403a51690b",
"manifest.json": "528e5f5e293dbb41aaf3925d52e5e644",
"version.json": "fc70c2d212d30a969efabfeaf65cb870"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
