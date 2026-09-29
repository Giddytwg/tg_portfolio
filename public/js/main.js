(function () {
"use strict";
/* _utils.js */
/* Shared helpers + settings read from the <body> tag's data-* attributes.
   Set these by hand on the body tag of any page where you want the feature on (see the README). */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const cfg = document.body.dataset;          // data-page, data-ga4, data-form-endpoint, data-form-extra, data-booking-url, data-email
const page = cfg.page;

const track = (name, params) => {
  if (window.gtag) window.gtag("event", name, Object.assign({ page: page }, params || {}));
};

/* page-loader.js */
try {
/* Clears the full-page loader and reveals the page (see the ".loader"/"body.is-loaded"
   rules in animations.css). Waits for "load" so images have actually arrived — that's
   the point of a loader — but never makes a visitor wait more than 2.5s regardless. */
const reveal = () => document.body.classList.add("is-loaded");
if (document.readyState === "complete") reveal(); else addEventListener("load", reveal, { once: true });
setTimeout(reveal, 2500);
} catch (e) { if (window.console) console.error("[page-loader.js]", e); }

/* nav.js */
try {
/* Header: full-screen menu, "stuck" background on scroll, hide-on-scroll-down, and the mobile sticky CTA bar. */
const nav = $("#nav"), menu = $("#menu"), menuBtn = $("#menuBtn"), stickyBar = $(".sticky-cta");

if (nav && menu && menuBtn) {
  const setMenu = (open) => {
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    open ? menu.removeAttribute("inert") : menu.setAttribute("inert", "");
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("is-locked", open);
    nav.classList.toggle("menu-open", open);
    if (open) { const first = $(".menu__link", menu); if (first) first.focus({ preventScroll: true }); }
    updateSticky();
  };
  menuBtn.addEventListener("click", () => setMenu(menuBtn.getAttribute("aria-expanded") !== "true"));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) { setMenu(false); menuBtn.focus(); }
  });
  $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));

  let lastY = 0;
  addEventListener("scroll", () => {
    const y = scrollY;
    nav.classList.toggle("is-stuck", y > 40);
    if (!menu.classList.contains("is-open")) nav.classList.toggle("is-hidden", y > lastY && y > 400);
    lastY = y;
    updateSticky();
  }, { passive: true });

  function updateSticky() {
    if (stickyBar) stickyBar.classList.toggle("is-on", scrollY > 500 && !menu.classList.contains("is-open"));
  }
  updateSticky();
}
} catch (e) { if (window.console) console.error("[nav.js]", e); }

/* reveal.js */
try {
const heroEl = $(".hero");
if (heroEl) requestAnimationFrame(() => requestAnimationFrame(() => heroEl.classList.add("is-in")));

const revealEls = $$(".rv");
if (reduceMotion || !("IntersectionObserver" in window)) {
  revealEls.forEach((el) => el.classList.add("is-in"));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
  revealEls.forEach((el) => io.observe(el));
}
} catch (e) { if (window.console) console.error("[reveal.js]", e); }

/* counters.js */
try {
/* Count-up numbers: <span data-count="40">40</span>. The final number is already in the HTML. */
$$("[data-count]").forEach((el) => {
  const end = Number(el.dataset.count);
  if (reduceMotion || !("IntersectionObserver" in window) || !isFinite(end)) return;
  const io = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    io.disconnect();
    const t0 = performance.now(), duration = 1400;
    el.textContent = "0";
    const step = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, { threshold: 0.6 });
  io.observe(el);
});
} catch (e) { if (window.console) console.error("[counters.js]", e); }

/* clock.js */
try {
/* Footer local-time line: <span data-clock data-tz="Africa/Lagos" data-place="Ile-Ife, Nigeria"> */
$$("[data-clock]").forEach((el) => {
  const tz = el.dataset.tz, place = el.dataset.place || "";
  const tick = () => {
    try {
      const t = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: tz }).format(new Date());
      el.textContent = place + " · " + t + " local time";
    } catch (e) { el.textContent = place; }
  };
  tick();
  setInterval(tick, 30000);
});
} catch (e) { if (window.console) console.error("[clock.js]", e); }

