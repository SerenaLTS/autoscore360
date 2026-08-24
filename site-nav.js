(() => {
  const current = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  const groups = {
    home: ["index.html"],
    hubs: [
      "vehicle-hubs.html", "ute-glossary.html", "phev-ute-status-australia.html",
      "chinese-utes.html", "japanese-utes.html", "other-utes.html",
      "trucks.html", "truck-sales-sydney.html", "truck-dealers-victoria.html",
      "truck-dealers-south-australia.html", "truck-dealers-western-australia.html",
      "truck-dealers-northern-territory.html", "truck-dealers-act.html"
    ],
    brands: [
      "brands.html", "ford.html", "hilux.html", "triton.html", "dmax.html", "bt50.html",
      "t9.html", "cannon.html", "byd-shark-6-phev.html", "gwm-cannon-alpha-phev.html",
      "jac-hunter-phev.html", "chery-kp31-phev.html", "terron9.html", "tasman.html",
      "amarok.html", "jeep.html"
    ],
    compare: [
      "ute-comparisons.html", "hilux-vs-ranger.html", "triton-vs-dmax.html",
      "jac-t9-vs-gwm-cannon.html", "byd-shark-6-vs-ford-ranger.html",
      "jac-hunter-phev-vs-byd-shark-6.html", "phev-ute-comparison.html"
    ],
    tools: [
      "ute-calculator.html", "ute-five-year-ownership-cost.html",
      "ute-payload-towing-calculator.html", "ancap.html", "recalls.html", "recall-trends-australia.html"
    ],
    data: [
      "data-sources.html", "methodology.html", "updates.html",
      "contact-corrections.html", "sitemap.html"
    ],
    search: ["search.html"]
  };
  const active = Object.entries(groups).find(([, pages]) => pages.includes(current))?.[0] || "";
  const items = [
    ["home", "Home", "index.html"],
    ["hubs", "Hubs", "vehicle-hubs.html"],
    ["brands", "Brands", "brands.html"],
    ["compare", "Compare", "ute-comparisons.html"],
    ["tools", "Tools", "ute-calculator.html"],
    ["data", "Data", "data-sources.html"],
    ["search", "Search", "search.html"]
  ];

  const nav = document.querySelector(".nav-links");
  if (!nav) return;
  const brandLabel = document.querySelector(".brand span");
  if (brandLabel) brandLabel.textContent = "Auto Insight Lab by AutoScore360";
  nav.setAttribute("aria-label", "Primary navigation");
  nav.innerHTML = items.map(([key, label, href]) =>
    `<a class="nav-link" href="${href}"${active === key ? ' aria-current="page"' : ""}>${label}</a>`
  ).join("");

  const style = document.createElement("style");
  style.textContent = `
    .editorial-status{display:flex;align-items:center;gap:.55rem;flex-wrap:wrap;margin:1rem 0 0;padding:.72rem .9rem;border:1px solid #d8e2ec;border-radius:10px;background:#f7fafc;color:#425466;font-size:.82rem;line-height:1.45}
    .editorial-status strong{color:#18324a}.editorial-status a{color:#075ea8;font-weight:700}.editorial-dot{color:#9aa9b8}
    .site-search-shell{position:relative;max-width:760px;margin:0 auto}.site-search-input{width:100%;box-sizing:border-box;padding:.9rem 1rem;border:1px solid #b9c8d8;border-radius:10px;background:#fff;color:#172b3a;font:inherit}.site-search-input:focus{outline:3px solid rgba(25,111,174,.18);border-color:#196fae}.site-search-status{margin:.8rem 0;color:#5a6b79;font-size:.9rem}.site-search-results{display:grid;gap:.7rem}.site-search-result{display:block;padding:1rem;border:1px solid #d8e2ec;border-radius:10px;background:#fff;text-decoration:none;color:inherit}.site-search-result:hover{border-color:#196fae;box-shadow:0 6px 20px rgba(20,55,80,.08)}.site-search-result strong{display:block;color:#123a59;margin-bottom:.25rem}.site-search-result span{display:block;color:#5a6b79;font-size:.9rem;line-height:1.5}.site-search-empty{padding:1rem;border-radius:10px;background:#f7fafc;color:#5a6b79}
  `;
  document.head.appendChild(style);

  if (current !== "index.html" && current !== "404.html" && !document.querySelector('meta[http-equiv="refresh"]')) {
    const hero = document.querySelector("main .hero, main > section:first-child");
    if (hero && !hero.querySelector(".editorial-status")) {
      let modified = "Date not recorded";
      for (const node of document.querySelectorAll('script[type="application/ld+json"]')) {
        try {
          const json = JSON.parse(node.textContent);
          const queue = Array.isArray(json) ? [...json] : [json];
          while (queue.length) {
            const item = queue.shift();
            if (!item || typeof item !== "object") continue;
            if (item.dateModified) { modified = new Date(`${item.dateModified}T00:00:00`).toLocaleDateString("en-AU", {day:"numeric",month:"short",year:"numeric"}); break; }
            if (Array.isArray(item["@graph"])) queue.push(...item["@graph"]);
          }
        } catch (_) {}
        if (modified !== "Date not recorded") break;
      }
      const status = document.createElement("div");
      status.className = "editorial-status";
      status.setAttribute("aria-label", "Editorial and data status");
      status.innerHTML = `<strong>AutoScore360 Editorial</strong><span class="editorial-dot">•</span><span>Last reviewed: ${modified}</span><span class="editorial-dot">•</span><span>Check page notes for data cut-off</span><span class="editorial-dot">•</span><a href="editorial-policy.html">How we review</a><a href="contact-corrections.html">Report a website issue</a>`;
      hero.appendChild(status);
    }
  }

  const searchInput = document.querySelector("[data-site-search]");
  if (searchInput) {
    const results = document.querySelector("[data-site-search-results]");
    const status = document.querySelector("[data-site-search-status]");
    let pages = [];
    const normalise = value => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    fetch("sitemap.html")
      .then(response => response.text())
      .then(html => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        const seen = new Set();
        pages = [...doc.querySelectorAll('a[href$=".html"], a[href*=".html#"]')].map(link => {
          const href = link.getAttribute("href");
          if (!href || seen.has(href) || /^(https?:|mailto:)/.test(href)) return null;
          seen.add(href);
          const container = link.closest(".site-link, article, li, .card, section") || link.parentElement;
          return {href, title: link.textContent.trim(), context: (container?.textContent || "").replace(/\s+/g," ").trim()};
        }).filter(Boolean);
        status.textContent = `${pages.length} research pages ready to search.`;
        searchInput.dispatchEvent(new Event("input"));
      })
      .catch(() => { status.textContent = "Search index could not be loaded. Use the sitemap below."; });
    searchInput.addEventListener("input", () => {
      const query = normalise(searchInput.value);
      if (!query) { results.innerHTML = ""; return; }
      const terms = query.split(" ");
      const matches = pages.filter(page => terms.every(term => normalise(`${page.title} ${page.context} ${page.href}`).includes(term))).slice(0, 20);
      results.innerHTML = matches.length ? matches.map(page => `<a class="site-search-result" href="${page.href}"><strong>${page.title}</strong><span>${page.context.slice(0, 180)}</span></a>`).join("") : '<div class="site-search-empty">No matching page. Try a model, brand, budget or topic such as “Ranger”, “PHEV”, “towing” or “ANCAP”.</div>';
      status.textContent = `${matches.length}${matches.length === 20 ? "+" : ""} result${matches.length === 1 ? "" : "s"}.`;
    });
  }
})();
