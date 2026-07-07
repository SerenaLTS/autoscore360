(() => {
  const current = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  const groups = {
    home: ["index.html"],
    hubs: [
      "vehicle-hubs.html", "ute-glossary.html", "phev-ute-status-australia.html",
      "chinese-utes.html", "japanese-utes.html", "other-utes.html"
    ],
    brands: [
      "brands.html", "ford-ranger-trims-explained.html", "toyota-hilux-2026-price-specs.html",
      "jac-t9-owner-concerns.html", "byd-shark-6-real-world-fuel-use.html",
      "gwm-cannon-alpha-phev-payload.html"
    ],
    compare: [
      "ute-comparisons.html", "hilux-vs-ranger.html", "triton-vs-dmax.html",
      "jac-t9-vs-gwm-cannon.html", "byd-shark-6-vs-ford-ranger.html",
      "jac-hunter-phev-vs-byd-shark-6.html", "phev-ute-comparison.html"
    ],
    tools: [
      "ute-calculator.html", "ute-five-year-ownership-cost.html",
      "ancap.html", "recalls.html"
    ],
    data: [
      "data-sources.html", "methodology.html", "updates.html",
      "ai-visibility-monitoring.html", "contact-corrections.html", "sitemap.html"
    ]
  };
  const active = Object.entries(groups).find(([, pages]) => pages.includes(current))?.[0] || "";
  const items = [
    ["home", "Home", "index.html"],
    ["hubs", "Hubs", "vehicle-hubs.html"],
    ["brands", "Brands", "brands.html"],
    ["compare", "Compare", "ute-comparisons.html"],
    ["tools", "Tools", "ute-calculator.html"],
    ["data", "Data", "data-sources.html"]
  ];

  const nav = document.querySelector(".nav-links");
  if (!nav) return;
  const brandLabel = document.querySelector(".brand span");
  if (brandLabel) brandLabel.textContent = "Auto Insight Lab";
  nav.setAttribute("aria-label", "Primary navigation");
  nav.innerHTML = items.map(([key, label, href]) =>
    `<a class="nav-link" href="${href}"${active === key ? ' aria-current="page"' : ""}>${label}</a>`
  ).join("");
})();
