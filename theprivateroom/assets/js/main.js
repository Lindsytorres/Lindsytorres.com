/**
 * THE PRIVATE ROOM — shared site behavior
 * Navbar scroll state, mobile menu, scroll reveals, FAQ accordion,
 * cookie banner, and outbound CTA tracking. No frameworks, no build step.
 */
(function () {
  "use strict";

  /* ---------------- Navbar scroll state ---------------- */
  const navbar = document.querySelector("[data-navbar]");
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle("is-scrolled", window.scrollY > 12);
    };
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
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
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
      { threshold: 0.16, rootMargin: "0px 0px -60px 0px" }
    );
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------------- FAQ accordion ---------------- */
  document.querySelectorAll("[data-faq-item]").forEach((item) => {
    const question = item.querySelector(".faq-item__question");
    const answer = item.querySelector(".faq-item__answer");
    if (!question || !answer) return;

    question.addEventListener("click", () => {
      const isOpen = question.getAttribute("aria-expanded") === "true";

      document.querySelectorAll(".faq-item__question").forEach((q) => {
        q.setAttribute("aria-expanded", "false");
        const a = q.parentElement.querySelector(".faq-item__answer");
        if (a) a.style.maxHeight = null;
      });

      if (!isOpen) {
        question.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  /* ---------------- Cookie banner ---------------- */
  const cookieBanner = document.querySelector("[data-cookie-banner]");
  if (cookieBanner) {
    const consent = localStorage.getItem("tpr_cookie_consent");
    if (!consent) {
      window.setTimeout(() => cookieBanner.classList.add("is-visible"), 900);
    }
    cookieBanner.querySelectorAll("[data-cookie-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        localStorage.setItem(
          "tpr_cookie_consent",
          btn.getAttribute("data-cookie-action")
        );
        cookieBanner.classList.remove("is-visible");
      });
    });
  }

  /* ---------------- CTA + section view tracking ---------------- */
  document.querySelectorAll("[data-track]").forEach((el) => {
    el.addEventListener("click", () => {
      const eventName = el.getAttribute("data-track");
      if (window.trackEvent) window.trackEvent(eventName);
    });
  });

  const investmentSection = document.querySelector("#investment");
  if (investmentSection && "IntersectionObserver" in window) {
    const invObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (window.trackEvent) window.trackEvent("view_private_room_investment");
            invObserver.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    invObserver.observe(investmentSection);
  }

  if (window.trackEvent) window.trackEvent("view_private_room");

  /* ---------------- Footer contact links ---------------- */
  const cfg = (window.siteConfig && window.siteConfig.integrations) || {};
  document.querySelectorAll("[data-contact-email]").forEach((el) => {
    if (cfg.CONTACT_EMAIL) {
      el.href = "mailto:" + cfg.CONTACT_EMAIL;
      el.textContent = cfg.CONTACT_EMAIL;
    } else if (el.closest("li")) {
      el.closest("li").style.display = "none";
    }
  });
  document.querySelectorAll("[data-contact-whatsapp]").forEach((el) => {
    if (cfg.WHATSAPP_NUMBER) {
      el.href = "https://wa.me/" + cfg.WHATSAPP_NUMBER.replace(/[^\d]/g, "");
      el.textContent = cfg.WHATSAPP_NUMBER;
    } else if (el.closest("li")) {
      el.closest("li").style.display = "none";
    }
  });

  /* ---------------- Year stamp ---------------- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
