// 轉生異世界的我 token 無限 — 離線快取(全量 precache + ignoreSearch)
const CACHE = 'comic-202607310939';
const PRECACHE = [
 "./",
 "./index.html",
 "./reader.css",
 "./reader.js",
 "./data.json",
 "./manifest.json",
 "./sw.js",
 "./icon-192.png",
 "./icon-512.png",
 "./imgs/ch01-p01.webp",
 "./imgs/ch01-p02.webp",
 "./imgs/ch01-p03.webp",
 "./imgs/ch01-p04.webp",
 "./imgs/ch01-p05.webp",
 "./imgs/ch01-p06.webp",
 "./imgs/ch01-p07.webp",
 "./imgs/ch01-p08.webp",
 "./imgs/ch01-p09.webp",
 "./imgs/ch01-p10.webp",
 "./imgs/ch01-p11.webp",
 "./imgs/ch01-p12.webp",
 "./imgs/ch01-p13.webp",
 "./imgs/ch01-p14.webp",
 "./imgs/ch01-p15.webp",
 "./imgs/ch01-p16.webp",
 "./imgs/ch01-p17.webp",
 "./imgs/ch01-p18.webp",
 "./imgs/ch01-p19.webp",
 "./imgs/ch01-p20.webp",
 "./imgs/ch01-p21.webp",
 "./imgs/ch01-p22.webp",
 "./imgs/ch01-p23.webp",
 "./imgs/ch01-p24.webp",
 "./imgs/ch01-p25.webp",
 "./imgs/ch01-p26.webp",
 "./imgs/ch01-p27.webp",
 "./imgs/ch01-p28.webp",
 "./imgs/ch01-p29.webp",
 "./imgs/ch01-p30.webp",
 "./imgs/ch01-p31.webp",
 "./imgs/ch01-p32.webp",
 "./imgs/ch01-p33.webp",
 "./imgs/ch01-p34.webp",
 "./imgs/ch01-p35.webp",
 "./imgs/ch01-p36.webp",
 "./imgs/ch01-p37.webp",
 "./imgs/ch01-p38.webp",
 "./imgs/ch01-p39.webp",
 "./imgs/ch01-p40.webp",
 "./imgs/ch01-p41.webp",
 "./imgs/ch01-p42.webp",
 "./imgs/ch01-p43.webp",
 "./imgs/ch01-p44.webp",
 "./imgs/ch01-p45.webp"
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request)));
});