/* project-peek.js */
try {
/* Home project list: a screenshot follows the cursor on hover (desktop only). Rows carry data-img. */
const projectRows = $("#rows");
if (projectRows && !reduceMotion && matchMedia("(hover: hover)").matches) {
  const peek = document.createElement("div");
  peek.className = "peek";
  peek.innerHTML = '<img alt="" width="700" height="350">';
  document.body.appendChild(peek);
  const img = $("img", peek);
  let x = 0, y = 0, cx = 0, cy = 0, raf;
  const loop = () => {
    cx += (x - cx) * 0.16; cy += (y - cy) * 0.16;
    peek.style.transform = "translate(" + cx + "px," + cy + "px)";
    raf = requestAnimationFrame(loop);
  };
  projectRows.addEventListener("mousemove", (e) => { x = e.clientX + 24; y = e.clientY - 90; });
  $$(".row", projectRows).forEach((row) => {
    row.addEventListener("mouseenter", (e) => {
      img.src = row.dataset.img;
      cx = x = e.clientX + 24; cy = y = e.clientY - 90;
      peek.classList.add("is-on");
      cancelAnimationFrame(raf); loop();
    });
    row.addEventListener("mouseleave", () => { peek.classList.remove("is-on"); cancelAnimationFrame(raf); });
  });
}
} catch (e) { if (window.console) console.error("[project-peek.js]", e); }

/* faq.js */
try {
/* FAQ: keep only one <details> open at a time (the accordion itself works without JS). */
const faqList = $("#faq");
if (faqList) {
  faqList.addEventListener("toggle", (e) => {
    if (e.target.open) $$("details", faqList).forEach((d) => { if (d !== e.target) d.open = false; });
  }, true);
}
} catch (e) { if (window.console) console.error("[faq.js]", e); }

/* carousel.js */
try {
/* Reviews: previous / next buttons scroll the rail (the rail itself is native horizontal scrolling). */
const quoteRail = $(".quotes__rail");
if (quoteRail) {
  $$(".quotes__nav button").forEach((b) => b.addEventListener("click", () => {
    const first = $(".quote:not([hidden])", quoteRail);
    if (!first) return;
    quoteRail.scrollBy({ left: Number(b.dataset.dir) * (first.offsetWidth + 20), behavior: reduceMotion ? "auto" : "smooth" });
  }));
}
} catch (e) { if (window.console) console.error("[carousel.js]", e); }

/* filter-projects.js */
try {
/* Projects page: category buttons hide/show cards. Cards carry data-cat, buttons carry data-f. */
const projectFilters = $("#filters");
if (projectFilters) {
  const count = $("#count");
  projectFilters.addEventListener("click", (e) => {
    const b = e.target.closest(".filter");
    if (!b) return;
    $$(".filter", projectFilters).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    let n = 0;
    $$(".card[data-cat]").forEach((c) => {
      c.hidden = b.dataset.f !== "All" && c.dataset.cat !== b.dataset.f;
      if (!c.hidden) n++;
    });
    if (count) count.textContent = n + " project" + (n === 1 ? "" : "s");
  });
}
} catch (e) { if (window.console) console.error("[filter-projects.js]", e); }

/* filter-reviews.js */
try {
/* Reviews: filter by where I was hired (only rendered when there is more than one source). */
const reviewFilters = $(".quotes__filters"), reviewRail = $(".quotes__rail");
if (reviewFilters && reviewRail) {
  reviewFilters.addEventListener("click", (e) => {
    const b = e.target.closest(".qfilter");
    if (!b) return;
    $$(".qfilter", reviewFilters).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    $$(".quote[data-src]", reviewRail).forEach((c) => { c.hidden = b.dataset.s !== "all" && c.dataset.src !== b.dataset.s; });
    reviewRail.scrollTo({ left: 0 });
  });
}
} catch (e) { if (window.console) console.error("[filter-reviews.js]", e); }

