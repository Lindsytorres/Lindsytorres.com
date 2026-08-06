/**
 * LINDSY TORRES — Home ("The Legacy Gallery") — shared behavior
 */
(function () {
  "use strict";

  const cfg = (window.siteConfig && window.siteConfig.integrations) || {};

  /* ---------------- Header scroll state ---------------- */
  const header = document.querySelector("[data-site-header]");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------- Mobile menu ---------------- */
  const hamburger = document.querySelector("[data-hamburger]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  if (hamburger && mobileMenu) {
    const closeMenu = () => {
      hamburger.setAttribute("aria-expanded", "false");
      mobileMenu.classList.remove("is-open");
      document.body.style.overflow = "";
    };
    const openMenu = () => {
      hamburger.setAttribute("aria-expanded", "true");
      mobileMenu.classList.add("is-open");
      document.body.style.overflow = "hidden";
    };
    hamburger.addEventListener("click", () => {
      const isOpen = hamburger.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });
    mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------------- Scroll reveal ---------------- */
  const revealTargets = document.querySelectorAll(".reveal, .gold-rule--reveal");
  if ("IntersectionObserver" in window && revealTargets.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -60px 0px" }
    );
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------------- Gallery rail arrows ---------------- */
  const scroller = document.querySelector("[data-gallery-scroller]");
  const prevBtn = document.querySelector("[data-gallery-prev]");
  const nextBtn = document.querySelector("[data-gallery-next]");
  if (scroller && prevBtn && nextBtn) {
    const scrollByCard = (dir) => {
      const card = scroller.querySelector(".artwork");
      const step = card ? card.getBoundingClientRect().width + 28 : 320;
      scroller.scrollBy({ left: dir * step, behavior: "smooth" });
    };
    prevBtn.addEventListener("click", () => scrollByCard(-1));
    nextBtn.addEventListener("click", () => scrollByCard(1));
  }

  /* ---------------- Concierge WhatsApp link ---------------- */
  document.querySelectorAll("[data-concierge-link]").forEach((el) => {
    if (cfg.CONCIERGE_WHATSAPP_URL) {
      const hasQuery = cfg.CONCIERGE_WHATSAPP_URL.includes("?");
      const sep = hasQuery ? "&" : "?";
      // Only wa.me links accept a `text` prefill reliably; short links
      // (wa.link/*) usually redirect to a fixed pre-set message instead.
      const isWaMe = /wa\.me|api\.whatsapp\.com/.test(cfg.CONCIERGE_WHATSAPP_URL);
      el.href = isWaMe
        ? `${cfg.CONCIERGE_WHATSAPP_URL}${sep}text=${encodeURIComponent(cfg.CONCIERGE_MESSAGE || "")}`
        : cfg.CONCIERGE_WHATSAPP_URL;
      el.target = "_blank";
      el.rel = "noopener";
    }
  });

  /* ---------------- Social links ---------------- */
  const socialMap = {
    instagram: cfg.INSTAGRAM_URL,
    tiktok: cfg.TIKTOK_URL,
    youtube: cfg.YOUTUBE_URL,
  };
  document.querySelectorAll("[data-social-link]").forEach((el) => {
    const key = el.getAttribute("data-social-link");
    const url = socialMap[key];
    if (url) {
      el.href = url;
      el.target = "_blank";
      el.rel = "noopener";
    } else {
      el.setAttribute("aria-disabled", "true");
      el.querySelector("[data-social-cta]") &&
        (el.querySelector("[data-social-cta]").textContent = "Próximamente");
    }
  });

  document.querySelectorAll("[data-contact-email]").forEach((el) => {
    if (cfg.CONTACT_EMAIL) {
      el.href = "mailto:" + cfg.CONTACT_EMAIL;
    }
  });

  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* ---------------- Analytics: click + view events ---------------- */
  document.querySelectorAll("[data-track]").forEach((el) => {
    el.addEventListener("click", () => {
      if (window.trackEvent) window.trackEvent(el.getAttribute("data-track"));
    });
  });

  if (window.trackEvent) window.trackEvent("view_home");

  const gallery = document.querySelector("#coleccion");
  if (gallery && "IntersectionObserver" in window) {
    const galleryObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (window.trackEvent) window.trackEvent("view_gallery");
            galleryObserver.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    galleryObserver.observe(gallery);
  }
})();
