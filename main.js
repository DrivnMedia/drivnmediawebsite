/* ============================================================
   DRIVN MEDIA - Funnel interactions
   Vanilla JS. No dependencies. IntersectionObserver + rAF.
   ============================================================ */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isCoarse = window.matchMedia("(pointer: coarse)").matches;

  /* ---------- 0. Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 1. Hero word reveal ---------- */
  const hero = document.getElementById("hero");
  if (hero) {
    const words = hero.querySelectorAll(".line span");
    words.forEach((w, i) => w.style.setProperty("--word-delay", 120 + i * 130 + "ms"));
    // kick off after paint
    requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add("ready")));
  }

  /* ---------- 2. Scroll reveal (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !prefersReduced) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ---------- 3. Header: fade background in on scroll (never hides) ---------- */
  const header = document.getElementById("siteHeader");
  const progress = document.getElementById("scrollProgress");
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    if (header) {
      // only toggle the translucent background, the header stays pinned and visible
      header.classList.toggle("scrolled", y > 24);
    }
    if (progress) {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      progress.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
    }
    ticking = false;
  }
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    },
    { passive: true }
  );
  onScroll();

  /* ---------- 4. Lightweight parallax (desktop only, rAF) ---------- */
  const parallaxEls = document.querySelectorAll("[data-parallax]");
  if (parallaxEls.length && !prefersReduced && !isCoarse) {
    let pTicking = false;
    function parallax() {
      const y = window.scrollY;
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-parallax")) || 0.1;
        el.style.transform = "translate3d(0," + (y * speed).toFixed(1) + "px,0)";
      });
      pTicking = false;
    }
    window.addEventListener(
      "scroll",
      () => {
        if (!pTicking) {
          window.requestAnimationFrame(parallax);
          pTicking = true;
        }
      },
      { passive: true }
    );
  }

  /* ---------- 5. Count-up stats ---------- */
  const counters = document.querySelectorAll("[data-count]");
  function animateCount(el) {
    const target = parseFloat(el.getAttribute("data-count"));
    const prefix = el.getAttribute("data-prefix") || "";
    const suffix = el.getAttribute("data-suffix") || "";
    const dur = 1700;
    const start = performance.now();
    const isFloat = !Number.isInteger(target);

    function fmt(n) {
      if (target >= 1000) return Math.round(n).toLocaleString("en-US");
      if (isFloat) return n.toFixed(1);
      return Math.round(n).toString();
    }
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = prefix + fmt(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + fmt(target) + suffix;
    }
    requestAnimationFrame(tick);
  }
  if (counters.length && "IntersectionObserver" in window && !prefersReduced) {
    const cio = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCount(e.target);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => cio.observe(c));
  } else {
    counters.forEach((c) => {
      c.textContent =
        (c.getAttribute("data-prefix") || "") +
        parseFloat(c.getAttribute("data-count")).toLocaleString("en-US") +
        (c.getAttribute("data-suffix") || "");
    });
  }

  /* ---------- 6. Solution gauges fill on view ---------- */
  const gauge = document.querySelector("[data-gauge]");
  if (gauge) {
    const fills = gauge.querySelectorAll(".gauge-fill");
    function fill() {
      fills.forEach((f) => (f.style.width = (f.getAttribute("data-fill") || 0) + "%"));
    }
    if ("IntersectionObserver" in window && !prefersReduced) {
      const gio = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              fill();
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      gio.observe(gauge);
    } else {
      fill();
    }
  }

  /* ---------- 6b. Trickle vs flood: staggered flood-in on scroll ---------- */
  const tvf = document.getElementById("tvf");
  if (tvf) {
    const floodDots = tvf.querySelectorAll(".tvf-flood .tvf-dot");
    floodDots.forEach((d, i) => d.style.setProperty("--d", i * 26 + "ms"));
    if ("IntersectionObserver" in window && !prefersReduced) {
      // arm = hide blue dots first, then `.in` triggers the staggered pop on view
      tvf.classList.add("armed");
      const fio = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              tvf.classList.add("in");
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.3 }
      );
      fio.observe(tvf);
    }
    // reduced motion or no IntersectionObserver: leave dots in their final visible state
  }

  /* ---------- 7. Before / After slider ---------- */
  const ba = document.getElementById("baSlider");
  if (ba) {
    const before = document.getElementById("baBefore");
    const handle = document.getElementById("baHandle");
    let dragging = false;

    function setPos(clientX) {
      const rect = ba.getBoundingClientRect();
      let pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      before.style.clipPath = "inset(0 " + (100 - pct) + "% 0 0)";
      handle.style.left = pct + "%";
      ba.setAttribute("aria-valuenow", Math.round(pct));
    }
    const start = () => (dragging = true);
    const end = () => (dragging = false);
    const move = (e) => {
      if (!dragging) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      setPos(x);
    };

    ba.addEventListener("mousedown", (e) => { start(); setPos(e.clientX); });
    ba.addEventListener("touchstart", (e) => { start(); setPos(e.touches[0].clientX); }, { passive: true });
    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move, { passive: true });
    window.addEventListener("mouseup", end);
    window.addEventListener("touchend", end);
    // keyboard
    ba.addEventListener("keydown", (e) => {
      const cur = parseFloat(ba.getAttribute("aria-valuenow")) || 50;
      if (e.key === "ArrowLeft") { e.preventDefault(); setByPct(cur - 4); }
      if (e.key === "ArrowRight") { e.preventDefault(); setByPct(cur + 4); }
    });
    function setByPct(pct) {
      pct = Math.max(0, Math.min(100, pct));
      before.style.clipPath = "inset(0 " + (100 - pct) + "% 0 0)";
      handle.style.left = pct + "%";
      ba.setAttribute("aria-valuenow", Math.round(pct));
    }
  }

  /* ---------- 8. Testimonials carousel ---------- */
  const track = document.getElementById("testiTrack");
  const dotsWrap = document.getElementById("testiDots");
  if (track && dotsWrap) {
    const slides = track.children.length;
    function perView() { return window.innerWidth >= 760 ? 2 : 1; }
    let index = 0;
    let pages = Math.ceil(slides / perView());
    let autoTimer;

    function buildDots() {
      pages = Math.ceil(slides / perView());
      dotsWrap.innerHTML = "";
      for (let i = 0; i < pages; i++) {
        const b = document.createElement("button");
        b.setAttribute("aria-label", "Go to testimonial set " + (i + 1));
        b.addEventListener("click", () => { go(i); resetAuto(); });
        dotsWrap.appendChild(b);
      }
    }
    function go(i) {
      index = (i + pages) % pages;
      const pv = perView();
      const offsetPct = (index * 100);
      track.style.transform = "translateX(-" + offsetPct + "%)";
      Array.from(dotsWrap.children).forEach((d, di) => d.classList.toggle("active", di === index));
    }
    function resetAuto() {
      clearInterval(autoTimer);
      if (!prefersReduced) autoTimer = setInterval(() => go(index + 1), 6000);
    }
    buildDots();
    go(0);
    resetAuto();

    let rT;
    window.addEventListener("resize", () => {
      clearTimeout(rT);
      rT = setTimeout(() => { buildDots(); go(0); }, 200);
    });

    // swipe
    let sx = 0;
    track.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), { passive: true });
    track.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) { go(index + (dx < 0 ? 1 : -1)); resetAuto(); }
    }, { passive: true });
  }

  /* ---------- 9. FAQ accordion ---------- */
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const btn = item.querySelector(".faq-q");
    const panel = item.querySelector(".faq-a");
    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      // close others
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("open");
          other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
          other.querySelector(".faq-a").style.maxHeight = null;
        }
      });
      item.classList.toggle("open", !isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
      panel.style.maxHeight = !isOpen ? panel.scrollHeight + "px" : null;
    });
  });

  /* ---------- 10. Magnetic buttons (desktop) ---------- */
  if (!isCoarse && !prefersReduced) {
    document.querySelectorAll(".btn-primary").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2;
        const my = e.clientY - r.top - r.height / 2;
        btn.style.transform = "translate(" + mx * 0.12 + "px," + my * 0.18 + "px)";
      });
      btn.addEventListener("mouseleave", () => (btn.style.transform = ""));
    });
  }

  /* ---------- 11. Smooth anchor scroll w/ header offset ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top, behavior: prefersReduced ? "auto" : "smooth" });
    });
  });

  /* ============================================================
     12. LEAD FORM (Step 1) -> WEBHOOK capture -> reveal prefilled calendar (Step 2)
     ============================================================ */

  // GHL inbound webhook (Step 1 lead capture)
  const WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/qYsmcewipgY55D3db8ii/webhook-trigger/46344f68-f530-42ef-aa78-91121595e3c9";
  // GHL booking widget base URL (prefill params get appended on submit)
  const CALENDAR_BASE = "https://api.leadconnectorhq.com/widget/booking/kg8KOFZQCUIcV5qpjg4N";

  const form = document.getElementById("leadForm");
  if (form) {
    const submitBtn = document.getElementById("leadSubmit");
    const statusEl = document.getElementById("formStatus");
    const step1 = document.getElementById("bookingStep1");
    const step2 = document.getElementById("bookingStep2");
    const calIframe = document.getElementById("kg8KOFZQCUIcV5qpjg4N_1781818894144");

    // Build the booking URL with the form values prefilled (each value encoded).
    function buildCalendarUrl(name, email, phone) {
      const full = name.trim();
      const sp = full.indexOf(" ");
      const first = sp === -1 ? full : full.slice(0, sp);
      const last = sp === -1 ? "" : full.slice(sp + 1).trim();
      return (
        CALENDAR_BASE +
        "?first_name=" + encodeURIComponent(first) +
        "&last_name=" + encodeURIComponent(last) +
        "&email=" + encodeURIComponent(email) +
        "&phone=" + encodeURIComponent(phone)
      );
    }

    // Hide Step 1, reveal Step 2, smooth-scroll to it (header-offset aware).
    function revealCalendar() {
      step1.hidden = true;
      step2.hidden = false;
      requestAnimationFrame(() => step2.classList.add("shown"));
      const top = step2.getBoundingClientRect().top + window.scrollY - 92;
      window.scrollTo({ top, behavior: prefersReduced ? "auto" : "smooth" });
    }

    function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
    function validPhone(v) { return v.replace(/\D/g, "").length >= 7; }

    function setError(field, on) {
      field.closest(".field").classList.toggle("error", on);
    }

    function validate() {
      let ok = true;
      const name = form.name;
      const business = form.business_name;
      const email = form.email;
      const phone = form.phone;
      const services = form.services;

      [
        [name, name.value.trim().length > 1],
        [business, business.value.trim().length > 1],
        [email, validEmail(email.value.trim())],
        [phone, validPhone(phone.value.trim())],
        [services, services.value !== ""],
      ].forEach(([field, good]) => {
        setError(field, !good);
        if (!good) ok = false;
      });
      return ok;
    }

    // clear error as the user fixes it
    form.querySelectorAll("input, select").forEach((el) => {
      el.addEventListener("input", () => setError(el, false));
      el.addEventListener("change", () => setError(el, false));
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      statusEl.textContent = "";
      statusEl.className = "form-status";

      if (!validate()) {
        statusEl.textContent = "Please fix the highlighted fields.";
        statusEl.classList.add("bad");
        const firstErr = form.querySelector(".field.error input, .field.error select");
        if (firstErr) firstErr.focus();
        return;
      }

      const payload = {
        name: form.name.value.trim(),
        business_name: form.business_name.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        services: form.services.value,
        source: "Drivn Media Funnel",
        page_url: window.location.href,
        submitted_at: new Date().toISOString(),
      };

      submitBtn.classList.add("loading");
      submitBtn.disabled = true;

      // Persist the lead locally as a fallback so it's never lost
      try { localStorage.setItem("drivn_last_lead", JSON.stringify(payload)); } catch (_) {}

      // 1) Early capture: POST to the GHL inbound webhook with clean, contact-mappable
      //    keys (split the name into first/last). Fire-and-forget so the calendar opens
      //    instantly and the lead is captured even if they never finish booking. The
      //    .catch keeps a slow or failed request from ever blocking or breaking the
      //    Step 2 reveal below (we never await it).
      const nameSpace = payload.name.indexOf(" ");
      const webhookPayload = {
        first_name: nameSpace === -1 ? payload.name : payload.name.slice(0, nameSpace),
        last_name: nameSpace === -1 ? "" : payload.name.slice(nameSpace + 1).trim(),
        email: payload.email,
        phone: payload.phone,
        business_name: payload.business_name,
        services: payload.services,
      };
      const notConfigured = WEBHOOK_URL.indexOf("PASTE") !== -1;
      if (!notConfigured) {
        fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(webhookPayload),
        }).catch((err) => console.error("[Drivn Media] Webhook error:", err));
      } else {
        console.warn("[Drivn Media] WEBHOOK_URL not set, skipping POST. Lead:", webhookPayload);
      }

      // 2) Prefill + load the calendar, then reveal Step 2 and scroll to it.
      if (calIframe) {
        calIframe.src = buildCalendarUrl(payload.name, payload.email, payload.phone);
        // form_embed.js (loaded at page start) scans iframes once, before this one had
        // a src. Re-run it now so it registers this iframe and auto-sizes its height.
        const resizer = document.createElement("script");
        resizer.src = "https://link.msgsndr.com/js/form_embed.js";
        resizer.type = "text/javascript";
        document.body.appendChild(resizer);
      }
      statusEl.textContent = "Got it. Opening your calendar…";
      statusEl.classList.add("ok");
      setTimeout(revealCalendar, 550);
    });
  }
})();