/* filter-blog.js */
try {
/* Blog index: category buttons + search box filter the already-rendered cards. */
const blogFilters = $("#blogFilters"), blogSearch = $("#blogSearch");
if (blogFilters || blogSearch) {
  const count = $("#blogCount"), empty = $("#blogEmpty");
  let category = "All", term = "";
  const run = () => {
    const t = term.trim().toLowerCase();
    let n = 0;
    $$("#blogGrid .post-card[data-cat]").forEach((card) => {
      const ok = (category === "All" || card.dataset.cat === category) && (!t || card.textContent.toLowerCase().indexOf(t) > -1);
      card.hidden = !ok;
      if (ok) n++;
    });
    if (count) count.textContent = n + " post" + (n === 1 ? "" : "s");
    if (empty) empty.hidden = n > 0;
  };
  if (blogFilters) blogFilters.addEventListener("click", (e) => {
    const b = e.target.closest(".filter");
    if (!b) return;
    category = b.dataset.f;
    $$(".filter", blogFilters).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    run();
  });
  if (blogSearch) blogSearch.addEventListener("input", () => { term = blogSearch.value; run(); });
}
} catch (e) { if (window.console) console.error("[filter-blog.js]", e); }

/* contact-form.js */
try {
const form = $("#contactForm");
if (form) {
  const status = $("#formStatus"), done = $("#formDone"), callBox = $("#callFields"), submitLabel = $("#submitLabel");
  const endpoint = cfg.formEndpoint || "";
  let extra = {};
  try { extra = cfg.formExtra ? JSON.parse(cfg.formExtra) : {}; } catch (e) { extra = {}; }

  const need = new URLSearchParams(location.search).get("need");
  const typeSel = $("#type");
  if (need && typeSel) {
    const match = Array.from(typeSel.options).find((o) => o.text.toLowerCase().indexOf(need.toLowerCase()) > -1);
    if (match) typeSel.value = match.value || match.text;
  }
  try { const tzEl = $("#tz"); if (tzEl) tzEl.value = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) { /* ignore */ }
  const day = $("#callDay"); if (day) day.min = new Date().toISOString().slice(0, 10);

  $$('input[name="reply"]', form).forEach((r) => r.addEventListener("change", () => {
    const call = form.elements.reply.value === "call";
    callBox.hidden = !call;
    submitLabel.textContent = call ? "Request my call" : "Send project request";
  }));

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.className = "form__status"; status.textContent = "";
    if (!form.reportValidity()) return;
    const d = Object.fromEntries(new FormData(form).entries());
    if (d._gotcha) { form.hidden = true; done.hidden = false; return; }   // spam trap filled: pretend success
    const wantsCall = d.reply === "call";
    const subject = (wantsCall ? "Call request: " : "Project request: ") + d.type + " from " + d.name;
    const lines = [
      d.message, "", "—", "Name: " + d.name, "Email: " + d.email, "Need: " + d.type,
      d.website ? "Current site: " + d.website : "", d.budget ? "Budget: " + d.budget : "", d.timeline ? "Timeline: " + d.timeline : "",
      wantsCall ? "Wants a call: " + (d.call_day || "any day") + ", " + (d.call_time || "any time") + " (" + (d.tz || "time zone not given") + ")" : "Reply by: email"
    ].filter((l, i) => l !== "" || i === 1).join("\n");
    const submitBtn = $('button[type="submit"]', form);

    if (endpoint) {
      submitBtn.disabled = true; status.textContent = "Sending…";
      try {
        const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(Object.assign({}, extra, d, { subject: subject, message_full: lines })) });
        if (!res.ok) throw new Error("status " + res.status);
        form.hidden = true; done.hidden = false;
        done.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
        track("form_submit", { type: d.type, call: wantsCall });
      } catch (err) {
        submitBtn.disabled = false; status.className = "form__status form__err";
        status.textContent = "Sorry, that didn't send. Please email me at " + cfg.email + " instead.";
      }
      return;
    }

    location.href = "mailto:" + cfg.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines);
    track("form_submit", { type: d.type, call: wantsCall, method: "mailto" });
    status.textContent = "Opening your email app… if nothing happens, email me at " + cfg.email;
  });
}
} catch (e) { if (window.console) console.error("[contact-form.js]", e); }

