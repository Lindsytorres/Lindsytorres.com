/**
 * THE PRIVATE ROOM — Central configuration
 *
 * Every toggle, copy value, and pending integration lives here.
 * Enabling a photo, an integration, or a section should never require
 * touching more than this file plus the asset itself.
 *
 * TODO: Replace placeholder values before public launch.
 * See /CONTENT-AND-ASSETS-CHECKLIST.md for the full pending list.
 */
window.siteConfig = {
  siteName: "The Private Room",
  descriptor: "Mentoría privada 1:1",
  universe: "Inside The Legacy Method™",
  mentor: "Lindsy Torres",
  mentorTitle: "Economista · Estratega de negocios",
  duration: "Seis meses",
  fullInvestment: "USD $11,888",
  paymentPlan: "6 pagos de USD $2,500",
  totalPaymentPlan: "USD $15,000",

  // Site is deployed at lindsytorres.com/theprivateroom/ — paths below are
  // absolute from that domain root, matching the canonical/OG tags in each
  // page. Internal HTML links use relative paths instead, so the project
  // keeps working if the mount point ever changes.
  siteUrl: "https://lindsytorres.com/theprivateroom/",
  applicationPath: "/theprivateroom/apply/",
  calendarPath: "/theprivateroom/private-calendar/",
  applicationReceivedPath: "/theprivateroom/application-received/",

  // Feature flags — the only place that should decide what renders.
  showTestimonials: false, // Activar únicamente cuando existan testimonios específicos y aprobados para The Private Room.
  showFounderPortrait: false, // Lindsy prefiere no usar su foto en esta página — se mantiene el retrato disponible por si cambia de decisión.
  applicationsOpen: true,
  calendarEnabled: true, // Calendly conectado: https://calendly.com/lindsytorres-info/30min
  formIntegrationEnabled: true, // Formspree conectado: https://formspree.io/f/xeajqkoe
  analyticsEnabled: false, // Se activa automáticamente si hay IDs válidos en integrations, ver assets/js/analytics.js

  // External integrations — empty strings render safe placeholders instead of broken links.
  integrations: {
    CALENDAR_URL: "https://calendly.com/lindsytorres-info/30min",
    FORM_ENDPOINT: "https://formspree.io/f/xeajqkoe",
    META_PIXEL_ID: "",
    GA_MEASUREMENT_ID: "",
    GTM_ID: "",
    FULL_PAYMENT_URL: "",
    PAYMENT_PLAN_URL: "",
    CONTACT_EMAIL: "info@lindsytorres.com",
    WHATSAPP_NUMBER: "", // TODO: Add WhatsApp number with country code, e.g. +1 555 000 0000
    PRIVACY_POLICY_URL: "/theprivateroom/privacy/",
    TERMS_URL: "/theprivateroom/terms/",
  },
};

/**
 * Central asset registry. Every path may be empty while final assets are
 * pending — every consumer of this object must fall back to the editorial
 * CSS placeholder instead of rendering a broken <img>.
 * TODO: Populate with final filenames as assets are approved and delivered.
 */
window.siteAssets = {
  heroDesktop: "", // TODO: Replace with final desktop hero artwork — CSS door composition used meanwhile.
  heroMobile: "", // TODO: Replace with final mobile hero artwork.
  founderPortrait: "/theprivateroom/assets/images/lindsy-founder-portrait.jpg",
  founderSeal: "/theprivateroom/assets/images/lindsy-torres-seal.png", // Sello personal de Lindsy Torres (marca personal, no el logo de The Private Room).
  closingImage: "", // TODO: Replace with final closing artwork (door slightly more open than hero). El key art completo ya disponible en keyArt puede servir de referencia o recorte para esto.
  logoPrimary: "/theprivateroom/assets/images/pr-monogram.png", // Recortado del key art oficial (fondo transparente), usado en navbar/footer/hero.
  logoMonogram: "/theprivateroom/assets/images/pr-monogram.png",
  keyArt: "/theprivateroom/assets/images/the-private-room-key-art.png", // Pieza completa de identidad visual (puerta + monograma + wordmark) — solo como referencia, no usar como hero desktop.
  signature: "", // TODO: Replace with transparent PNG signature of Lindsy Torres.
  openGraphImage: "/theprivateroom/assets/images/og-placeholder.svg",
};

/** True when a configured asset path actually points at a usable file. */
window.hasAsset = function hasAsset(path) {
  return typeof path === "string" && path.trim().length > 0;
};
