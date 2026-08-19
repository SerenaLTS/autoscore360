(() => {
  if (!window.L || !window.truckDealerMapConfig) return;
  const config = window.truckDealerMapConfig;
  const map = L.map("truck-dealer-map", { scrollWheelZoom: false });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "&copy; OpenStreetMap contributors" }).addTo(map);
  const bounds = [], markers = [], buttons = [...document.querySelectorAll("#truck-dealer-list [data-dealer]")];
  const escapeHTML = value => String(value).replace(/[&<>'"]/g, character => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[character]);
  const selectDealer = (index, move = true) => {
    buttons.forEach((button, buttonIndex) => button.classList.toggle("is-active", buttonIndex === index));
    const marker = markers[index];
    if (!marker) return;
    if (move) map.flyTo(marker.getLatLng(), config.focusZoom || 13, { duration: .65 });
    marker.openPopup();
    buttons[index]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  };
  config.dealers.forEach((dealer, index) => {
    const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dealer.address)}`;
    const popup = `<div class="dealer-popup"><strong>${escapeHTML(dealer.name)}</strong><span>${escapeHTML(dealer.brands)}<br>${escapeHTML(dealer.address)}<br>${escapeHTML(dealer.services)}<br>${escapeHTML(dealer.phone)}</span><a href="${directions}" target="_blank" rel="noopener">Directions</a><a href="${escapeHTML(dealer.website)}" target="_blank" rel="noopener">Dealer source</a></div>`;
    const icon = L.divIcon({ className: "dealer-map-marker", html: `<span>${escapeHTML(dealer.marker)}</span>`, iconSize: [1,1], iconAnchor: [0,0], popupAnchor: [0,-34] });
    const marker = L.marker([dealer.lat, dealer.lng], { icon, title: `${dealer.name} — ${dealer.brands}` }).addTo(map).bindPopup(popup);
    marker.on("click", () => selectDealer(index, false));
    markers.push(marker); bounds.push([dealer.lat, dealer.lng]);
  });
  buttons.forEach(button => button.addEventListener("click", () => selectDealer(Number(button.dataset.dealer))));
  map.fitBounds(bounds, { padding: [28,28], maxZoom: config.maxZoom || 8 });
})();