/* copy.js */
try {
/* "Copy email" (contact page) and "Copy link" (blog posts). */
function wireCopy(btn, getText, label) {
  if (!btn) return;
  btn.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(getText()); btn.textContent = "Copied ✓"; }
    catch (e) { btn.textContent = "Copy failed"; }
    setTimeout(() => { btn.textContent = label; }, 2000);
  });
}
const copyMailBtn = $("#copyMail"), copyLinkBtn = $("#copyLink");
wireCopy(copyMailBtn, () => copyMailBtn.dataset.email, "Copy email");
wireCopy(copyLinkBtn, () => copyLinkBtn.dataset.url, "Copy link");
} catch (e) { if (window.console) console.error("[copy.js]", e); }

/* toc.js */
try {
/* Blog post: highlight the current section in the "On this page" list while scrolling. */
const tocLinks = $$('.toc a[href^="#"]');
if (tocLinks.length && "IntersectionObserver" in window) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) tocLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id));
    });
  }, { rootMargin: "-20% 0px -70% 0px" });
  $$(".prose h2[id]").forEach((h) => spy.observe(h));
}
} catch (e) { if (window.console) console.error("[toc.js]", e); }

/* analytics.js */
try {
document.addEventListener("click", (e) => {
  const a = e.target.closest("a[href]");
  if (!a) return;
  const href = a.getAttribute("href") || "";
  const where = a.closest(".hero") ? "hero" : a.closest(".nav") ? "header" : a.closest(".cta") ? "footer_cta" : a.closest(".sticky-cta") ? "sticky" : "page";
  if (/upwork\.com/.test(href)) track("upwork_click", { where: where });
  else if (href.indexOf("mailto:") === 0) track("email_click");
  else if (/\/contact\/(\?[^#]*)?#request/.test(href)) track("start_project_click", { where: where });
  else if (cfg.bookingUrl && href === cfg.bookingUrl) track("book_call_click");
});

const ga4 = cfg.ga4;
if (ga4) {
  const loadAnalytics = () => {
    if (window.gtag) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", ga4, { anonymize_ip: true });
    const s = document.createElement("script");
    s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(ga4);
    document.head.appendChild(s);
  };
  let choice = null;
  try { choice = localStorage.getItem("tg-consent"); } catch (e) { /* storage blocked */ }
  if (choice === "yes") loadAnalytics();
  else if (choice !== "no") {
    const box = document.createElement("div");
    box.className = "consent"; box.setAttribute("role", "region"); box.setAttribute("aria-label", "Cookie consent");
    box.innerHTML = '<p>I use Google Analytics cookies to see which pages help visitors. They only load if you accept. <a href="/privacy/">Privacy</a></p>' +
      '<div class="consent__row"><button class="btn btn--sm" type="button" data-v="yes">Accept</button><button class="btn btn--sm btn--ghost" type="button" data-v="no">Decline</button></div>';
    box.addEventListener("click", (e) => {
      const b = e.target.closest("[data-v]");
      if (!b) return;
      try { localStorage.setItem("tg-consent", b.dataset.v); } catch (er) { /* ignore */ }
      if (b.dataset.v === "yes") loadAnalytics();
      box.remove();
    });
    document.body.appendChild(box);
  }
}
} catch (e) { if (window.console) console.error("[analytics.js]", e); }
})();
