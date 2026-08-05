/**
 * RECALIBRACIÓN DE AUTORIDAD™ — shared site behavior
 * Navbar scroll state, mobile menu, scroll reveals. No frameworks.
 */
(function () {
  "use strict";

  const navbar = document.querySelector("[data-navbar]");
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

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
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

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
      { threshold: 0.16, rootMargin: "0px 0px -60px 0px" }
    );
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  // Booking / Instagram / email links — populate from config, degrade gracefully.
  const cfg = (window.siteConfig && window.siteConfig.integrations) || {};

  document.querySelectorAll("[data-booking-link]").forEach((el) => {
    if (cfg.BOOKING_URL) {
      el.href = cfg.BOOKING_URL;
      el.target = "_blank";
      el.rel = "noopener";
    } else {
      // No booking link connected yet — fall back to a direct email
      // request so the button never dead-ends for a real visitor.
      el.href = `mailto:${cfg.CONTACT_EMAIL}?subject=${encodeURIComponent(
        "Quiero reservar mi Recalibración de Autoridad"
      )}`;
    }
  });

  document.querySelectorAll("[data-instagram-link]").forEach((el) => {
    if (cfg.INSTAGRAM_URL) el.href = cfg.INSTAGRAM_URL;
  });

  document.querySelectorAll("[data-contact-email]").forEach((el) => {
    if (cfg.CONTACT_EMAIL) {
      el.href = "mailto:" + cfg.CONTACT_EMAIL;
      el.textContent = cfg.CONTACT_EMAIL;
    }
  });

  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
